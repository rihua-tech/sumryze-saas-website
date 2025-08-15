// app/api/traffic/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { getTraffic, normalizeHost, parsePeriod, weakETag } from "@/lib/services/traffic";

export const runtime = "nodejs";         // allow in-memory micro-cache
export const dynamic = "force-dynamic";  // we control caching via headers

/**
 * GET /api/traffic?period=weekly|monthly&url=<site or url>
 * Returns: { data: [{date,traffic}], isMock, source, ts, period, host }
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = parsePeriod(searchParams.get("period"));
    const inputUrl = searchParams.get("url");

    const host = normalizeHost(inputUrl);
    const result = await getTraffic(host, period);

    const body = {
      data: Array.isArray(result?.data) ? result.data : [],
      isMock: !!result?.isMock,
      source: result?.source ?? "mock",
      ts: result?.ts ?? Date.now(),
      period,
      host,
    };

    const etag = weakETag(body);
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
        ETag: etag,
        Vary: "Accept, Accept-Encoding, Origin",
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[Traffic API Error]", err);
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
