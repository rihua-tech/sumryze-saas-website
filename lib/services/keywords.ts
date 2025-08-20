// lib/services/keywords.ts
import { google, webmasters_v3 } from "googleapis";

/** Public types consumed by the UI */
export type Period = "weekly" | "monthly";
export type KeywordPoint = { day: string; count: number };

/* =========================
   Memoized GSC Client
   ========================= */
let _webmasters: webmasters_v3.Webmasters | null = null;

function getWebmasters(): webmasters_v3.Webmasters {
  if (_webmasters) return _webmasters;

  const email = process.env.GSC_CLIENT_EMAIL || "";
  let key = process.env.GSC_PRIVATE_KEY || "";
  if (!email || !key) throw new Error("Missing GSC_CLIENT_EMAIL or GSC_PRIVATE_KEY");
  key = key.replace(/\\n/g, "\n"); // handle newline-escaped keys

  const jwt = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  _webmasters = google.webmasters({ version: "v3", auth: jwt });
  return _webmasters;
}

/* =========================
   Labels & helpers
   ========================= */
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function yesterdayUTC(): Date {
  const now = new Date();
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  return y;
}

/** Inclusive last 7 calendar days ending yesterday, ISO dates ascending */
function last7DaysISO(): string[] {
  const end = yesterdayUTC(); // avoid partial "today"
  const out: string[] = [];
  const start = new Date(end);
  start.setDate(start.getDate() - 6);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    out.push(iso(d));
  }
  return out;
}

/** Last 12 months keys with display labels: [{ key: "YYYY-MM", label: "Jan" }, ...], ending with the month of yesterday */
function last12Months(): { key: string; label: string }[] {
  const end = yesterdayUTC();
  const out: { key: string; label: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
    d.setUTCMonth(d.getUTCMonth() - i, 1);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    out.push({ key, label: MON[d.getUTCMonth()] });
  }
  return out;
}

/* =========================
   Google types
   ========================= */
type ApiRow = webmasters_v3.Schema$ApiDataRow;

/* =========================
   Resilient paged query
   ========================= */
async function gscQueryPaged(
  siteUrl: string,
  body: webmasters_v3.Schema$SearchAnalyticsQueryRequest
): Promise<ApiRow[]> {
  const gsc = getWebmasters();
  const ROW_LIMIT = 25_000;
  const rowsAll: ApiRow[] = [];
  let startRow = 0;

  while (true) {
    const requestBody = { rowLimit: ROW_LIMIT, startRow, ...body };

    // simple retry with backoff for 429/5xx
    let attempts = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const { data } = await gsc.searchanalytics.query({ siteUrl, requestBody });
        const page = (data.rows ?? []) as ApiRow[];
        rowsAll.push(...page);
        if (page.length < ROW_LIMIT) return rowsAll; // last page
        startRow += page.length; // next page
        break; // proceed to next loop page
      } catch (e: any) {
        const status = e?.code || e?.response?.status;
        attempts += 1;
        if (attempts <= 3 && (status === 429 || status >= 500)) {
          await new Promise((r) => setTimeout(r, attempts * 500)); // 0.5s, 1s, 1.5s
          continue;
        }
        throw e;
      }
    }
  }
}

/** Fetch daily rows with dimensions ["date","query"] */
async function fetchDateQueryRows(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<ApiRow[]> {
  const body: webmasters_v3.Schema$SearchAnalyticsQueryRequest = {
    startDate,
    endDate,
    dimensions: ["date", "query"],
    searchType: "web",
    dataState: "final", // prefer finalized data when available
  };
  return gscQueryPaged(siteUrl, body);
}

/* =========================
   Optional micro-cache (5 min)
   ========================= */
const CACHE = new Map<string, { at: number; data: KeywordPoint[] }>();
const TTL_MS = 5 * 60 * 1000;

function getCached(key: string) {
  const hit = CACHE.get(key);
  return hit && Date.now() - hit.at < TTL_MS ? hit.data : null;
}
function setCached(key: string, data: KeywordPoint[]) {
  CACHE.set(key, { at: Date.now(), data });
}

/* =========================
   Main service
   - weekly: last 7 days (ending yesterday) → distinct queries with impressions > 0 per day
   - monthly: last 12 months (ending month of yesterday) → distinct queries per month, chunked
   ========================= */
export async function getKeywordGrowthData(
  siteUrl: string,
  period: Period
): Promise<KeywordPoint[]> {
  const cacheKey = `${siteUrl}:${period}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  if (period === "weekly") {
    const days = last7DaysISO();
    const start = days[0];
    const end = days[days.length - 1];

    const rows = await fetchDateQueryRows(siteUrl, start, end);

    // date ISO → Set<query>
    const byDate = new Map<string, Set<string>>();
    for (const r of rows) {
      const [date, query] = r.keys ?? [];
      if (!date || !query) continue;
      if ((r.impressions ?? 0) <= 0) continue;
      if (!byDate.has(date)) byDate.set(date, new Set());
      byDate.get(date)!.add(query);
    }

    const series: KeywordPoint[] = days.map((ds) => {
      const d = new Date(ds + "T00:00:00Z");
      return { day: DOW[d.getUTCDay()], count: byDate.get(ds)?.size ?? 0 };
    });

    setCached(cacheKey, series);
    return series;
  }

  // monthly — chunk by month to guarantee completeness on large sites
  const months = last12Months(); // [{ key: "YYYY-MM", label }, ...]
  const byMonth = new Map<string, Set<string>>();

  for (const { key } of months) {
    const [y, m] = key.split("-").map(Number);
    const start = new Date(Date.UTC(y, m - 1, 1));
    const end = new Date(Date.UTC(y, m, 0)); // last day of month
    const rows = await fetchDateQueryRows(siteUrl, iso(start), iso(end));

    const bag = byMonth.get(key) ?? new Set<string>();
    for (const r of rows) {
      const [date, query] = r.keys ?? [];
      if (!date || !query) continue;
      if ((r.impressions ?? 0) <= 0) continue;
      bag.add(query);
    }
    byMonth.set(key, bag);
  }

  const series: KeywordPoint[] = months.map(({ key, label }) => ({
    day: label,
    count: byMonth.get(key)?.size ?? 0,
  }));

  setCached(cacheKey, series);
  return series;
}

/* =========================
   Mock series (UI-compatible)
   ========================= */
export function mockKeywordGrowth(period: Period): KeywordPoint[] {
  if (period === "weekly") {
    return [
      { day: "Mon", count: 120 }, { day: "Tue", count: 130 }, { day: "Wed", count: 160 },
      { day: "Thu", count: 155 }, { day: "Fri", count: 180 }, { day: "Sat", count: 200 }, { day: "Sun", count: 240 },
    ];
  }
  return [
    { day: "Jan", count: 400 }, { day: "Feb", count: 450 }, { day: "Mar", count: 470 }, { day: "Apr", count: 500 },
    { day: "May", count: 550 }, { day: "Jun", count: 590 }, { day: "Jul", count: 650 }, { day: "Aug", count: 700 },
    { day: "Sep", count: 780 }, { day: "Oct", count: 820 }, { day: "Nov", count: 880 }, { day: "Dec", count: 900 },
  ];
}
