import { NextResponse } from "next/server";

// Fake mock data
const weeklyData = [
  { date: "Mon", traffic: 3400 },
  { date: "Tue", traffic: 4200 },
  { date: "Wed", traffic: 5100 },
  { date: "Thu", traffic: 4800 },
  { date: "Fri", traffic: 6100 },
  { date: "Sat", traffic: 6900 },
  { date: "Sun", traffic: 7500 },
];

const monthlyData = [
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
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");

  let data;

  if (period === "weekly") {
    data = weeklyData;
  } else if (period === "monthly") {
    data = monthlyData;
  } else {
    return NextResponse.json(
      { error: "Invalid period. Use 'weekly' or 'monthly'." },
      { status: 400 }
    );
  }

  return NextResponse.json({ data });
}
