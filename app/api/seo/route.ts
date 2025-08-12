// app/api/seo/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeUrl } from "@/lib/normalizeUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Config
const API_TIMEOUT_MS = 10_000;
const USE_MOCKS = process.env.KPI_FORCE_MOCKS === "true";

// ── Zod schema: { value, delta? } — value is coerced to number
const SeoResult = z.object({
  value: z.preprocess((v) => {
    if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
    return v;
  }, z.number()),
  delta: z.string().optional(),
});

// ── Helpers
function noStore() {
  return {
    "Cache-Control": "no-store",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
  };
}

async function fetchWithTimeout(
  input: string | URL,
  init?: RequestInit,
  ms = API_TIMEOUT_MS
) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort("timeout"), ms);
  try {
    return await fetch(input, {
      ...init,
      signal: ac.signal,
      cache: "no-store",
      headers: { accept: "application/json", ...(init?.headers || {}) },
    });
  } finally {
    clearTimeout(t);
  }
}

// Deterministic demo data (seeded by URL) — keeps UI stable without real backend
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}
function fallbackSEO(urlForSeed: string): { value: number; delta: string } {
  const seed = hash(urlForSeed);
  // 80..95, with a tiny variance; “example” gets a neat round 90
  const host = new URL(urlForSeed).hostname.toLowerCase();
  const base = host.includes("example") ? 90 : 80 + (seed % 16); // 80..95
  const value = Math.max(0, Math.min(100, base));
  const deltaNum = ((seed % 5) - 2); // -2..+2
  const delta = (deltaNum >= 0 ? "+" : "") + deltaNum.toString();
  return { value, delta };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = (searchParams.get("url") || "").trim();

    // Allow demo mode via special scheme; otherwise normalize (and reject invalids)
    const normalized =
      raw.startsWith("demo://") ? "" : normalizeUrl(raw) || "";

    // If invalid/empty URL or mocks forced → deterministic demo
    if (!normalized || USE_MOCKS) {
      const demoUrl = normalized || "https://demo.example.com/";
      const demo = fallbackSEO(demoUrl);
      const parsed = SeoResult.parse(demo);
      // clamp to 0..100 just in case
      const clamped = Math.max(0, Math.min(100, parsed.value));
      return NextResponse.json({ value: clamped, delta: parsed.delta ?? "+0" }, { headers: noStore() });
    }

    // ── Real implementation:
    // Put your actual SEO score provider call(s) here.
    // Example scaffold:
    //
    // const providerURL = new URL("https://your-seo-provider.example/score");
    // providerURL.searchParams.set("url", normalized);
    // const res = await fetchWithTimeout(providerURL);
    // if (!res.ok) throw new Error(`Provider error ${res.status}`);
    // const rawJson = await res.json(); // expect { value, delta? }
    // const parsed = SeoResult.parse(rawJson);
    //
    // For now, we’ll synthesize a stable-but-realistic value from the URL:
    const synth = fallbackSEO(normalized);
    const parsed = SeoResult.parse(synth);

    // ensure 0..100 for safety
    const clamped = Math.max(0, Math.min(100, parsed.value));

    return NextResponse.json({ value: clamped, delta: parsed.delta ?? "+0" }, {
      headers: noStore(),
    });
  } catch (err) {
    console.error("[/api/seo] fatal:", err);
    // Last-resort demo so dashboard never breaks
    const demo = fallbackSEO("https://demo.example.com/");
    return NextResponse.json({ value: demo.value, delta: demo.delta }, {
      status: 200,
      headers: noStore(),
    });
  }
}
