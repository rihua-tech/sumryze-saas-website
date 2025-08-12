// app/api/kpis/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Zod schemas for sub-API results ---------- */

// /api/seo → { value: number|string, delta?: string, demo?: boolean }
const SeoResult = z.object({
  value: z.preprocess((v) => {
    if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
    return v;
  }, z.number()),
  delta: z.string().optional(),
  demo: z.boolean().optional(),
});

// /api/top-pages → { value: number|string, delta?: string, series?: number[]|string[], demo?: boolean }
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

/* ---------- Local KPI type ---------- */
type KPI = {
  title: "SEO Score" | "Top Pages" | string;
  value: number;
  delta?: string;
  down?: boolean;
  series?: number[];
  demo?: boolean; // ← NEW
};

/* ---------- Config ---------- */
const API_TIMEOUT_MS = 10_000;
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
  demo?: boolean // ← NEW
): KPI {
  const down = typeof delta === "string" && delta.trim().startsWith("-");
  return { title, value, delta, down, series, demo };
}

async function fetchWithTimeout(input: string | URL, init?: RequestInit, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort("timeout"), ms);
  try {
    return await fetch(input, {
      ...init,
      signal: ac.signal,
      cache: "no-store",
      headers: { accept: "application/json", ...(init?.headers || {}) },
    });
  } finally {
    clearTimeout(t);
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
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
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
function fallbackKPIs(normalizedUrl: string): KPI[] {
  const seed = hash(normalizedUrl);
  const host = new URL(normalizedUrl).hostname.toLowerCase();
  const seoVal = host.includes("example") ? 90 : 80 + (seed % 6);
  const pagesVal = 8 + (seed % 18);
  const series = jitterSeries(pagesVal, 7, seed, 2);
  const prev = series.at(-2) ?? pagesVal;
  const diff = pagesVal - prev;

  // ✅ mark demo so UI can show "Sample" badge
  return [
    makeItem("SEO Score", seoVal, "+0", undefined, true),
    makeItem("Top Pages", pagesVal, (diff >= 0 ? "+" : "") + diff, series, true),
  ];
}

/* ---------- Route ---------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();
    const normalized = raw.startsWith("demo://") ? "" : normalizeUrl(raw) || "";

    // Demo / mock mode
    if (!normalized || USE_MOCKS) {
      const demoUrl = normalized || "https://demo.example.com/";
      return NextResponse.json(fallbackKPIs(demoUrl), { headers: noStore() });
    }

    const seoURL = new URL("/api/seo", req.url);
    seoURL.searchParams.set("url", normalized);
    const pagesURL = new URL("/api/top-pages", req.url);
    pagesURL.searchParams.set("url", normalized);

    const [seoRes, pagesRes] = await Promise.allSettled([
      fetchWithTimeout(seoURL),
      fetchWithTimeout(pagesURL),
    ]);

    const out: KPI[] = [];

    // SEO Score
    if (seoRes.status === "fulfilled" && seoRes.value.ok) {
      const sJson = await seoRes.value.json();
      const s = SeoResult.parse(sJson); // validate/coerce
      out.push(makeItem("SEO Score", s.value, s.delta ?? "+0", undefined, s.demo === true));
    } else {
      console.warn("[/api/kpis] /api/seo error:", seoRes);
    }

    // Top Pages
    if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
      const pJson = await pagesRes.value.json();
      const p = TopPagesResult.parse(pJson); // validate/coerce

      let delta = p.delta;
      if (!delta) {
        if (p.series && p.series.length > 1) {
          const diff = p.series.at(-1)! - p.series.at(-2)!;
          delta = (diff >= 0 ? "+" : "") + diff;
        } else {
          delta = "+0";
        }
      }
      out.push(makeItem("Top Pages", p.value, delta, p.series, p.demo === true));
    } else {
      console.warn("[/api/kpis] /api/top-pages error:", pagesRes);
    }

    // Backfill if a sub-call failed
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
      headers: noStore(),
    });
  }
}
