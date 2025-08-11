import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type KPIData = {
  title: "SEO Score" | "Top Pages" | string;
  value: number | string;
  delta?: string;
  down?: boolean;
  series?: number[];
};

const API_TIMEOUT_MS = 10_000;

// 🔧 Feature flag: force mocks (set KPI_FORCE_MOCKS=true)
const USE_MOCKS = process.env.KPI_FORCE_MOCKS === "true";

function makeItem(
  title: KPIData["title"],
  value: KPIData["value"],
  delta?: string,
  series?: number[]
): KPIData {
  const down = typeof delta === "string" && delta.trim().startsWith("-");
  return { title, value, delta, down, series };
}

async function fetchWithTimeout(input: string | URL, init?: RequestInit, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: ac.signal, cache: "no-store", headers: { accept: "application/json", ...(init?.headers || {}) } });
  } finally {
    clearTimeout(t);
  }
}

/* ---------- stable mock helpers (seeded by URL) ---------- */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return (h >>> 0);
}
function rng(seed: number) {
  let x = seed || 123456789;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 0xffffffff; };
}
function makeSeries(endValue: number, len = 7, seed = 1, step = 3) {
  const r = rng(seed);
  const arr: number[] = new Array(len);
  let cur = Math.max(0, endValue - (len - 1));
  for (let i = 0; i < len; i++) {
    const jit = Math.round((r() * 2 - 1) * step);
    cur = Math.max(0, cur + jit);
    arr[i] = cur;
  }
  arr[len - 1] = endValue;
  return arr;
}
function fallbackKPIs(normalizedUrl: string): { seo: KPIData; pages: KPIData } {
  const seed = hash(normalizedUrl);
  const host = new URL(normalizedUrl).hostname.toLowerCase();

  const seoVal = host.includes("example") ? 90 : 80 + (seed % 6); // 80..85 or 90
  const pagesVal = (seed % 18) + 8; // 8..25
  const series = makeSeries(pagesVal, 7, seed, 2);
  const diff = pagesVal - (series.at(-2) ?? pagesVal);

  return {
    seo: makeItem("SEO Score", seoVal, "+0"),
    pages: makeItem("Top Pages", pagesVal, (diff >= 0 ? "+" : "") + diff.toString(), series),
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("url") ?? "";
    const normalized = normalizeUrl(raw);
    if (!normalized) {
      // No valid URL → return stable demo data so the UI still looks good
      const fb = fallbackKPIs("https://demo.example.com/");
      return NextResponse.json([fb.seo, fb.pages], {
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      });
    }

    // ✅ FEATURE FLAG: short-circuit to mocks when KPI_FORCE_MOCKS=true
    if (USE_MOCKS) {
      const fb = fallbackKPIs(normalized);
      return NextResponse.json([fb.seo, fb.pages], {
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      });
    }

    // NOTE: ensure this path matches your folder name.
    // If your folder is /app/api/top-page/route.ts (singular), change to "/api/top-page".
    const seoURL   = new URL("/api/seo", req.url);        seoURL.searchParams.set("url", normalized);
    const pagesURL = new URL("/api/top-pages", req.url);  pagesURL.searchParams.set("url", normalized);

    const [seoRes, pagesRes] = await Promise.allSettled([
      fetchWithTimeout(seoURL),
      fetchWithTimeout(pagesURL),
    ]);

    const out: KPIData[] = [];

    // SEO
    if (seoRes.status === "fulfilled" && seoRes.value.ok) {
      const s = await seoRes.value.json(); // expected: { value, delta? }
      const value = typeof s?.value === "number" ? s.value : 0;
      const delta = typeof s?.delta === "string" ? s.delta : "+0"; // always show chip
      out.push(makeItem("SEO Score", value, delta));
    } else {
      console.warn("[/api/kpis] /api/seo error:", seoRes.status === "rejected" ? seoRes.reason : seoRes.value.status);
    }

    // Top Pages
    if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
      const p = await pagesRes.value.json(); // expected: { value, delta?, series? }
      const value = typeof p?.value === "number" ? p.value : 0;
      let delta: string | undefined = p?.delta;
      const series: number[] | undefined = Array.isArray(p?.series) ? p.series : undefined;

      // If delta missing, compute from series; else default to +0 so chip renders
      if (!delta) {
        if (series && series.length > 1) {
          const diff = (series.at(-1)! - series.at(-2)!);
          delta = (diff >= 0 ? "+" : "") + diff.toString();
        } else {
          delta = "+0";
        }
      }
      out.push(makeItem("Top Pages", value, delta, series));
    } else {
      console.warn("[/api/kpis] /api/top-pages error:", pagesRes.status === "rejected" ? pagesRes.reason : pagesRes.value.status);
    }

    // Backfill any missing KPI with a stable fallback
    const haveSEO   = out.some(i => i.title === "SEO Score");
    const havePages = out.some(i => i.title === "Top Pages");
    if (!haveSEO || !havePages) {
      const fb = fallbackKPIs(normalized);
      if (!haveSEO)   out.push(fb.seo);
      if (!havePages) out.push(fb.pages);
    }

    return NextResponse.json(out, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[/api/kpis] error:", err);
    // As a last resort, return demo so the dashboard still works
    const fb = fallbackKPIs("https://demo.example.com/");
    return NextResponse.json([fb.seo, fb.pages], { status: 200 });
  }
}
