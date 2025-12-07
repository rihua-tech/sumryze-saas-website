// app/api/ai-summary/route.ts (GET version for local testing)

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET() {
  try {
    // ✅ Mock data shaped like POST body
    const mockData = {
      seoScore: { current: 85, previous: 79 },
      conversions: { current: 4.8, delta: "+1.2%" },
      revenue: { current: 22450, delta: "+9%" },
      keywordGrowth: { count: 230, trend: "steady" },
      coreWebVitals: { lcp: "1.9s", fid: "90ms", cls: "0.08" },
      trafficOverview: {
        trend: "+6%",
        data: [3800, 4300, 5000, 4900, 5800, 6400, 7500],
      },
      trafficChannels: {
        Organic: "42.7%",
        Paid: "28.4%",
        Social: "15.6%",
        Referral: "9.7%",
        Email: "3.6%",
      },
      aiSuggestions: [
        { label: "Fix Page Speed", impact: "High" },
        { label: "Add Meta Descriptions", impact: "Medium" },
        { label: "Add Schema Markup", impact: "Low" },
      ],
    };

    const {
      seoScore,
      conversions,
      revenue,
      keywordGrowth,
      coreWebVitals,
      trafficOverview,
      trafficChannels,
      aiSuggestions,
    } = mockData;

   const prompt = `




You are an expert **SEO analyst**. Use the metrics below to craft a clear, concise 1-paragraph summary for a dashboard card.

📝 Write **ONE paragraph** (no more than 55 words):

1. **Win** – highlight the most significant improvement (largest positive delta).
2. **Need** – call out one clear issue or weakness (include metric if possible).
3. **Next** – suggest one imperative action to improve performance.

Formatting rules:
- Use +X% / +$X for gains, −X% / −$X for drops.
- Use plain numbers for totals: 7500, $22,450 (no +/− for these).
- Do not use bold, arrows, or words like “we”, “our”, or “suggests”.
- Use **only one emoji**, at the end (🚀 ⚠️ 📈 💡).
- No styling – color is added in code after generation.
- Be direct and professional. Prioritize clarity and brevity.
- Avoid filler phrases like “indicating”, “potentially”, or “might”.
- Use strong, active verbs in the “Next” action.

Respond with *summary text only*. Do not include labels or headings.


📊 Input data:
- SEO Score: ${seoScore.current} (previously ${seoScore.previous})
- Conversions: ${conversions.current}% (${conversions.delta})
- Revenue: $${revenue.current.toLocaleString()} (${revenue.delta})
- Keyword Growth: ${keywordGrowth.count} (${keywordGrowth.trend})
- Core Web Vitals: LCP=${coreWebVitals.lcp}, FID=${coreWebVitals.fid}, CLS=${coreWebVitals.cls}
- Traffic Trend: ${trafficOverview.trend}, Data: ${trafficOverview.data.join(" → ")}
- Traffic Channels: ${Object.entries(trafficChannels).map(([k, v]) => `${k}: ${v}`).join(", ")}
- Suggestions: ${aiSuggestions.map(s => `${s.label} (${s.impact})`).join(", ")}


`;

   // ✅ Skip OpenAI in dev or mock mode
   //if (process.env.USE_OPENAI !== "false") {
   //return NextResponse.json(mockData);
  // }



    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert SEO assistant summarizing weekly analytics into one short, helpful dashboard summary.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 150,
    });

    const summary = chatResponse.choices[0].message.content?.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ AI Summary Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
