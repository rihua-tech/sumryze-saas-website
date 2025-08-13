// lib/traffic.ts
// Lightweight service for fetching traffic series with micro-cache + safe fallbacks

export type Period = "weekly" | "monthly";
export type TrafficPoint = { date: string; traffic: number };
export type TrafficResult = {
  data: TrafficPoint[];
  isMock: boolean;
  source: "ga4" | "mock";
  ts: number; // unix ms
};

const WEEK: string[]  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTH: string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ---- URL / Period utilities -------------------------------------------------

export function normalizeHost(input: string): string | null {
  try {
    const url = input.startsWith("http") ? new URL(input) : new URL("https://" + input);
    // Reject non-http(s)
    if (!/^https?:$/.test(url.protocol)) return null;
    // Host only (strip www. to collapse duplicates)
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function parsePeriod(x: unknown): Period | null {
  return x === "weekly" || x === "monthly" ? x : null;
}

// ---- Tiny in-memory cache (good enough for serverful or dev) ----------------

type CacheRow = { value: TrafficResult; exp: number };
const cache = new Map<string, CacheRow>();
const TTL_MS = 60_000; // 60s micro-cache

function cacheKey(host: string, period: Period) {
  return `traffic:${host}:${period}`;
}
function cacheGet(host: string, period: Period): TrafficResult | null {
  const row = cache.get(cacheKey(host, period));
  if (!row) return null;
  if (row.exp < Date.now()) {
    cache.delete(cacheKey(host, period));
    return null;
  }
  return row.value;
}
function cacheSet(host: string, period: Period, value: TrafficResult) {
  cache.set(cacheKey(host, period), { value, exp: Date.now() + TTL_MS });
}

// ---- Deterministic mock generator -------------------------------------------
// (keeps demo fast, stable per host/period, and can scale to “large sites”)

function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0; // *16777619
  }
  return h >>> 0;
}
function rng(seed: number) {
  let x = seed || 123456789;
  return () => ((x ^= x << 13), (x ^= x >>> 17), (x ^= x << 5), (x >>> 0) / 0xffffffff);
}

// Auto-scale baseline by “site size” derived from hostname
function mockSeries(host: string, period: Period): TrafficPoint[] {
  const labels = period === "weekly" ? WEEK : MONTH;
  const r = rng(fnv1a(`traffic:${host}:${period}`));

  // baseline ~“small to very large” sites (1k .. 900k weekly / 20k .. 15M yearly)
  const base =
    period === "weekly"
      ? 800 + Math.round(r() * 20_000) // visitors/day-ish scale
      : 10_000 + Math.round(r() * 1_000_000); // visitors/month-ish scale

  let value = base;
  return labels.map((lab, i) => {
    // drift + gentle upward momentum
    const noise = (r() * 2 - 1) * (period === "weekly" ? 400 : 30_000);
    const trend = i === 0 ? 0 : period === "weekly" ? 250 : 50_000;
    value = Math.max(0, Math.round(value + noise + trend));
    return { date: lab, traffic: value };
  });
}

// ---- Public API --------------------------------------------------------------

export async function getTraffic(host: string, period: Period): Promise<TrafficResult> {
  // 1) micro-cache
  const cached = cacheGet(host, period);
  if (cached) return cached;

  // 2) In production, plug a real provider here (GA4, DB, etc.)
  //    Keep the function async to match real IO.
  let res: TrafficResult;
  try {
    // Example: if (process.env.GA4_PROPERTY_ID) { ...fetch real data... }
    // For now we intentionally fall back to deterministic mock:
    const data = mockSeries(host, period);
    res = { data, isMock: true, source: "mock", ts: Date.now() };
  } catch {
    // Safe fallback
    const data = mockSeries(host, period);
    res = { data, isMock: true, source: "mock", ts: Date.now() };
  }

  cacheSet(host, period, res);
  return res;
}

// Small helper to produce an ETag without Node 'crypto'
export function weakETag(payload: unknown): string {
  const json = JSON.stringify(payload);
  let h = 2166136261 >>> 0;
  for (let i = 0; i < json.length; i++) {
    h ^= json.charCodeAt(i);
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
  }
  return `W/"${h.toString(16)}-${json.length}"`;
}
