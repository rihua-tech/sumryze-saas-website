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
You are an expert SEO analyst. Based on the metrics provided, write a clear and concise AI summary for a dashboard card. Highlight **1 positive trend**, **1 negative insight**, and **1 helpful next step**.

Use simple language and visual indicators like **+6**, **–12%**, **$22,450**, avoiding arrows (↑/↓). Do not use “we” or “our”.

Input data:
- SEO Score: ${seoScore.current} (previously ${seoScore.previous})
- Conversions: ${conversions.current}% (${conversions.delta})
- Revenue: ${revenue.current.toLocaleString()} (${revenue.delta})
- Keyword Growth: ${keywordGrowth.count} (${keywordGrowth.trend})
- Core Web Vitals: LCP=${coreWebVitals.lcp}, FID=${coreWebVitals.fid}, CLS=${coreWebVitals.cls}
- Traffic: ${trafficOverview.trend}, Data: ${trafficOverview.data.join(" → ")}
- Traffic Channels: ${Object.entries(trafficChannels).map(([k, v]) => `${k}: ${v}`).join(", ")}
- Suggestions: ${aiSuggestions.map(s => `${s.label} (${s.impact})`).join(", ")}

Summary should:
- Start with the key win
- Then show 1 area needing attention (decline or issue)
- End with a next step or helpful suggestion
- Be 1–2 short sentences (about 40–60 words)
- Maintain a clean and professional tone
- Add 1 emoji at the end (e.g., 📉, 📈, 🚀, 💡)
`;


    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert SEO assistant summarizing weekly analytics.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const summary = chatResponse.choices[0].message.content?.trim();
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ AI Summary Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
