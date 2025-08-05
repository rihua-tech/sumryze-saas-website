import { generateSuggestions } from "./generateSuggestions";
import { NextResponse } from "next/server";

// Types
type AuditData = {
  pageSpeed: number;
  metaDescriptions: { missing: number };
  coreWebVitals: { score: number };
  titles: { weakCount: number };
  schema: { missing: boolean };
};

// Simulated audit function
async function fetchAuditData(url: string): Promise<AuditData> {
  return {
    pageSpeed: 68,
    metaDescriptions: { missing: 3 },
    coreWebVitals: { score: 72 },
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

  const auditData = await fetchAuditData(url);
  const suggestions = generateSuggestions(auditData);

  return NextResponse.json({ suggestions });
}
