import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const vitals = [
    { name: "LCP", value: 1.9, target: 2.5, unit: "s", thresholds: [2.5, 4.0], color: "#10B981" },
    { name: "FID", value: 90, target: 100, unit: "ms", thresholds: [100, 300], color: "#3B82F6" },
    { name: "CLS", value: 0.08, target: 0.1, unit: "", thresholds: [0.1, 0.25], color: "#F59E0B" },
  ];


  return NextResponse.json({ vitals });
}

