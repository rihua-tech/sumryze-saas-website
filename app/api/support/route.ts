import { NextResponse } from "next/server";

interface SupportRequest {
  name: string;
  email: string;
  issue: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    // Parse incoming JSON
    const data: SupportRequest = await req.json();
    const { name, email, issue, message } = data;

    // ✅ Validate required fields
    if (!name || !email || !issue || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Log for debugging
    console.log("📩 New Support Request:", data);

    // ✅ TODO: Integrate with email or database
    // e.g., SendGrid, AWS SES, or store in MongoDB/Postgres
    // await sendSupportEmail(data);

    return NextResponse.json(
      { message: "Support request received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error processing support request:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
