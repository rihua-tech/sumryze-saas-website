import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Configure mail transporter (use real credentials in production)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, requestType, details } = body;

    // ✅ Validate input
    if (!fullName || !email || !requestType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ✅ Compose email content
    const emailSubject = `New CCPA Request: ${requestType}`;
    const emailBody = `
      CCPA Request Details:
      ------------------------
      Full Name: ${fullName}
      Email: ${email}
      Request Type: ${requestType}
      Additional Details: ${details || "N/A"}
    `;

    // ✅ Send email to admin (or data privacy team)
    await transporter.sendMail({
      from: `"Sumryze Privacy" <${process.env.SMTP_USER}>`,
      to: process.env.PRIVACY_EMAIL || "privacy@sumryze.com", // Admin email
      subject: emailSubject,
      text: emailBody,
    });

    // ✅ Respond to client
    return NextResponse.json({ message: "CCPA request submitted successfully." }, { status: 200 });
  } catch (error) {
    console.error("CCPA API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
