// lib/services/webVitals.ts
import { normalizeUrl } from "@/lib/normalizeUrl";

/* ----------------------------- Types ----------------------------- */
export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;          // LCP in seconds, INP in ms, CLS unitless
  target: number;         // “good” goal
  unit: string;           // "s" | "ms" | ""
  thresholds?: number[];  // [good, needs-improvement] (lower is better)
  color?: string;         // optional accent
};

export type WebVitalsResult = {
  vitals: CoreVital[];
  isMock: boolean;
};

/* ------------------------------ Knobs ---------------------------- */
const API_TIMEOUT_MS = toInt(process.env.WEB_VITALS_API_TIMEOUT_MS, 12_000);
const CACHE_TTL_MS   = toInt(process.env.WEB_VITALS_CACHE_TTL_MS,   10 * 60 * 1000); // 10m
const FORCE_MOCKS    = process.env.WEB_VITALS_FORCE_MOCKS === "true";

const DEFAULT_COLORS = {
  LCP: "#10b981", // emerald
  INP: "#3b82f6", // blue
  CLS: "#f59e0b", // amber
};

// simple blocklist / internal guard
const DEMO_BLOCKLIST = new Set([
  "example.com",
  "www.example.com",
]);

/* ----------------------------- Utilities ------------------------- */
function toInt(s: string | undefined, def: number) {
  const n = Number(s);
  return Number.isFinite(n) ? n : def;
}

function withTimeout(input: string, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return {
    async fetch(init?: RequestInit) {
      try {
        return await fetch(input, { ...init, signal: ac.signal, cache: "no-store" });
      } finally {
        clearTimeout(t);
      }
    },
  };
}

/** Very small server-safe external http(s) validator (no window). */
function toExternalHttpUrl(raw: string | null): string {
  const s = (raw || "").trim();
  if (!s) return "";

  try {
    const withProto = /^https?:\/\//i.test(s) ? s : `http://${s}`;
    const u = new URL(withProto);
    const host = u.hostname.replace(/^www\./i, "");

    // reject localhost / private hosts / blocklist / missing TLD
    if (
      /^localhost$|^127\.0\.0\.1$|\.local$|^0\.0\.0\.0$/i.test(host) ||
      !host.includes(".") ||
      DEMO_BLOCKLIST.has(host)
    ) {
      return "";
    }
    if (!/^https?:$/i.test(u.protocol)) return "";
    return u.toString();
  } catch {
    return "";
  }
}

function normalizeCls(p75: number | undefined | null) {
  if (p75 == null) return undefined;
  // some PSI payloads historically reported CLS * 100
  return p75 > 1 ? p75 / 100 : p75;
}

function buildVitals(lcpSeconds?: number, inpMs?: number, cls?: number): CoreVital[] {
  const out: CoreVital[] = [];

  if (typeof lcpSeconds === "number" && isFinite(lcpSeconds)) {
    out.push({
      name: "LCP",
      value: +lcpSeconds.toFixed(1),
      target: 2.5,
      unit: "s",
      thresholds: [2.5, 4.0],
      color: DEFAULT_COLORS.LCP,
    });
  }
  if (typeof inpMs === "number" && isFinite(inpMs)) {
    out.push({
      name: "INP",
      value: Math.round(inpMs),
      target: 200,
      unit: "ms",
      thresholds: [200, 500],
      color: DEFAULT_COLORS.INP,
    });
  }
  if (typeof cls === "number" && isFinite(cls)) {
    out.push({
      name: "CLS",
      value: +cls.toFixed(2),
      target: 0.1,
      unit: "",
      thresholds: [0.1, 0.25],
      color: DEFAULT_COLORS.CLS,
    });
  }
  return out;
}

/* --------------------------- Seeded mocks ------------------------- */
function hash32(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededMockVitals(key: string): CoreVital[] {
  const r = mulberry32(hash32(`cwv-mock|${key}`));
  const lcp = +(1.7 + r() * 1.6).toFixed(1); // 1.7–3.3s
  const inp = Math.round(100 + r() * 220);   // 100–320ms
  const cls = +(0.02 + r() * 0.12).toFixed(2); // 0.02–0.14
  return [
    { name: "LCP", value: lcp, target: 2.5, unit: "s", thresholds: [2.5, 4.0], color: DEFAULT_COLORS.LCP },
    { name: "INP", value: inp, target: 200, unit: "ms", thresholds: [200, 500], color: DEFAULT_COLORS.INP },
    { name: "CLS", value: cls, target: 0.1, unit: "", thresholds: [0.1, 0.25], color: DEFAULT_COLORS.CLS },
  ];
}

/* ---------------------------- Server cache ------------------------ */
type CacheEntry = { ts: number; result: WebVitalsResult };
const g = globalThis as any;
if (!g.__webVitalsCache) g.__webVitalsCache = new Map<string, CacheEntry>();
const CACHE: Map<string, CacheEntry> = g.__webVitalsCache;

function getCache(key: string): WebVitalsResult | null {
  const hit = CACHE.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    CACHE.delete(key);
    return null;
  }
  return hit.result;
}
function putCache(key: string, result: WebVitalsResult) {
  CACHE.set(key, { ts: Date.now(), result });
}

/* ------------------------ PageSpeed (CrUX) ------------------------ */
/**
 * Pull CrUX field data via PageSpeed Insights (runPagespeed).
 * We prefer page-level loadingExperience, fallback to originLoadingExperience.
 */
export async function fetchVitalsFromPSI(
  normalizedUrl: string,
  apiKey?: string,
  strategy: "mobile" | "desktop" = "mobile"
): Promise<CoreVital[]> {
  const endpoint =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
    `?url=${encodeURIComponent(normalizedUrl)}` +
    `&category=PERFORMANCE&strategy=${strategy}` +
    (apiKey ? `&key=${encodeURIComponent(apiKey)}` : "");

  const res = await withTimeout(endpoint, API_TIMEOUT_MS).fetch({
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    // 204 == no data for page; 429/5xx quota or transient
    throw new Error(`PSI HTTP ${res.status}`);
  }

  const json = await res.json();

  // Prefer field data from "loadingExperience", fallback to origin
  const exp =
    json?.loadingExperience ??
    json?.originLoadingExperience ??
    json?.lighthouseResult?.loadingExperience ??
    null;

  const m = exp?.metrics ?? {};

  const lcpMs: number | undefined = m?.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
  const inpMs: number | undefined =
    m?.INTERACTION_TO_NEXT_PAINT?.percentile ??
    m?.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile;
  const clsRaw: number | undefined = m?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;

  const lcpSeconds = typeof lcpMs === "number" ? lcpMs / 1000 : undefined;
  const cls = normalizeCls(clsRaw);

  return buildVitals(lcpSeconds, inpMs, cls);
}

/* --------------------------- Main entry --------------------------- */
export async function getWebVitals(
  rawUrl: string | null,
  opts?: {
    forceMock?: boolean;
    apiKey?: string;
    strategy?: "mobile" | "desktop";
  }
): Promise<WebVitalsResult> {
  const strategy = opts?.strategy ?? "mobile";
  const forceMock = FORCE_MOCKS || !!opts?.forceMock;

  // Validate & normalize external URL
  const external = toExternalHttpUrl(rawUrl);
  const normalized = external ? normalizeUrl(external) : null;

  const cacheKey = `${strategy}:${normalized || "demo://blank"}`;

  // Cache first
  const cached = getCache(cacheKey);
  if (cached && (forceMock ? cached.isMock : true)) {
    return cached;
  }

  // Force/demo path
  if (forceMock || !normalized) {
    const vitals = seededMockVitals(cacheKey);
    const result = { vitals, isMock: true } satisfies WebVitalsResult;
    putCache(cacheKey, result);
    return result;
  }

  // Live path with safe fallback
  try {
    const vitals = await fetchVitalsFromPSI(normalized, opts?.apiKey, strategy);
    if (vitals.length) {
      const result = { vitals, isMock: false } satisfies WebVitalsResult;
      putCache(cacheKey, result);
      return result;
    }
    // If PSI returned no field data, fall through to mock below
  } catch (err) {
    // No throw — we always return something
    console.warn("[webVitals] PSI fetch failed → mock:", (err as Error)?.message || err);
  }

  const fallback = { vitals: seededMockVitals(cacheKey), isMock: true } satisfies WebVitalsResult;
  putCache(cacheKey, fallback);
  return fallback;
}
