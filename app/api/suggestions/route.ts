import { generateSuggestions } from "./generateSuggestions";
import { NextResponse } from "next/server";

// Dummy implementation of fetchAuditData; replace with actual logic or import if available
async function fetchAuditData(url: string) {
  // TODO: Implement real audit fetching logic here
  return {
    pageSpeed: 80,
    metaDescriptions: { missing: true },
    coreWebVitals: { score: 75 },
    titles: { weakCount: 2 },
    schema: { missing: true },
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !/^https?:\/\//.test(url)) {
    return NextResponse.json({ error: "Invalid or missing URL" }, { status: 400 });
  }

  // ✅ Hardcoded mock audit data
const useMock = true; // 🔁 switch this to false when connecting real audit

const auditData = useMock
  ? {
      pageSpeed: 60,                         // ⚠️ High impact
      metaDescriptions: { missing: true },   // ⚠️ Medium impact
      schema: { missing: true },             // ⚠️ Low impact
      coreWebVitals: { score: 90 },          // ✅ Looks Good
      titles: { weakCount: 0 },              // ✅ Looks Good
    }
  : await fetchAuditData(url);



  const suggestions = generateSuggestions(auditData);
  return NextResponse.json({ suggestions });
}
