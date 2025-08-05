// app/api/content-performance/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ✅ Extract URL parameter from the query string
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");

    // ✅ Validate presence of URL
    if (!targetUrl) {
      return NextResponse.json(
        { error: "Missing 'url' query parameter" },
        { status: 400 }
      );
    }

    // ✅ TODO: Replace this with real analysis logic later
    // For now, simulate different responses per URL
    const contentPerformance = {
      wordCount: 950,
      qualityScore: 87,
      metaPresent: !targetUrl.includes("no-meta"),
      titlePresent: !targetUrl.includes("no-title"),
    };

    return NextResponse.json(contentPerformance);
  } catch (error) {
    console.error("[ContentPerformance API]", error);
    return NextResponse.json(
      { error: "Failed to get content performance" },
      { status: 500 }
    );
  }
}
