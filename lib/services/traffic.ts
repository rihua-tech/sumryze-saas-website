// lib/services/traffic.ts
// GA4-backed traffic time-series for the Traffic Overview card
// - Weekly: last 7 days, grouped by date -> Mon..Sun
// - Monthly: last 12 calendar months, grouped by yearMonth -> Jan..Dec (rolling)
// Includes in-memory micro-cache, robust env/host parsing, and safe fallbacks.

import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type Period = "weekly" | "monthly";
export type TrafficPoint = { date: string; traffic: number };
export type TrafficResult = {
  data: TrafficPoint[];
  isMock: boolean;
  source: "ga4" | "mock";
  ts: number; // unix ms
};

// ---------------------- Environment / GA4 client -----------------------------
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID; // e.g. "123456789"
const GA4_CLIENT_EMAIL = process.env.GA4_CLIENT_EMAIL;
const GA4_PRIVATE_KEY = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

let _client: BetaAnalyticsDataClient | null = null;
function ga4(): BetaAnalyticsDataClient {
  if (_client) return _client;
  if (!GA4_CLIENT_EMAIL || !GA4_PRIVATE_KEY) {
    throw new Error("GA4 credentials missing");
  }
  _client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: GA4_CLIENT_EMAIL,
      private_key: GA4_PRIVATE_KEY,
    },
  });
  return _client;
}

// ------------------------------ Helpers --------------------------------------
const WEEK_DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function parsePeriod(raw: string | null): Period {
  return raw === "monthly" ? "monthly" : "weekly";
}

export function normalizeHost(input?: string | null): string | null {
  if (!input) return null;
  try {
    const host = new URL(input).hostname.toLowerCase();
    return host.replace(/^www\./, "");
  } catch {
    const h = String(input).toLowerCase().trim();
    if (!h) return null;
    return h.replace(/^www\./, "");
  }
}

function toDayLabel(yyyymmdd: string): string {
  const y = Number(yyyymmdd.slice(0,4));
  const m = Number(yyyymmdd.slice(4,6)) - 1;
  const d = Number(yyyymmdd.slice(6,8));
  const dt = new Date(Date.UTC(y, m, d));
  return WEEK_DOW[dt.getUTCDay()];
}

function toMonthLabel(yearMonth: string): string {
  const m = Number(yearMonth.slice(4,6)) - 1; // "YYYYMM"
  return MONTH_ABBR[(m+12)%12];
}

// --------------------------- Micro cache -------------------------------------
type CacheKey = string;
const MICRO_TTL_MS = 60_000; // 1 minute
const cache = new Map<CacheKey, { exp: number; value: TrafficResult }>();

function key(host: string | null, period: Period) {
  return `${host ?? "all"}::${period}`;
}
function cacheGet(host: string | null, period: Period): TrafficResult | null {
  const hit = cache.get(key(host, period));
  if (!hit) return null;
  if (Date.now() < hit.exp) return hit.value;
  cache.delete(key(host, period));
  return null;
}
function cacheSet(host: string | null, period: Period, value: TrafficResult) {
  cache.set(key(host, period), { exp: Date.now() + MICRO_TTL_MS, value });
}

// -------------------------- Mock data (fallback) -----------------------------
function seededRandom(seed: string, i: number) {
  let h = 1779033703 ^ seed.length;
  for (let j=0; j<seed.length; j++) {
    h = Math.imul(h ^ seed.charCodeAt(j), 3432918353);
    h = (h<<13) | (h>>>19);
  }
  h = (h + i) >>> 0;
  let t = (h += 0x6D2B79F5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function mockWeekly(host: string | null): TrafficPoint[] {
  const base = Math.round(150 + (seededRandom(host ?? "all", 1) * 120));
  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return labels.map((lbl, i) => ({
    date: lbl,
    traffic: Math.round(base * (0.9 + seededRandom(host ?? "all", i+2)*0.4)),
  }));
}

function mockMonthly(host: string | null): TrafficPoint[] {
  const now = new Date();
  const pts: TrafficPoint[] = [];
  for (let i=11; i>=0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth()-i, 1));
    const lbl = MONTH_ABBR[d.getUTCMonth()];
    const base = Math.round(4000 + (seededRandom(host ?? "all", i+50) * 3000));
    pts.push({ date: lbl, traffic: base });
  }
  return pts;
}

function mockSeries(host: string | null, period: Period): TrafficPoint[] {
  return period === "monthly" ? mockMonthly(host) : mockWeekly(host);
}

// ---------------------------- GA4 fetchers -----------------------------------
async function ga4Weekly(propertyId: string, host: string | null): Promise<TrafficPoint[]> {
  const [resp] = await ga4().runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }],
    dimensionFilter: host ? {
      filter: {
        fieldName: "hostName",
        inListFilter: { values: [host, `www.${host}`], caseSensitive: false },
      },
    } : undefined,
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  const rows = resp.rows ?? [];
  return rows.map(r => {
    const yyyymmdd = r.dimensionValues?.[0]?.value ?? "";
    const sessions = Number(r.metricValues?.[0]?.value ?? 0);
    return { date: toDayLabel(yyyymmdd), traffic: sessions };
  });
}

async function ga4Monthly(propertyId: string, host: string | null): Promise<TrafficPoint[]> {
  const [resp] = await ga4().runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "12monthsAgo", endDate: "yesterday" }],
    dimensions: [{ name: "yearMonth" }],
    metrics: [{ name: "sessions" }],
    dimensionFilter: host ? {
      filter: {
        fieldName: "hostName",
        inListFilter: { values: [host, `www.${host}`], caseSensitive: false },
      },
    } : undefined,
    orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
    limit: 120,
  });

  const rows = resp.rows ?? [];
  return rows.map(r => {
    const ym = r.dimensionValues?.[0]?.value ?? ""; // "YYYYMM"
    const sessions = Number(r.metricValues?.[0]?.value ?? 0);
    return { date: toMonthLabel(ym), traffic: sessions };
  });
}

// ------------------------------ Public API -----------------------------------
export async function getTraffic(host: string | null, period: Period): Promise<TrafficResult> {
  const cached = cacheGet(host, period);
  if (cached) return cached;

  let data: TrafficPoint[] = [];
  let isMock = false;

  if (GA4_PROPERTY_ID && GA4_CLIENT_EMAIL && GA4_PRIVATE_KEY) {
    data = period === "monthly"
      ? await ga4Monthly(GA4_PROPERTY_ID, host)
      : await ga4Weekly(GA4_PROPERTY_ID, host);
  } else {
    isMock = true;
    data = mockSeries(host, period);
  }

  const res: TrafficResult = {
    data,
    isMock,
    source: isMock ? "mock" : "ga4",
    ts: Date.now(),
  };

  cacheSet(host, period, res);
  return res;
}

// --------------------------- ETag helper -------------------------------------
export function weakETag(payload: unknown): string {
  const json = JSON.stringify(payload);
  let h = 2166136261 >>> 0;
  for (let i = 0; i < json.length; i++) {
    h ^= json.charCodeAt(i);
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
  }
  return `W/"${h.toString(16)}-${json.length}"`;
}
