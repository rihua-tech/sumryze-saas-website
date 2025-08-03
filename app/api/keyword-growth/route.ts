import { NextResponse } from "next/server";

const weekly = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 130 },
  { day: "Wed", count: 160 },
  { day: "Thu", count: 155 },
  { day: "Fri", count: 180 },
  { day: "Sat", count: 200 },
  { day: "Sun", count: 240 },
];

const monthly = [
  { day: "Jan", count: 400 },
  { day: "Feb", count: 450 },
  { day: "Mar", count: 470 },
  { day: "Apr", count: 500 },
  { day: "May", count: 550 },
  { day: "Jun", count: 590 },
  { day: "Jul", count: 650 },
  { day: "Aug", count: 700 },
  { day: "Sep", count: 720 },
  { day: "Oct", count: 800 },
  { day: "Nov", count: 880 },
  { day: "Dec", count: 900 },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");

  let data;
  if (period === "weekly") {
    data = weekly;
  } else if (period === "monthly") {
    data = monthly;
  } else {
    return NextResponse.json(
      { error: "Invalid period. Use 'weekly' or 'monthly'." },
      { status: 400 }
    );
  }

  return NextResponse.json({ data });
}
