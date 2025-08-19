// app/api/web-vitals/route.ts
import { NextResponse } from "next/server";
import { getWebVitals } from "@/lib/services/webVitals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url");
    const strategyParam = (searchParams.get("strategy") || "mobile").toLowerCase();

    const strategy = strategyParam === "desktop" ? "desktop" : "mobile";

    const result = await getWebVitals(rawUrl, {
      forceMock: process.env.WEB_VITALS_FORCE_MOCKS === "true",
      apiKey: process.env.PSI_API_KEY,
      strategy,
    });

    // Optional edge cache (safe because CrUX is slow-moving). Configure via env.
    const sMaxAge = Number(process.env.WEB_VITALS_SMAXAGE || "0");            // e.g., 600
    const swr     = Number(process.env.WEB_VITALS_STALE_WHILE_REVALIDATE || "0"); // e.g., 1800
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
  } catch (err) {
    console.error("[/api/web-vitals] error:", err);
    const fallback = await getWebVitals(null, { forceMock: true });
    return NextResponse.json(fallback, { status: 200 });
  }
}
