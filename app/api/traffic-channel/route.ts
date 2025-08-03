

// app/api/traffic-Channel/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    labels: ["Organic", "Paid", "Social", "Referral", "Email"],
    series: [7000, 4500, 2200, 1550, 700],
  });
}
