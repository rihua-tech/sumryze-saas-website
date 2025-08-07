import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      seo_score,
      seo_delta,
      conversions,
      conversions_delta,
      revenue,
      revenue_delta,
      keyword_growth,
      core_web_vitals,
      traffic_overview,
      traffic_channels,
      ai_suggestions,
    } = body;

    const prompt = `
You're an expert SEO analyst summarizing this week's performance for a dashboard card.

Write a short 2-sentence summary using the data below:
- Use ↑ or ↓ symbols for changes.
- Use a helpful, professional tone. Avoid "we", "our", or markdown.
- Sentence 1: Cover performance KPIs (SEO Score, Conversions, Revenue, Keyword Growth, Traffic, Core Web Vitals, Channels).
- Sentence 2: Recommend 1 improvement from the AI suggestions (only if it's useful).
- Add 1 emoji at the end (📈, 🚀, 💡, etc.).

DATA:
- SEO Score: ${seo_score} (${seo_delta})
- Conversions: ${conversions} (${conversions_delta})
- Revenue: ${revenue} (${revenue_delta})
- Keyword Growth (Mon–Sun): ${keyword_growth?.data?.join(" → ")} (latest: ${keyword_growth?.latest})
- Core Web Vitals: LCP=${core_web_vitals?.lcp}, FID=${core_web_vitals?.fid}, CLS=${core_web_vitals?.cls}
- Traffic Overview: ${traffic_overview?.data?.join(" → ")}
- Traffic Channels: ${Object.entries(traffic_channels || {}).map(([k, v]) => `${k}: ${v}`).join(", ")}
- AI Suggestions: ${ai_suggestions?.map((s: any) => `${s.label} (${s.impact})`).join(", ")}
    `.trim();

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert SEO assistant summarizing marketing KPIs in dashboard-friendly language.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
    });

    const summary = chatResponse.choices[0].message.content?.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Weekly Summary Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
