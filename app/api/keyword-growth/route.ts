// app/api/keyword-growth/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getKeywordGrowthData, mockKeywordGrowth, type Period } from "@/lib/services/keywords";
import { toGscSiteUrl } from "@/lib/services/gsc";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORCE_MOCK = process.env.KEYWORD_FORCE_MOCKS === "true";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = (searchParams.get("period") === "monthly" ? "monthly" : "weekly") as Period;
  const raw = (searchParams.get("url") || "").trim();
  const prMock = searchParams.get("mock"); // ?mock=1 forces mock

  let data;
  let isMock = false;
  let mockReason: string | undefined;
  let siteUrlResolved: string | undefined;

  try {
    // Mock gates
    if (prMock === "1" || FORCE_MOCK) {
      isMock = true;
      mockReason = prMock === "1" ? "query:mock=1" : "env:KEYWORD_FORCE_MOCKS";
      data = mockKeywordGrowth(period);
    } else if (!raw) {
      isMock = true;
      mockReason = "missing url";
      data = mockKeywordGrowth(period);
    } else {
      const normalized = normalizeUrl(raw);
      if (!normalized) {
        return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
      }

      try {
        siteUrlResolved = toGscSiteUrl(normalized);
        // Live data
        data = await getKeywordGrowthData(siteUrlResolved, period);

        if (!Array.isArray(data) || data.length === 0) {
          isMock = true;
          mockReason = "empty live data";
          data = mockKeywordGrowth(period);
        }
      } catch (err: any) {
        console.warn("[/api/keyword-growth] live fetch failed → fallback:", err?.message || err);
        isMock = true;
        mockReason = "gsc error";
        data = mockKeywordGrowth(period);
      }
    }

    // Optional: expose minimal meta for UI labeling / debugging
    const meta = {
      period,
      siteUrl: siteUrlResolved || null,
      // If your service exposes the exact window internally, surface it here.
      // Otherwise you can leave as null or compute it the same way here.
      window: null as { start: string; end: string } | null,
    };

    return NextResponse.json(
      { data, isMock, mockReason, meta },
      {
        headers: {
          // keep no-store if you prefer always-fresh server responses
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("[/api/keyword-growth] error:", err);
    return NextResponse.json(
      {
        data: mockKeywordGrowth(period),
        isMock: true,
        mockReason: "route error",
        meta: { period, siteUrl: null, window: null },
      },
      {
        status: 200, // safe payload to avoid UI errors
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  }
}
