// app/api/top-pages/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getTopPages } from "@/lib/services/topPages";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Config ---------- */
const API_TIMEOUT_MS = 10_000;
const USE_MOCKS = process.env.KPI_FORCE_MOCKS === "true";
const SERIES_MAX = 52; // keep payloads small & predictable

/* ---------- Zod schema ---------- */
const ZNum = z.preprocess((v) => {
  if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
  return v;
}, z.number());

const TopPagesResult = z.object({
  value: ZNum,
  delta: z.string().optional(),
  series: z.array(ZNum).optional(),
  demo: z.boolean().optional(), // allow passing through from service or demo branch
});
type TopPages = z.infer<typeof TopPagesResult>;

/* ---------- Helpers ---------- */
function noStore() {
  return {
    "Cache-Control": "no-store",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
  };
}
function withTimeout<T>(p: Promise<T>, ms = API_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    p.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); }
    );
  });
}
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}
function rng(seed: number) {
  let x = seed || 123456789;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 0xffffffff; };
}
function jitterSeries(endValue: number, len = 7, seed = 1, step = 2) {
  const r = rng(seed);
  const out: number[] = new Array(len);
  let cur = Math.max(0, endValue - (len - 1));
  for (let i = 0; i < len; i++) {
    const jit = Math.round((r() * 2 - 1) * step);
    cur = Math.max(0, cur + jit);
    out[i] = cur;
  }
  out[len - 1] = endValue;
  return out;
}
function fallback(normalizedUrl: string): TopPages {
  const seed = hash(normalizedUrl);
  const value = 8 + (seed % 18); // 8..25
  const series = jitterSeries(value, 7, seed, 2);
  const prev = series.at(-2) ?? value;
  const diff = value - prev;
  const delta = (diff >= 0 ? "+" : "") + diff;
  return { value, delta, series, demo: true };
}
function formatDelta(n: number) {
  // Ensure we never send "-0"
  const v = Object.is(n, -0) ? 0 : n;
  return (v >= 0 ? "+" : "") + v;
}
function sanitizeSeries(arr?: number[]) {
  return (arr ?? [])
    .filter((n) => Number.isFinite(n))
    .map((n) => Math.max(0, Math.round(n)))
    .slice(-SERIES_MAX);
}

/* ---------- Route ---------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();

    const normalized = raw.startsWith("demo://") ? "" : (normalizeUrl(raw) || "");

    // Demo / mock mode
    if (!normalized || USE_MOCKS) {
      const demoUrl = normalized || "https://demo.example.com/";
      const demo = TopPagesResult.parse(fallback(demoUrl));
      demo.series = sanitizeSeries(demo.series);
      demo.value = Math.max(0, Math.round(demo.value));
      demo.delta = demo.delta ?? "+0";
      return NextResponse.json(demo, {
        headers: { ...noStore(), "X-Mode": "demo" },
      });
    }

    // Live service with timeout
    const rawData = await withTimeout(getTopPages(normalized), API_TIMEOUT_MS);
    const parsed = TopPagesResult.parse(rawData);

    let { value, delta, series, demo } = parsed;

    // If delta missing, compute from series
    if (!delta) {
      if (series && series.length > 1) {
        const diff = Number(series[series.length - 1]) - Number(series[series.length - 2]);
        delta = formatDelta(diff);
      } else {
        delta = "+0";
      }
    } else {
      // normalize "-0" → "+0"
      const n = Number(delta.replace(/[^0-9.+-]/g, ""));
      if (!Number.isNaN(n)) delta = formatDelta(n);
    }

    // Sanitize/limit
    value = Math.max(0, Math.round(value));
    series = sanitizeSeries(series);

    return NextResponse.json(
      { value, delta, series, demo: demo === true ? true : undefined },
      { headers: { ...noStore(), "X-Mode": "live" } }
    );
  } catch (err) {
    console.error("[/api/top-pages] fatal:", err);
    const demo = fallback("https://demo.example.com/");
    demo.series = sanitizeSeries(demo.series);
    demo.value = Math.max(0, Math.round(demo.value));
    demo.delta = demo.delta ?? "+0";
    return NextResponse.json(demo, {
      status: 200,
      headers: { ...noStore(), "X-Mode": "fatal-fallback" },
    });
  }
}
