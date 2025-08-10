// app/api/kpis/route.ts
import { NextResponse } from "next/server";

type KPIData = {
  title: "SEO Score" | "Top Pages" | string;
  value: number | string;
  delta?: string;     // e.g. "+4", "-3%", "+15%"
  down?: boolean;     // true when delta is negative
  series?: number[];  // ← NEW: trend points for sparkline (e.g., last 7)
};

function makeItem(title: KPIData["title"], value: KPIData["value"], delta?: string, series?: number[]): KPIData {
  const isDown = typeof delta === "string" && delta.trim().startsWith("-");
  return { title, value, delta, down: isDown, series };
}

/* --- helpers for stable mock trends --- */

// simple stable hash from a string
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return Math.abs(h >>> 0);
}

// seeded PRNG (xorshift-ish)
function makeRng(seed: number) {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
}

// random-walk series ending at endValue
function makeSeries(endValue: number, len = 7, seed = 1, step = 3) {
  const rand = makeRng(seed);
  const arr: number[] = new Array(len);
  let cur = endValue - (len - 1);
  for (let i = 0; i < len; i++) {
    // jitter in [-step, +step]
    const jitter = Math.round((rand() * 2 - 1) * step);
    cur = Math.max(0, cur + jitter);
    arr[i] = cur;
  }
  arr[len - 1] = endValue; // ensure last point = current value
  return arr;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url")?.trim();

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing target URL." }, { status: 400 });
    }

    const looksLikeUrl = /^https?:\/\/.+/i.test(targetUrl);
    if (!looksLikeUrl) {
      return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    // stable seed per URL so values don't jump every refresh
    const seed = hash(targetUrl);

    let data: KPIData[];

    // ✅ Simulated branching (swap for real DB/API later)
    if (targetUrl.includes("example.com")) {
      const seo = 90;
      const pages =15;
      const pagesSeries = makeSeries(pages, 7, seed, 2); // small jitter
      data = [
        makeItem("SEO Score", seo, "+4"),
        makeItem("Top Pages", pages, "+2", pagesSeries),
        makeItem("Conversions", "4.8%", "+1.2%"),
        makeItem("Revenue", "$22,450", "+9%"),
      ];
    } else {
      const seo = 78;
      const pages = 5;
      const pagesSeries = makeSeries(pages, 7, seed, 3); // slightly more jitter
      data = [
        makeItem("SEO Score", seo, "+6"),
        makeItem("Top Pages", pages, "+2", pagesSeries),
        makeItem("Conversions", "3.4%", "-1%"),
        makeItem("Revenue", "$12,847", "+15%"),
      ];
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("KPI API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
