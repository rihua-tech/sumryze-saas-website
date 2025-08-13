// app/api/kpis/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Zod schemas ---------- */
const SeoResult = z.object({
  value: z.preprocess((v) => {
    if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
    return v;
  }, z.number()),
  delta: z.string().optional(),
  demo: z.boolean().optional(),
});

const TopPagesResult = z.object({
  value: z.preprocess((v) => {
    if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
    return v;
  }, z.number()),
  delta: z.string().optional(),
  series: z
    .array(
      z.preprocess(
        (v) => (typeof v === "string" ? Number(v.replace(/[^0-9.+-]/g, "")) : v),
        z.number()
      )
    )
    .optional(),
  demo: z.boolean().optional(),
});

type KPI = {
  title: "SEO Score" | "Top Pages" | string;
  value: number;
  delta?: string;
  down?: boolean;
  series?: number[];
  demo?: boolean;
};

/* ---------- Config ---------- */
const HARD_TIMEOUT_MS = Number(process.env.KPI_HARD_TIMEOUT_MS ?? 10_000);
const SOFT_TIMEOUT_MS = Number(process.env.KPI_SOFT_TIMEOUT_MS ?? 1_500);
const USE_MOCKS = process.env.KPI_FORCE_MOCKS === "true";

/* ---------- Helpers ---------- */
function noStore() {
  return {
    "Cache-Control": "no-store",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
  };
}

function makeItem(
  title: KPI["title"],
  value: number,
  delta?: string,
  series?: number[],
  demo?: boolean
): KPI {
  const down = typeof delta === "string" && delta.trim().startsWith("-");
  return { title, value, delta, down, series, demo };
}

async function fetchWithTimeout(
  input: string | URL,
  ms = HARD_TIMEOUT_MS,
  signal?: AbortSignal
) {
  const ac = new AbortController();
  const onAbort = () => ac.abort();
  signal?.addEventListener("abort", onAbort, { once: true });

  const t = setTimeout(() => ac.abort("timeout"), ms);
  try {
    return await fetch(input, {
      signal: ac.signal,
      cache: "no-store",
      headers: { accept: "application/json" },
    });
  } finally {
    clearTimeout(t);
    signal?.removeEventListener("abort", onAbort);
  }
}

/* ---------- Stable demo data ---------- */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}
function rng(seed: number) {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
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
function fallbackKPIs(baseUrl: string): KPI[] {
  const seed = hash(baseUrl);
  const host = new URL(baseUrl).hostname.toLowerCase();
  const seoValRaw = host.includes("example") ? 90 : 80 + (seed % 6);
  const seoVal = Math.max(0, Math.min(100, seoValRaw));
  const pagesVal = 8 + (seed % 18);

  const series = jitterSeries(pagesVal, 7, seed, 2)
    .map((n) => Math.max(0, Math.round(n)))
    .slice(-24);

  const prev = series.at(-2) ?? pagesVal;
  const diff = pagesVal - prev;
  const delta = (diff >= 0 ? "+" : "") + diff;

  return [
    makeItem("SEO Score", seoVal, "+0", undefined, true),
    makeItem("Top Pages", pagesVal, delta, series, true),
  ];
}

/* ---------- Route ---------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();

    // demo sentinel or invalid → demo immediately
    const normalized =
      raw.startsWith("demo://") ? "" : (normalizeUrl(raw) || "");

    if (!normalized || USE_MOCKS) {
      const demoUrl = normalized || "https://demo.example.com/";
      return NextResponse.json(fallbackKPIs(demoUrl), {
        headers: { ...noStore(), "X-Mode": "demo" },
      });
    }

    // Build internal endpoints
    const seoURL = new URL("/api/seo", req.url);
    seoURL.searchParams.set("url", normalized);
    const pagesURL = new URL("/api/top-pages", req.url);
    pagesURL.searchParams.set("url", normalized);

    // Controllers to allow soft cancel
    const softAC = new AbortController();

    // Kick off both requests
    const seoP = fetchWithTimeout(seoURL.toString(), HARD_TIMEOUT_MS, softAC.signal);
    const pagesP = fetchWithTimeout(pagesURL.toString(), HARD_TIMEOUT_MS, softAC.signal);

    // Soft timeout: if nothing finishes within SOFT_TIMEOUT_MS,
    // respond fast with demo data to keep UX snappy.
    const softTimer = new Promise<"soft">((resolve) =>
      setTimeout(() => resolve("soft"), SOFT_TIMEOUT_MS)
    );

    const raced = await Promise.race([
      Promise.allSettled([seoP, pagesP]),
      softTimer,
    ]);

    if (raced === "soft") {
      softAC.abort(); // stop in-flight upstream calls
      return NextResponse.json(fallbackKPIs(normalized), {
        headers: { ...noStore(), "X-Mode": "soft-fallback" },
      });
    }

    const [seoRes, pagesRes] = raced as PromiseSettledResult<Response>[];

    const out: KPI[] = [];

    // SEO Score
    if (seoRes.status === "fulfilled" && seoRes.value.ok) {
      const sJson = await seoRes.value.json();
      const s = SeoResult.parse(sJson);
      const val = Math.max(0, Math.min(100, s.value));
      out.push(makeItem("SEO Score", val, s.delta ?? "+0", undefined, s.demo === true));
    }

    // Top Pages
    if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
      const pJson = await pagesRes.value.json();
      const p = TopPagesResult.parse(pJson);

      const series = (p.series ?? [])
        .filter((n) => Number.isFinite(n))
        .map((n) => Math.max(0, Math.round(n)))
        .slice(-52); // cap length

      let delta = p.delta;
      if (!delta) {
        if (series.length > 1) {
          const diff = series.at(-1)! - series.at(-2)!;
          delta = (diff >= 0 ? "+" : "") + diff;
        } else {
          delta = "+0";
        }
      }
      out.push(makeItem("Top Pages", Math.max(0, Math.round(p.value)), delta, series, p.demo === true));
    }

    // Backfill any missing KPI with demo
    if (!out.some((k) => k.title === "SEO Score") || !out.some((k) => k.title === "Top Pages")) {
      const fb = fallbackKPIs(normalized);
      if (!out.some((k) => k.title === "SEO Score")) out.push(fb[0]);
      if (!out.some((k) => k.title === "Top Pages")) out.push(fb[1]);
    }

    return NextResponse.json(out, { headers: noStore() });
  } catch (err) {
    console.error("[/api/kpis] fatal:", err);
    return NextResponse.json(fallbackKPIs("https://demo.example.com/"), {
      status: 200,
      headers: { ...noStore(), "X-Mode": "fatal-fallback" },
    });
  }
}
