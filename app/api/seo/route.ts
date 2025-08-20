// app/api/seo/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getSeoScorePSI, type Device } from "@/lib/services/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Config */
const API_TIMEOUT_MS = 10_000;
const FORCE_MOCKS = process.env.KPI_FORCE_MOCKS === "true";

/** Response shape */
const SeoPayload = z.object({
  value: z.number().min(0).max(100),
  delta: z.string().optional(),
  down: z.boolean().optional(),
  isMock: z.boolean(),
});

/** Cache headers (always no-store) */
function noStore() {
  return {
    "Cache-Control": "no-store",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
  };
}

/** Deterministic demo generator (seeded by URL) */
function hash32(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function demoScore(seedKey: string) {
  const h = hash32(`seo|${seedKey}`);
  // 80–95 (round numbers feel nicer for a KPI)
  const base = 80 + (h % 16); // 80..95
  // tiny, signed delta −2..+2
  const d = (h % 5) - 2;
  return {
    value: Math.max(0, Math.min(100, base)),
    delta: `${d >= 0 ? "+" : ""}${d}`,
    down: d < 0,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = (searchParams.get("url") || "").trim();
    const deviceParam = (searchParams.get("device") || "mobile").toLowerCase();
    const mockParam = searchParams.get("mock") === "1";

    const device: Device = deviceParam === "desktop" ? "desktop" : "mobile";

    // Demo mode when: no URL, mock flag, or env forces mocks
    const normalized = rawUrl ? normalizeUrl(rawUrl) : null;
    const shouldMock = FORCE_MOCKS || mockParam || !normalized;

    if (shouldMock) {
      const seed = normalized || "https://demo.example.com/";
      const demo = demoScore(seed);
      const payload = SeoPayload.parse({ ...demo, isMock: true });
      return NextResponse.json(payload, { headers: noStore() });
    }

    // Live call to PSI with a hard abort guard
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), API_TIMEOUT_MS);

    const value = await getSeoScorePSI(normalized!, device, ac.signal);

    clearTimeout(timer);

    if (value == null) {
      // Network/API failure → deterministic demo so UI still shows something
      const demo = demoScore(normalized!);
      const payload = SeoPayload.parse({ ...demo, isMock: true });
      return NextResponse.json(payload, { headers: noStore() });
    }

    // Successful live result (no delta from server — keep UI honest)
    const payload = SeoPayload.parse({
      value: Math.max(0, Math.min(100, value)),
      isMock: false,
    });
    return NextResponse.json(payload, { headers: noStore() });
  } catch (err) {
    console.error("[/api/seo] error:", err);
    // Last-resort deterministic demo. Never break the dashboard.
    const demo = demoScore("https://demo.example.com/");
    const payload = SeoPayload.parse({ ...demo, isMock: true });
    return NextResponse.json(payload, { headers: noStore(), status: 200 });
  }
}
