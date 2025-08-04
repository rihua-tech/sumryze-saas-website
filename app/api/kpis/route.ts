// app/api/kpis/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulate DB/API response
  const data = [
    { title: "SEO Score", value: 78, delta: "+6" },
    { title: "Top Pages", value: 5, delta: "+2" },
    { title: "Conversions", value: "3.4%", delta: "-1%", down: true },
    { title: "Revenue", value: "$12,847", delta: "+15%" },
  ];

  return NextResponse.json(data);
}
