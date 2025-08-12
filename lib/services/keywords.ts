// lib/services/keywords.ts
import { google, webmasters_v3 } from "googleapis";

/** Public types consumed by the UI */
export type Period = "weekly" | "monthly";
export type KeywordPoint = { day: string; count: number };

/** Google Search Console client (service account) */
function getWebmasters(): webmasters_v3.Webmasters {
  const email = process.env.GSC_CLIENT_EMAIL || "";
  let key = process.env.GSC_PRIVATE_KEY || "";
  if (!email || !key) throw new Error("Missing GSC_CLIENT_EMAIL or GSC_PRIVATE_KEY");
  key = key.replace(/\\n/g, "\n"); // handle newline-escaped keys

  const jwt = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.webmasters({ version: "v3", auth: jwt });
}

/** Labels & helpers */
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function last7Days(): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    out.push(iso(d));
  }
  return out;
}

function last12Months(): { key: string; label: string }[] {
  const now = new Date();
  const out: { key: string; label: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    out.push({ key, label: MON[d.getMonth()] });
  }
  return out;
}

/** Google types */
type ApiRow = webmasters_v3.Schema$ApiDataRow;

/**
 * Fetch daily rows with dimensions ["date","query"] and paginate.
 * Returns Google's raw row type (null-safe handled by the caller).
 */
async function fetchDateQueryRows(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<ApiRow[]> {
  const gsc = getWebmasters();
  const ROW_LIMIT = 25_000;

  const rowsAll: ApiRow[] = [];
  let startRow = 0;

  while (true) {
    const { data } = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date", "query"],
        rowLimit: ROW_LIMIT,
        startRow,
      },
    });

    const page = (data.rows ?? []) as ApiRow[];
    rowsAll.push(...page);

    if (page.length < ROW_LIMIT) break;  // last page
    startRow += page.length;             // next page
  }

  return rowsAll;
}

/**
 * Main service used by the API route.
 * weekly: last 7 days → distinct queries with impressions > 0 per day
 * monthly: last 12 months → distinct queries per month
 */
export async function getKeywordGrowthData(
  siteUrl: string,
  period: Period
): Promise<KeywordPoint[]> {
  const today = new Date();

  if (period === "weekly") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6); // 7 days inclusive

    const rows = await fetchDateQueryRows(siteUrl, iso(start), iso(today));

    // date ISO → Set<query>
    const byDate = new Map<string, Set<string>>();
    for (const r of rows) {
      const keys = r.keys ?? [];
      const date = keys[0];
      const query = keys[1];
      if (!date || !query) continue;
      if ((r.impressions ?? 0) <= 0) continue;

      if (!byDate.has(date)) byDate.set(date, new Set());
      byDate.get(date)!.add(query);
    }

    return last7Days().map((ds) => {
      const d = new Date(ds);
      return { day: DOW[d.getDay()], count: byDate.get(ds)?.size ?? 0 };
    });
  }

  // monthly
  const end = today;
  const start = new Date(end);
  start.setMonth(start.getMonth() - 11, 1); // first day 11 months ago

  const rows = await fetchDateQueryRows(siteUrl, iso(start), iso(end));

  // "YYYY-MM" → Set<query>
  const byMonth = new Map<string, Set<string>>();
  for (const r of rows) {
    const keys = r.keys ?? [];
    const date = keys[0];
    const query = keys[1];
    if (!date || !query) continue;
    if ((r.impressions ?? 0) <= 0) continue;

    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!byMonth.has(key)) byMonth.set(key, new Set());
    byMonth.get(key)!.add(query);
  }

  return last12Months().map(({ key, label }) => ({
    day: label,
    count: byMonth.get(key)?.size ?? 0,
  }));
}

/** Mock series (UI-compatible) */
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
