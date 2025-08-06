// /app/api/ai-predictions/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("url");
    
  return NextResponse.json({
    chartData: [12000, 13500, 14000, 15000, 16000, 17000, 18500],
    predictedVisitors: 18500,
    leadsGrowth: 320,
    ctrImprovement: 1.5,
    forecastPercent: 22,
  });
}
