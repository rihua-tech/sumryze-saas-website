import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status, message } = await req.json();
    if (!status || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/data/status.json");
    const data = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(data);

    json.systemStatus.status = status;
    json.systemStatus.message = message;
    json.systemStatus.lastUpdated = new Date().toISOString();

    await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

    return NextResponse.json({ message: "✅ Status updated successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
