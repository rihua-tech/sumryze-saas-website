
// app/api/content-performance/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const contentPerformance = {
    wordCount: 950,
    qualityScore: 87,
  };

  return NextResponse.json(contentPerformance);
}
