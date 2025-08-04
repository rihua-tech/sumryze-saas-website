"use client";

import { Gauge, Bolt, Activity, FileText, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JSX } from "react";

type Suggestion = {
  icon: JSX.Element;
  title: string;
  seoBoost: string;
  impact: "High" | "Medium" | "Low";
};

const impactColor = {
  High: "text-red-500",
  Medium: "text-yellow-400",
  Low: "text-blue-400",
};

const suggestions: Suggestion[] = [
  {
    icon: <Gauge className="h-4 w-4 text-orange-500" />,
    title: "Fix Page Speed",
    seoBoost: "+15% SEO",
    impact: "High",
  },
  {
    icon: <Bolt className="h-4 w-4 text-yellow-400" />,
    title: "Add Meta Descriptions",
    seoBoost: "+8% SEO",
    impact: "Medium",
  },
  {
    icon: <Activity className="h-4 w-4 text-sky-400" />,
    title: "Improve Core Web Vitals",
    seoBoost: "+12% SEO",
    impact: "High",
  },
  {
    icon: <FileText className="h-4 w-4 text-blue-400" />,
    title: "Write Better Titles",
    seoBoost: "+6% SEO",
    impact: "Medium",
  },
  {
    icon: <Tags className="h-4 w-4 text-green-400" />,
    title: "Add Schema Markup",
    seoBoost: "+5% SEO",
    impact: "Low",
  },
];

export default function AISuggestions() {
  return (
     <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
        <span role="img" aria-label="brain">🧠</span> AI Suggestions
      </h3>

      <div className="space-y-3">
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-background/60 rounded-lg px-4 py-2"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <div className="text-xs text-right">
              <p className="text-green-400 font-medium">{item.seoBoost}</p>
              <p className={impactColor[item.impact]}>• {item.impact} Impact</p>
            </div>
          </div>
        ))}
      </div>

      {/* 💬 Bottom legend line */}
      <p className="text-xs text-muted-foreground mt-4">
        <span className="font-medium">+X% SEO</span> = Estimated visibility gain •{" "}
        <span className="font-medium">Impact</span> = Fix priority
      </p>
    </div>
  );
}
