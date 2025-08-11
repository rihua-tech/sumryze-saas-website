// /app/api/predictions/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getDailySearchData, toGscSiteUrl } from "@/lib/services/gsc";
import { forecast30, applyNudges } from "@/lib/services/predict";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORCE_MOCK = process.env.PREDICTIONS_FORCE_MOCKS === "true";

function mockSeries(n = 180) {
  return Array.from({ length: n }, (_, i) =>
    Math.max(0, 120 + i * 0.8 + Math.sin(i / 7) * 6)
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("url") || "";

    let source: "GSC" | "Mock" = "Mock";
    let clicks: number[] = [];
    let ctr: number[] = [];

    if (!FORCE_MOCK && raw) {
      try {
        const normalized = normalizeUrl(raw);
        if (normalized) {
          const siteUrl = toGscSiteUrl(normalized);
          const rows = await getDailySearchData(siteUrl, 180);
          clicks = rows.map(r => r.clicks);
          ctr = rows.map(r => r.ctr);
          if (clicks.some(v => v > 0)) source = "GSC";
        }
      } catch (e) {
        // fall back to mock
        // eslint-disable-next-line no-console
        console.warn("[/api/predictions] GSC fetch failed:", (e as Error)?.message);
      }
    }

    if (!clicks.length) clicks = mockSeries(180);

    // Base forecast
    const base = forecast30(clicks);

    // Apply small bounded nudges from CTR trend (GSC only)
    const nudged = applyNudges(base.forecast, { ctrSeries: ctr.length ? ctr : undefined });
    const forecast = nudged.adjusted;
    const scale = 1 + nudged.totalNudge;
    const bandLow = base.bandLow.map(v => v * scale);
    const bandHigh = base.bandHigh.map(v => v * scale);

    const baseline = base.baseline;
    const growthPct = (() => {
      const sF = forecast.reduce((a,b)=>a+b,0);
      const sB = baseline.reduce((a,b)=>a+b,0);
      return sB ? (sF - sB) / sB : 0;
    })();

    return NextResponse.json(
      {
        source,
        growthPct,
        forecast,
        baseline,
        bandLow,
        bandHigh,
        // Optional extras you already show in the UI:
        breakdown: {
          predictedVisitors: Math.round(forecast.reduce((a, b) => a + b, 0)),
          leadsGrowth: 320,        // placeholder; wire your own logic later
          ctrImprovement: nudged.details.ctr ?? 0,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (e) {
    console.error("[/api/predictions] error:", e);
    return NextResponse.json(
      {
        source: "Mock",
        growthPct: 0,
        forecast: Array(30).fill(0),
        baseline: Array(30).fill(0),
        bandLow: Array(30).fill(0),
        bandHigh: Array(30).fill(0),
      },
      { status: 200 }
    );
  }
}
