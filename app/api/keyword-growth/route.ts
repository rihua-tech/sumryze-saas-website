// app/api/keyword-growth/route.ts
import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getKeywordGrowthData, mockKeywordGrowth, type Period } from "@/lib/services/keywords";
import { toGscSiteUrl } from "@/lib/services/gsc"; // you already have this helper

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORCE_MOCK = process.env.KEYWORD_FORCE_MOCKS === "true";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = (searchParams.get("period") === "monthly" ? "monthly" : "weekly") as Period;
  const raw = (searchParams.get("url") || "").trim();

  let data;
  let isMock = false;

  try {
    if (FORCE_MOCK || !raw) {
      isMock = true;
      data = mockKeywordGrowth(period);
    } else {
      const normalized = normalizeUrl(raw);
      if (!normalized) {
        return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
      }
      try {
        const siteUrl = toGscSiteUrl(normalized);
        data = await getKeywordGrowthData(siteUrl, period);
        if (!Array.isArray(data) || !data.length) {
          isMock = true;
          data = mockKeywordGrowth(period);
        }
      } catch (err) {
        console.warn("[/api/keyword-growth] live fetch failed → fallback:", (err as Error)?.message);
        isMock = true;
        data = mockKeywordGrowth(period);
      }
    }

    return NextResponse.json(
      { data, isMock },
      {
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error("[/api/keyword-growth] error:", err);
    // last-resort safe payload so the UI never breaks
    return NextResponse.json(
      { data: mockKeywordGrowth(period), isMock: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "CDN-Cache-Control": "no-store",
          "Vercel-CDN-Cache-Control": "no-store",
        },
      }
    );
  }
}
