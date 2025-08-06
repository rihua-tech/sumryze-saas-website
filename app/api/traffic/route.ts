import { NextResponse } from "next/server";

// ✅ Mock traffic data by period
const mockTrafficData = {
  weekly: [
    { date: "Mon", traffic: 3400 },
    { date: "Tue", traffic: 4200 },
    { date: "Wed", traffic: 5100 },
    { date: "Thu", traffic: 4800 },
    { date: "Fri", traffic: 6100 },
    { date: "Sat", traffic: 6900 },
    { date: "Sun", traffic: 7500 },
  ],
  monthly: [
    { date: "Jan", traffic: 3200 },
    { date: "Feb", traffic: 3800 },
    { date: "Mar", traffic: 4200 },
    { date: "Apr", traffic: 5000 },
    { date: "May", traffic: 5600 },
    { date: "Jun", traffic: 6100 },
    { date: "Jul", traffic: 7400 },
    { date: "Aug", traffic: 8100 },
    { date: "Sep", traffic: 8600 },
    { date: "Oct", traffic: 9200 },
    { date: "Nov", traffic: 9700 },
    { date: "Dec", traffic: 10200 },
  ],
};

// ✅ Main handler
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period");
    const targetUrl = searchParams.get("url");

    // ✅ Log inputs for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Traffic API]", { period, targetUrl });
    }

    // ❌ Validate required `url` param
    if (!targetUrl) {
      return NextResponse.json({ error: "Missing URL parameter." }, { status: 400 });
    }

    // ❌ Validate period
    if (!period || !(period in mockTrafficData)) {
      return NextResponse.json(
        { error: "Invalid period. Use 'weekly' or 'monthly'." },
        { status: 400 }
      );
    }

    // ✅ Special override for test domains (optional future feature)
    if (targetUrl.includes("test.com")) {
      const testData = mockTrafficData[period as keyof typeof mockTrafficData].map((item) => ({
        ...item,
        traffic: Math.floor(item.traffic * 0.8), // reduce 20% for test data
      }));
      return NextResponse.json({ data: testData });
    }

    // ✅ In real app: replace with DB lookup like `await fetchTraffic(targetUrl, period)`
    const data = mockTrafficData[period as keyof typeof mockTrafficData];

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("[Traffic API Error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
