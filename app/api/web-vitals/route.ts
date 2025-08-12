

// app/api/web-vitals/route.ts
import { NextResponse } from "next/server";
import { getWebVitals } from "@/lib/services/webVitals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url");

    const result = await getWebVitals(rawUrl, {
      forceMock: process.env.WEB_VITALS_FORCE_MOCKS === "true",
      apiKey: process.env.PSI_API_KEY,
      strategy: "mobile", // or "desktop"
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[/api/web-vitals] error:", err);
    const fallback = await getWebVitals(null, { forceMock: true });
    return NextResponse.json(fallback, { status: 200 });
  }
}
