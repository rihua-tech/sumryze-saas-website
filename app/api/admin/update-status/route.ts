import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { status, message } = body;

    if (!status || !message) {
      return NextResponse.json(
        { error: "Status and message are required." },
        { status: 400 }
      );
    }

    // ✅ Path to status.json
    const filePath = path.join(process.cwd(), "public", "data", "status.json");

    // ✅ Read current data
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // ✅ Update values
    data.systemStatus.status = status;
    data.systemStatus.message = message;
    data.systemStatus.lastUpdated = new Date().toISOString();

    // ✅ Save updated file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "Status updated." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update status." }, { status: 500 });
  }
}
