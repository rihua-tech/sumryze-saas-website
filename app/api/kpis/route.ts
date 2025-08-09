// app/api/kpis/route.ts
import { NextResponse } from "next/server";

type KPIData = {
  title: "SEO Score" | "Top Pages" | string;
  value: number | string;
  delta?: string;   // e.g. "+4", "-3%", "+15%"
  down?: boolean;   // true when delta is negative
};

function makeItem(title: KPIData["title"], value: KPIData["value"], delta?: string): KPIData {
  const isDown = typeof delta === "string" && delta.trim().startsWith("-");
  return { title, value, delta, down: isDown };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url")?.trim();

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing target URL." }, { status: 400 });
    }

    // (Optional) very light sanity check
    const looksLikeUrl = /^https?:\/\/.+/i.test(targetUrl);
    if (!looksLikeUrl) {
      return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    let data: KPIData[];

    // ✅ Simulated branching (swap for real DB/API later)
    if (targetUrl.includes("example.com")) {
      data = [
        makeItem("SEO Score", 90, "+4"),
        makeItem("Top Pages", 12, "+3"),
        makeItem("Conversions", "4.8%", "+1.2%"),
        makeItem("Revenue", "$22,450", "+9%"),
      ];
    } else {
      data = [
        makeItem("SEO Score", 78, "+6"),
        makeItem("Top Pages", 5, "+2"),
        makeItem("Conversions", "3.4%", "-1%"),
        makeItem("Revenue", "$12,847", "+15%"),
      ];
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store", // avoid stale during dev
      },
    });
  } catch (err) {
    console.error("KPI API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
