// app/api/traffic/route.ts
import { NextResponse } from "next/server";
import { getTraffic, normalizeHost, parsePeriod, weakETag, type Period } from "@/lib/services/traffic";

export const runtime = "nodejs";         // use memory micro-cache reliably
export const dynamic = "force-dynamic";  // always run (we control caching via headers)

/**
 * GET /api/traffic?period=weekly|monthly&url=<site or url>
 * Returns: { data: [{date,traffic}], isMock, source, ts }
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = parsePeriod(searchParams.get("period"));
    const inputUrl = searchParams.get("url");

    // Validate query
    if (!inputUrl) {
      return NextResponse.json({ error: "Missing 'url' parameter." }, { status: 400 });
    }
    if (!period) {
      return NextResponse.json({ error: "Invalid 'period'. Use 'weekly' or 'monthly'." }, { status: 400 });
    }

    const host = normalizeHost(inputUrl);
    if (!host) {
      return NextResponse.json({ error: "Invalid URL." }, { status: 422 });
    }

    // Core fetch (micro-cached)
    const result = await getTraffic(host, period as Period);

    // ETag / conditional GET (cheap bandwidth win)
    const body = { data: result.data, isMock: result.isMock, source: result.source, ts: result.ts };
    const etag = weakETag(body);
    const inm = req.headers.get("if-none-match");
    if (inm && inm === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
          ETag: etag,
          Vary: "Accept, Accept-Encoding, Origin",
        },
      });
    }

    // HTTP cache (edge/CDN): short micro-TTL + good SWR
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
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
