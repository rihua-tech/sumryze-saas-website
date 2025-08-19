import { NextRequest, NextResponse } from "next/server";
import {
  analyzeContentPerformance,
  isExternalHttpUrl,
  CONTENT_PERF_CACHE_TTL_MS,
} from "@/lib/services/contentPerformanceService";

export const runtime = "nodejs"; // ensure Node, not Edge

const DEMO_BLOCKLIST = new Set([
  "example.com",
  "www.example.com",
  // add any dev defaults here
]);

function pick<T extends Record<string, any>>(obj: T, fields?: string): Partial<T> {
  if (!fields) return obj;
  const allow = new Set(fields.split(",").map(s => s.trim()).filter(Boolean));
  const out: Partial<T> = {};
  for (const k of allow) if (k in obj) (out as any)[k] = (obj as any)[k];
  return out;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url") || "";
    const fields = searchParams.get("fields") || undefined;

    const forceMocks = process.env.CONTENT_PERF_FORCE_MOCKS === "true";

    let externalUrl = "";
    if (!forceMocks) {
      externalUrl = isExternalHttpUrl(rawUrl, DEMO_BLOCKLIST);
    }

    const { data } = await analyzeContentPerformance({
      url: externalUrl,               // empty => demo
      forceDemo: forceMocks || !externalUrl,
    });

    // cache headers align with in-memory TTL (good for proxies/CDN later)
    const ttl = Math.max(30, Math.floor(CONTENT_PERF_CACHE_TTL_MS / 1000));
    const headers = {
      "Cache-Control": `public, max-age=0, s-maxage=${ttl}, stale-while-revalidate=${Math.max(
        30,
        Math.floor(ttl / 2)
      )}`,
    };

    return NextResponse.json(pick(data, fields), { status: 200, headers });
  } catch {
    const { data } = await analyzeContentPerformance({ url: "", forceDemo: true });
    return NextResponse.json(data, { status: 200 });
  }
}
