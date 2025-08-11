import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/normalizeUrl";
import { getTopPages } from "@/lib/services/topPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const raw = new URL(req.url).searchParams.get("url") ?? "";
    const normalized = normalizeUrl(raw);
    if (!normalized) return NextResponse.json({ error: "Invalid URL" }, { status: 400 });

    const data = await getTopPages(normalized);
    return NextResponse.json({ title: "Top Pages", ...data }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[/api/top-pages] error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
