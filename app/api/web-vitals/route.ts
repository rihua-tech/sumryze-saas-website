// app/api/web-vitals/route.ts
import { NextResponse } from "next/server";
import { getWebVitals } from "@/lib/services/webVitals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");
  const strategyParam = (searchParams.get("strategy") || "mobile").toLowerCase();
  const strategy: "mobile" | "desktop" = strategyParam === "desktop" ? "desktop" : "mobile";

  if (!rawUrl) {
    return NextResponse.json({ error: "Query param `url` is required." }, { status: 400 });
  }

  try {
    const result = await getWebVitals(rawUrl, {
      apiKey: process.env.PSI_API_KEY,
      strategy,
    });

    // Optional edge cache for LIVE CrUX (slow-moving, safe). Set via env if desired.
    const sMaxAge = Number(process.env.WEB_VITALS_SMAXAGE || "0");                 // e.g., 600
    const swr     = Number(process.env.WEB_VITALS_STALE_WHILE_REVALIDATE || "0");  // e.g., 1800
    const cacheCtl =
      sMaxAge > 0
        ? `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`
        : "no-store";

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": cacheCtl,
        "CDN-Cache-Control": cacheCtl,
        "Vercel-CDN-Cache-Control": cacheCtl,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch Core Web Vitals." }, { status: 400 });
  }
}
