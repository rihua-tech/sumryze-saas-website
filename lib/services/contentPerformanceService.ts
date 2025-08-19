/* Lightweight analyzer with safe fallbacks to deterministic demo.
 * No extra deps required.
 */

export type ContentPerf = {
  wordCount: number;
  qualityScore: number; // 0..100
  metaPresent: boolean;
  titlePresent: boolean;
  isMock: boolean;
};

type Options = {
  url?: string;         // external http(s) URL. empty => demo
  forceDemo?: boolean;  // override
};

/* ------------------------------- Env knobs ------------------------------- */
const FORCE = process.env.CONTENT_PERF_FORCE_MOCKS === "true";
const USER_AGENT =
  process.env.FETCH_USER_AGENT ||
  "SumryzeBot/1.0 (+https://sumryze.com; SEO readiness fetch)";

const HARD_TIMEOUT_MS = toInt(process.env.CONTENT_PERF_HARD_TIMEOUT_MS, 3500);
const CACHE_TTL_MS     = toInt(process.env.CONTENT_PERF_CACHE_TTL_MS, 10 * 60 * 1000);
// expose TTL for route cache headers
export const CONTENT_PERF_CACHE_TTL_MS = CACHE_TTL_MS;

/* Optional LLM refinement (kept off by default to be token-safe) */
const USE_OPENAI = process.env.USE_OPENAI === "true"; // set in .env only if you want it
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o";
const OPENAI_TIMEOUT_MS = toInt(process.env.OPENAI_TIMEOUT_MS, 2500);

/* ------------------------------- Utilities ------------------------------- */
function toInt(s: string | undefined, def: number): number {
  const n = Number(s);
  return Number.isFinite(n) ? n : def;
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function safeNow() { return Date.now(); }

const BAD_TLDS = new Set(["local", "internal", "lan", "home"]);
const IPV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/i;
const IPV6 = /^[0-9a-f:]+$/i;

/** returns empty string if not an external http(s) url or in blocklist */
export function isExternalHttpUrl(raw: string, blocklist?: Set<string>): string {
  const s = (raw || "").trim();
  if (!s) return "";
  try {
    const withProto = /^https?:\/\//i.test(s) ? s : `http://${s}`;
    const u = new URL(withProto);

    const app = typeof window !== "undefined" ? new URL(window.location.href) : null;
    const target = u.hostname.replace(/^www\./i, "");
    const appHost = app ? app.hostname.replace(/^www\./i, "") : null;

    if (!target) return "";
    if (blocklist?.has(target)) return "";
    if (appHost && target === appHost) return "";
    if (/^(localhost|127\.0\.0\.1)$/i.test(target)) return "";
    if (IPV4.test(target) || IPV6.test(target)) return ""; // block direct IPs
    const parts = target.split(".");
    const tld = parts[parts.length - 1] || "";
    if (!parts.some(Boolean) || !tld || BAD_TLDS.has(tld)) return "";
    if (!/^https?:$/i.test(u.protocol)) return "";

    return u.toString();
  } catch {
    return "";
  }
}

/* ----------------------------- Demo generator ---------------------------- */
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
function makeDemo(key: string): ContentPerf {
  const r = mulberry32(hash32(`content-perf|${key}`));
  const w = Math.round(650 + r() * 650);  // 650–1300
  const q = Math.round(72 + r() * 23);    // 72–95
  const meta = r() > 0.30;
  const title = r() > 0.15;
  return {
    wordCount: w,
    qualityScore: clamp(q, 0, 100),
    metaPresent: meta,
    titlePresent: title,
    isMock: true,
  };
}

/* ----------------------------- Tiny HTML parser -------------------------- */
function extractField(regex: RegExp, html: string): string | null {
  const m = regex.exec(html);
  return m ? (m[1] || m[0]) : null;
}
function stripHtmlText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------- Cache (RAM) ----------------------------- */
type CacheEntry = { ts: number; data: ContentPerf };
const g = globalThis as any;
if (!g.__contentPerfCache) g.__contentPerfCache = new Map<string, CacheEntry>();
const CACHE: Map<string, CacheEntry> = g.__contentPerfCache;

function fromCache(key: string): ContentPerf | null {
  const hit = CACHE.get(key);
  if (!hit) return null;
  if (safeNow() - hit.ts > CACHE_TTL_MS) {
    CACHE.delete(key);
    return null;
  }
  return hit.data;
}
function putCache(key: string, data: ContentPerf) {
  CACHE.set(key, { ts: safeNow(), data });
}

/* ------------------------------ Main analyzer ---------------------------- */
export async function analyzeContentPerformance(opts: Options): Promise<{ data: ContentPerf }> {
  const forceDemo = FORCE || !!opts.forceDemo;
  const url = (opts.url || "").trim();

  const cacheKey = url || "demo://blank";
  const cached = fromCache(cacheKey);
  if (cached && (forceDemo ? cached.isMock : true)) {
    return { data: cached };
  }

  if (forceDemo || !url) {
    const demo = makeDemo(cacheKey);
    putCache(cacheKey, demo);
    return { data: demo };
  }

  // Live fetch with hard timeout + safe demo fallback
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), HARD_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: ac.signal,
      headers: { "User-Agent": USER_AGENT, Accept: "text/html, */*;q=0.8" },
    });

    if (!res.ok) throw new Error(`Fetch ${res.status}`);
    let html = await res.text();

    // guard: extremely large pages -> trim to first ~1.5MB for heuristics
    const MAX_BYTES = 1_500_000;
    if (html.length > MAX_BYTES) html = html.slice(0, MAX_BYTES);

    // Heuristics
    const title = extractField(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
    const metaDesc =
      extractField(/<meta[^>]+name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/i, html) ||
      extractField(/<meta[^>]+content\s*=\s*["']([^"']+)["'][^>]*name\s*=\s*["']description["']/i, html);

    const text = stripHtmlText(html);
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

    const titlePresent = !!(title && title.trim());
    const metaPresent = !!(metaDesc && metaDesc.trim());

    // base score: quality proxy by readability & length
    const wordFactor = Math.min(1, words / 800);
    let quality = Math.round(60 + wordFactor * 30); // 60..90 approx

    // Optional OpenAI refinement (very light)
    if (USE_OPENAI) {
      try {
        const refine = await refineQualityWithLLM({ html, words, titlePresent, metaPresent });
        quality = clamp(Math.round(0.5 * quality + 0.5 * refine), 0, 100);
      } catch { /* ignore refinement failures */ }
    }

    const data: ContentPerf = {
      wordCount: words,
      qualityScore: clamp(quality, 0, 100),
      metaPresent,
      titlePresent,
      isMock: false,
    };

    putCache(cacheKey, data);
    return { data };
  } catch {
    const demo = makeDemo(cacheKey);
    putCache(cacheKey, demo);
    return { data: demo };
  } finally {
    clearTimeout(timer);
  }
}

/* --------------------------- Optional LLM hook --------------------------- */
async function refineQualityWithLLM(input: {
  html: string;
  words: number;
  titlePresent: boolean;
  metaPresent: boolean;
}): Promise<number> {
  // Keep this stub ultra-light; implement with your OpenAI client if desired.
  const base =
    55 +
    (input.words >= 800 ? 10 : Math.floor((input.words / 800) * 10)) +
    (input.titlePresent ? 5 : 0) +
    (input.metaPresent ? 5 : 0);
  return clamp(base, 0, 100);
}
