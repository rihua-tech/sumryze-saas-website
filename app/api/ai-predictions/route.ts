// /app/api/ai-predictions/route.ts
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
    const raw = (searchParams.get("url") || "").trim();

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
        }
      } catch (e) {
        console.warn("[/api/ai-predictions] GSC fetch failed:", (e as Error)?.message);
      }
    }

    if (!clicks.length) clicks = mockSeries(180);

    // Base forecast (next 30) + baseline (last 30 smoothed)
    const base = forecast30(clicks);

    // Apply small bounded nudges from CTR (if present)
    const nudged = applyNudges(base.forecast, { ctrSeries: ctr.length ? ctr : undefined });
    const forecast = nudged.adjusted;

    // Derive UI fields your card expects
    const predictedVisitors = Math.round(forecast.reduce((a, b) => a + b, 0));
    const baselineSum = base.baseline.reduce((a, b) => a + b, 0);
    const forecastPercent = Math.round(
      baselineSum ? ((predictedVisitors - baselineSum) / baselineSum) * 100 : 0
    );

    // Keep leadsGrowth as a placeholder until you wire a real model
    const leadsGrowth = 320;

    // ctrImprovement shown as a percentage (e.g., 1.5)
    const ctrImprovement = Math.round(((nudged.details.ctr ?? 0) * 100) * 10) / 10;

    // Your original route returned 7 points. If your chart can use all 30, great.
    // If it must be 7, slice below:
    // const chartData = forecast.slice(0, 7);
    const chartData = forecast; // 30 points for a smoother curve

    return NextResponse.json(
      { chartData, predictedVisitors, leadsGrowth, ctrImprovement, forecastPercent },
      {
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (e) {
    console.error("[/api/ai-predictions] error:", e);
    // Safe fallback so the card still renders
    return NextResponse.json({
      chartData: [12000, 13500, 14000, 15000, 16000, 17000, 18500],
      predictedVisitors: 18500,
      leadsGrowth: 320,
      ctrImprovement: 1.5,
      forecastPercent: 22,
    });
  }
}
