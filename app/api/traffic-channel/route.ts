
// app/api/traffic-channel/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing 'url' parameter" }, { status: 400 });
    }

    // ✅ You can later replace this with real DB/API query:
    const mockData: Record<string, number[]> = {
      "example.com": [8000, 5000, 3000, 2000, 1000],
      "test.com": [6000, 4000, 2500, 1800, 900],
    };

    const defaultData = [7000, 4500, 2200, 1550, 700];

    const series = mockData[targetUrl] || defaultData;

    return NextResponse.json({
      labels: ["Organic", "Paid", "Social", "Referral", "Email"],
      series,
    });
  } catch (err) {
    console.error("API error in /api/traffic-channel:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

