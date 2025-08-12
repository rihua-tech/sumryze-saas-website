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

/* ---------- Zod schema for provider result ---------- */
// We accept strings like "12", " 1,234 " and coerce to numbers.
const ZNum = z.preprocess((v) => {
  if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
  return v;
}, z.number());

const TopPagesResult = z.object({
  value: ZNum,                         // total top pages count
  delta: z.string().optional(),        // e.g. "+2", "-1"
  series: z.array(ZNum).optional(),    // sparkline / history
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

// Add a timeout around any promise (e.g., your service fn)
function withTimeout<T>(p: Promise<T>, ms = API_TIMEOUT_MS): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

// Deterministic demo data seeded by URL—keeps UI stable even without backend
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
  return { value, delta, series };
}

/* ---------- Route ---------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();

    // Allow "demo://" to intentionally force demo; otherwise normalize.
    const normalized =
      raw.startsWith("demo://") ? "" : (normalizeUrl(raw) || "");

    // Demo / mock mode
    if (!normalized || USE_MOCKS) {
      const demoUrl = normalized || "https://demo.example.com/";
      const demo = TopPagesResult.parse(fallback(demoUrl)); // validate even demo
      return NextResponse.json(demo, { headers: noStore() });
    }

    // Call your real service with a timeout
    // Expected service shape: { value: number|string, delta?: string, series?: (number|string)[] }
    const rawData = await withTimeout(getTopPages(normalized), API_TIMEOUT_MS);

    // Validate & coerce
    const parsed = TopPagesResult.parse(rawData);

    // If delta is missing but series is present, compute diff of last two points
    let { value, delta, series } = parsed;
    if (!delta) {
      if (series && series.length > 1) {
        const diff = series[series.length - 1] - series[series.length - 2];
        delta = (diff >= 0 ? "+" : "") + diff;
      } else {
        delta = "+0";
      }
    }

    // Safety: ensure non-negative integer-ish value for count
    value = Math.max(0, Math.round(value));

    return NextResponse.json({ value, delta, series }, { headers: noStore() });
  } catch (err) {
    console.error("[/api/top-pages] fatal:", err);
    // Last-resort demo so the dashboard never breaks
    const demo = fallback("https://demo.example.com/");
    return NextResponse.json(TopPagesResult.parse(demo), {
      status: 200,
      headers: noStore(),
    });
  }
}
