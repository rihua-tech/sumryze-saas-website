// app/api/kpis/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");

    // ✅ Validate input
    if (!targetUrl) {
      return NextResponse.json(
        { error: "Missing target URL." },
        { status: 400 }
      );
    }

    // ✅ Simulate real URL-based logic (in future connect DB/API)
    let data;

    if (targetUrl.includes("example.com")) {
      data = [
        { title: "SEO Score", value: 85, delta: "+4" },
        { title: "Top Pages", value: 12, delta: "+3" },
        { title: "Conversions", value: "4.8%", delta: "+1.2%" },
        { title: "Revenue", value: "$22,450", delta: "+9%" },
      ];
    } else {
      data = [
        { title: "SEO Score", value: 78, delta: "+6" },
        { title: "Top Pages", value: 5, delta: "+2" },
        { title: "Conversions", value: "3.4%", delta: "-1%", down: true },
        { title: "Revenue", value: "$12,847", delta: "+15%" },
      ];
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("KPI API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
