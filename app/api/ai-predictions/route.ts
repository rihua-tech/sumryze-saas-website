// /app/api/ai-predictions/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getDailySearchData, toGscSiteUrl } from "@/lib/services/gsc";
import { forecast30, applyNudges } from "@/lib/services/predict";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORCE_MOCK = process.env.PREDICTIONS_FORCE_MOCKS === "true";
const API_TIMEOUT_MS = 10_000;
const MIN_HORIZON = 7;
const MAX_HORIZON = 90;

/* ----------------------- tiny in-memory rate limiter ---------------------- */
// (for prod consider Upstash, Cloudflare Turnstile, etc.)
const limiter = (() => {
  const BUCKET = new Map<string, { t: number; last: number }>();
  const CAP = 60;           // tokens
  const REFILL_PER_SEC = 1; // tokens/sec
  return (key: string) => {
    const now = Date.now();
    const s = BUCKET.get(key) ?? { t: CAP, last: now };
    const gained = ((now - s.last) / 1000) * REFILL_PER_SEC;
    s.t = Math.min(CAP, s.t + gained);
    s.last = now;
    if (s.t < 1) return false;
    s.t -= 1;
    BUCKET.set(key, s);
    return true;
  };
})();

function clientKey(req: Request) {
  const h = new Headers(req.headers);
  return (
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "anon"
  );
}

/* --------------------------------- utils --------------------------------- */
function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

async function withTimeout<T>(p: Promise<T>, ms = API_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}

function mockSeries(n = 180, drift = 0.8): number[] {
  // smooth, gently rising demo series
  return Array.from({ length: n }, (_, i) =>
    Math.max(0, 120 + i * drift + Math.sin(i / 7) * 6)
  );
}

/* --------------------------------- types --------------------------------- */
type PredictionResponse = {
  chartData: number[];       // median path (forecast horizon)
  bandLow?: number[];        // optional uncertainty band
  bandHigh?: number[];
  predictedVisitors: number; // last point (fallback for UI)
  leadsGrowth: number;
  ctrImprovement: number;    // e.g. 1.5 → +1.5%
  forecastPercent: number;   // sum(forecast)/sum(baseline) - 1
  source: "GSC" | "GA4";
  horizon: number;
  isMock: boolean;           // ← let the card show “Example” badge
};

export async function GET(req: Request) {
  try {
    /* ----------------------------- rate limiting ----------------------------- */
    if (!limiter(clientKey(req))) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    /* --------------------------- parse & validate --------------------------- */
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();
    const sourceParam = (searchParams.get("source") || "gsc").toUpperCase();
    const source: "GSC" | "GA4" = sourceParam === "GA4" ? "GA4" : "GSC";

    const horizon = clamp(
      Number(searchParams.get("horizon") || 30),
      MIN_HORIZON,
      MAX_HORIZON
    );

    /* --------------------------- load historical data --------------------------- */
    let clicks: number[] = [];
    let ctr: number[] = [];
    let isMock = false;

    if (!FORCE_MOCK && raw) {
      try {
        const normalized = normalizeUrl(raw);
        if (normalized) {
          const siteUrl = toGscSiteUrl(normalized);
          const rows = await withTimeout(getDailySearchData(siteUrl, 180));
          clicks = rows.map((r) => r.clicks);
          ctr = rows.map((r) => r.ctr);
        } else {
          isMock = true;
        }
      } catch (e: any) {
        console.warn("[/api/ai-predictions] GSC fetch failed:", e?.message || e);
        isMock = true;
      }
    } else {
      isMock = true;
    }

    if (!clicks.length) {
      clicks = mockSeries(180);
    }

    /* ---------------------------- forecasting core ---------------------------- */
    // Base 30-day forecast from history (+ a baseline representing "recent normal")
    const base = await withTimeout(Promise.resolve(forecast30(clicks)));
    // Optional behavioral nudges from CTR (bounded in the service)
    const nudged = applyNudges(base.forecast, {
      ctrSeries: ctr.length ? ctr : undefined,
    });
    const forecast = nudged.adjusted;

    // Take the horizon slice the UI wants (30 by default)
    const chartData = forecast.slice(0, horizon);

    // Baseline for the same span (fallback to last horizon days of history if needed)
    const baselineArr =
      (Array.isArray(base.baseline) && base.baseline.length
        ? base.baseline
        : clicks
      ).slice(-horizon);

    const forecastSum = chartData.reduce((a, b) => a + b, 0);
    const baselineSum = baselineArr.reduce((a, b) => a + b, 0);

    const predictedVisitors = Math.round(chartData.at(-1) ?? 0);
    const forecastPercent = Math.round(
      baselineSum ? ((forecastSum - baselineSum) / baselineSum) * 100 : 0
    );

    // Placeholder business KPIs — keep until modeled
    const leadsGrowth = 320;
    const ctrImprovement = Math.round(((nudged.details.ctr ?? 0) * 100) * 10) / 10;

    const body: PredictionResponse = {
      chartData,
      // surface bands if your forecast service provides them
      bandLow: Array.isArray((base as any).low)
        ? (base as any).low.slice(0, horizon)
        : undefined,
      bandHigh: Array.isArray((base as any).high)
        ? (base as any).high.slice(0, horizon)
        : undefined,
      predictedVisitors,
      leadsGrowth,
      ctrImprovement,
      forecastPercent,
      source,
      horizon,
      isMock,
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[/api/ai-predictions] fatal:", e);
    // Rock-solid fallback so the card never breaks
    const fallback: PredictionResponse = {
      chartData: mockSeries(30, 2).slice(0, 30),
      predictedVisitors: 282,
      leadsGrowth: 320,
      ctrImprovement: 0.0,
      forecastPercent: 10,
      source: "GSC",
      horizon: 30,
      isMock: true,
    };
    return NextResponse.json(fallback, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
      status: 200,
    });
  }
}
