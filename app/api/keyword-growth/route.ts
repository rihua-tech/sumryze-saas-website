// app/api/keyword-growth/route.ts
import { NextResponse } from "next/server";

type Period = "weekly" | "monthly";
type Point = { day: string; count: number };

const MOCK_WEEKLY: Point[] = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 130 },
  { day: "Wed", count: 160 },
  { day: "Thu", count: 155 },
  { day: "Fri", count: 180 },
  { day: "Sat", count: 200 },
  { day: "Sun", count: 240 },
];

const MOCK_MONTHLY: Point[] = [
  { day: "Jan", count: 400 },
  { day: "Feb", count: 450 },
  { day: "Mar", count: 470 },
  { day: "Apr", count: 500 },
  { day: "May", count: 550 },
  { day: "Jun", count: 590 },
  { day: "Jul", count: 650 },
  { day: "Aug", count: 700 },
  { day: "Sep", count: 780 },
  { day: "Oct", count: 820 },
  { day: "Nov", count: 880 },
  { day: "Dec", count: 900 },
];

/* ---------------- Live adapter scaffolding ----------------
   Flip GOOGLE_KEYWORD_LIVE="true" and implement fetchFromGoogle()
   when you’re ready to connect to Google (GSC/GA4/your data source).
---------------------------------------------------------------- */

const LIVE_ENABLED = process.env.GOOGLE_KEYWORD_LIVE === "true";

/** Map a JS Date to "Mon"..."Sun" */
function labelDow(d: Date) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
}
/** Map 0..11 to "Jan"..."Dec" */
function labelMonth(i: number) {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i];
}

/**
 * Example adapter – replace the TODO with your Google API call.
 * Must return an array of { day, count } matching the shape above.
 */
async function fetchFromGoogle(targetUrl: string, period: Period): Promise<Point[]> {
  // TODO: Replace with a real call to your data source.
  // For example, Query GSC for total keywords/ranking keywords by day/month.
  // Expected internal result (pseudo):
  // const rows = await gsc.getKeywordCounts({ siteUrl: targetUrl, window: period === "weekly" ? 7 : 12*30 });
  // return rows.map(r => ({ day: ..., count: ... }));

  // ── Example of shaping hypothetical results into the expected format:
  // Suppose you receive [{ date: "2025-08-01", count: 123 }, ...]
  // const points: Point[] = rows.map(({ date, count }) => {
  //   const d = new Date(date);
  //   return period === "weekly"
  //     ? { day: labelDow(d), count }
  //     : { day: labelMonth(d.getMonth()), count };
  // });

  // For now, just throw to force fallback to mocks until implemented.
  throw new Error("fetchFromGoogle not implemented");
}

/** Decide data source: live (if enabled) or mock, with safe fallback. */
async function getKeywordGrowthData(targetUrl: string | null, period: Period): Promise<Point[]> {
  if (LIVE_ENABLED && targetUrl) {
    try {
      const live = await fetchFromGoogle(targetUrl, period);
      if (Array.isArray(live) && live.length) return live;
    } catch (err) {
      console.warn("[keyword-growth] live fetch failed, falling back to mock:", (err as Error)?.message);
    }
  }
  return period === "weekly" ? MOCK_WEEKLY : MOCK_MONTHLY;
}

/* ---------------- Route handler ---------------- */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const periodParam = (searchParams.get("period") || "weekly").toLowerCase() as Period;
    const targetUrl = searchParams.get("url");

    if (periodParam !== "weekly" && periodParam !== "monthly") {
      return NextResponse.json(
        { error: "Invalid period. Use 'weekly' or 'monthly'." },
        { status: 400 }
      );
    }

    const data = await getKeywordGrowthData(targetUrl, periodParam);

    return NextResponse.json(
      { data },
      {
        headers: { "Cache-Control": "no-store" }, // avoid stale data in dev
      }
    );
  } catch (err) {
    console.error("Keyword Growth API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
