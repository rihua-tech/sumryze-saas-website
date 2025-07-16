"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  id: number;
  icon: string;
  title: string;
  description: string;
  benefit: string;
  time: string;
  impact: "High" | "Medium" | "Low";
}

// ─── INLINE getImpactColor ───────────────────────────────────────────────────────────────
function getImpactColor(impact: "High" | "Medium" | "Low") {
  switch (impact) {
    case "High":
      return " border-red-100 bg-red-100 text-red-800";
    case "Medium":
      return " border-yellow-100 bg-yellow-100 text-yellow-800";
    case "Low":
      return " border-gray-100 bg-gray-100 text-gray-800";
  }
}
// ─────────────────────────────────────────────────────────────────────────────────────────

const suggestions: Suggestion[] = [
  { id: 1,
  icon: "⚡", 
  title: "Optimize Core Web Vitals",
  description: "Your LCP scores can be improved by 40% with image optimization.", 
  benefit: "+15% SEO Score", 
  time: "2–3 hours", 
  impact: "High" },

  { id: 2,
  icon: "📄", 
  title: "Fix Missing Meta Descriptions",
  description: "23 pages are missing meta descriptions. Add compelling summaries to boost visibility and click-throughs.",
  benefit: "+8% CTR", 
  time: "1 hour",
  impact: "High" },

  { id: 3,
  icon: "🎯",
  title: "Implement Schema Markup",
  description: "Add structured data to improve rich snippet visibility.",
  benefit: "+12% Visibility",
  time: "4–6 hours", 
   impact: "Medium" },

  { id: 4,
     icon: "🛠️",
      title: "Optimize Internal Linking", 
      description: "Improve site architecture with strategic internal links.",
       benefit: "+6% Authority", 
       time: "3–4 hours",
        impact: "Medium" },

  { id: 5,
     icon: "📱",
      title: "Mobile Usability Issues",
       description: "Fix 8 mobile usability issues affecting user experience.",
        benefit: "+10% Mobile Score",
         time: "2–3 hours",
          impact: "High" },

  { id: 6,
     icon: "🏷️",
      title: "Optimize Title Tags",
       description: "8 title tags exceed 60 characters or are duplicated. Shorten and refine for better SERP performance.",
        benefit: "+6% CTR", 
        time: "1–2 hours",
         impact: "Medium" },

  { id: 7,
     icon: "🔗", 
     title: "Fix Broken Links",
      description: "Found 15 broken internal links that impact UX and crawlability. Replace or remove outdated URLs.", 
      benefit: "Improved Crawlability",
       time: "2 hours",
        impact: "Medium" },

  { id: 8,
     icon: "🖼️",
      title: "Improve Image Alt Text", 
      description: "23 images are missing alt tags. Add descriptive text for accessibility and image SEO.", 
      benefit: "+5% Accessibility Score", 
      time: "1 hour", 
      impact: "Low" },

  { id: 9,
     icon: "📚",
      title: "Create Topic Clusters",
       description: "Group related content into strategic clusters around core topics to boost authority and SEO depth.",
        benefit: "+Topical Authority", 
        time: "3–6 hours", 
        impact: "High" },

  { id: 10, 
    icon: "⭐", 
    title: "Optimize for Featured Snippets",
     description: "Format content to directly answer queries and increase chances of ranking in Position 0 (featured snippets).",
      benefit: "+SERP Visibility",
       time: "2–4 hours", 
       impact: "Medium" },
];

export default function AISuggestions() {
  return (
    <section className="col-span-4 lg:col-span-1 bg-white rounded-lg shadow p-6 space-y-6">
      <header>
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">💡</span>AI Suggestions
        </h2>
        <p className="text-sm text-gray-500">
          Prioritized recommendations to improve your SEO
        </p>
      </header>

      <div className="space-y-4">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow"
          >
            {/* Header */}
            <div className="space-y-2">
              {/* Row 1: badge+icon → impact pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                    {s.id}
                  </div>
                  <span className="text-lg">{s.icon}</span>
                </div>
                
                <Badge variant="outline" className={`text-xs ${getImpactColor(s.impact)}`}>
                            {s.impact} Impact
                          </Badge>
              </div>
              {/* Row 2: title */}
              <h3 className="text-md font-medium">{s.title}</h3>
            </div>

            {/* Description */}
            <p className="mt-2 text-xs text-gray-600">{s.description}</p>

            {/* Metrics */}
            <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <span className="mr-1">📈</span>
                {s.benefit}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🕒</span>
                {s.time}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-2">
              <Button size="sm">Apply Fix</Button>
              <button className="text-sm font-medium text-indigo-600 hover:underline">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
