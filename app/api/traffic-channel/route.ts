

// app/api/traffic-channel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchTrafficByChannel, sampleTrafficByChannel, hostnameFromUrl } from "@/lib/services/ga4";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "";
  const daysParam = searchParams.get("days");
  const days = daysParam ? Number(daysParam) : 28;

  // Derive host from URL (handles http/https and strips www.)
  const host = hostnameFromUrl(url);

  // If GA4 is not configured on the server, return sample so UI doesn’t break
  if (!GA4_PROPERTY_ID || !process.env.GA4_CLIENT_EMAIL || !process.env.GA4_PRIVATE_KEY) {
    const data = sampleTrafficByChannel();
    return NextResponse.json(data, {
      headers: {
        // Fast cache, tolerate a little staleness
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }

  try {
    const data = await fetchTrafficByChannel({
      propertyId: GA4_PROPERTY_ID,
      host,
      days,
    });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=120, s-maxage=120, stale-while-revalidate=600",
      },
    });
  } catch (err: any) {
    // Don’t leak details in prod; keep UI alive with sample
    const body =
      process.env.NODE_ENV === "development"
        ? { error: err?.message || "GA4 fetch failed", fallback: sampleTrafficByChannel() }
        : sampleTrafficByChannel();

    return NextResponse.json(body, {
      status: process.env.NODE_ENV === "development" ? 502 : 200,
      headers: {
        "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=300",
      },
    });
  }
}

export const dynamic = "force-dynamic"; // always run on server
