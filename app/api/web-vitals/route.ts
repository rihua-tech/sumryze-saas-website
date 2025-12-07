// app/api/web-vitals/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const API_KEY = process.env.PAGE_SPEED_API_KEY?.trim();
if (!API_KEY) console.warn("[CWV API] Warning: PAGE_SPEED_API_KEY is missing.");

function extractMetric(obj: any, key: string): number | null {
  // Some URLs have missing CrUX data
  const val = obj?.loadingExperience?.metrics?.[key]?.percentile;
  return typeof val === "number" ? val : null;
}

// Normalize PSI response to unified structure
function normalizeVitals(json: any) {
  if (!json) return null;

  const LCP = extractMetric(json, "LARGEST_CONTENTFUL_PAINT_MS");
  const INP = extractMetric(json, "INTERACTION_TO_NEXT_PAINT");
  const CLS = extractMetric(json, "CUMULATIVE_LAYOUT_SHIFT_SCORE");

  // If all are null → PSI had no CrUX data
  if (LCP === null && INP === null && CLS === null) return null;

  return [
    {
      name: "LCP",
      value: LCP !== null ? +(LCP / 1000).toFixed(2) : null,
      target: 2.5,
      unit: "s",
      thresholds: [2.5, 4.0],
      color: "#10b981",
    },
    {
      name: "INP",
      value: INP !== null ? INP : null,
      target: 200,
      unit: "ms",
      thresholds: [200, 500],
      color: "#3b82f6",
    },
    {
      name: "CLS",
      value: CLS !== null ? +(CLS / 100).toFixed(3) : null,
      target: 0.1,
      unit: "",
      thresholds: [0.1, 0.25],
      color: "#f59e0b",
    },
  ];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url");

    if (!rawUrl) {
      return NextResponse.json({ vitals: null, error: "Missing ?url=" });
    }

    const strategyParam = searchParams.get("strategy");
    const strategy = strategyParam === "desktop" ? "desktop" : "mobile";

    const apiUrl = `${PSI_ENDPOINT}?url=${encodeURIComponent(rawUrl)}&key=${API_KEY}&strategy=${strategy}`;

    const resp = await fetch(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    const json = await resp.json();

    if (!resp.ok) {
      console.warn("[CWV API] PSI returned error:", json?.error?.message);
      return NextResponse.json({
        vitals: null,
        error: json?.error?.message || `PSI error ${resp.status}`,
      });
    }

    // Normalize metrics
    const vitals = normalizeVitals(json);

    return NextResponse.json({
      vitals,
      error: vitals ? null : "No Core Web Vitals data for this URL.",
    });
  } catch (err: any) {
    console.error("[CWV API] Fatal error:", err.message);
    return NextResponse.json({
      vitals: null,
      error: err.message || "Unexpected server error.",
    });
  }
}
