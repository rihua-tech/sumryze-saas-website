"use client";

import { useEffect, useState } from "react";
import { Check, Circle, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useUrlContext } from "@/app/context/UrlContext";

// Types
type RawSuggestion = {
  label: string;
  seoBoost: string;
  impact: "High" | "Medium" | "Low";
};

type Suggestion = {
  label: string;
  seoGain: number;
  impact: "High" | "Medium" | "Low";
};

// Color mapping
const impactColors: Record<Suggestion["impact"], string> = {
  High: "text-red-500",
  Medium: "text-yellow-400",
  Low: "text-blue-400",
};

// Default 5 checklist
const defaultChecks = [
  "Fix Page Speed",
  "Add Meta Descriptions",
  "Improve Core Web Vitals",
  "Write Better Titles",
  "Add Schema Markup",
];

export default function AiSuggestions() {
  const { url } = useUrlContext();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [lastChecked, setLastChecked] = useState<string | null>("August 4, 2025");
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);

    try {
      if (!url) {
        // If no URL, show full fallback
        setSuggestions([
          { label: "Fix Page Speed", seoGain: 15, impact: "High" },
          { label: "Add Meta Descriptions", seoGain: 0, impact: "Low" },
          { label: "Improve Core Web Vitals", seoGain: 12, impact: "High" },
          { label: "Write Better Titles", seoGain: 0, impact: "Low" },
          { label: "Add Schema Markup", seoGain: 0, impact: "Low" },
        ]);
        setLastChecked("August 4, 2025");
        return;
      }

      const res = await fetch(`/api/suggestions?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      const suggestionMap = new Map<string, Suggestion>();

      (data.suggestions || []).forEach((item: RawSuggestion) => {
        suggestionMap.set(item.label, {
          label: item.label,
          seoGain: parseInt(item.seoBoost.replace("+", "").replace("%", "")) || 0,
          impact: item.impact,
        });
      });

      const normalized = defaultChecks.map((label) => {
        const suggestion = suggestionMap.get(label);
        return suggestion || { label, seoGain: 0, impact: "Low"as "Low" };
      });

      setSuggestions(normalized);
      setLastChecked(new Date().toLocaleDateString());
    } catch (err) {
      console.error("❌ Failed to load suggestions. Using fallback.");
      setSuggestions([
        { label: "Fix Page Speed", seoGain: 15, impact: "High" },
        { label: "Add Meta Descriptions", seoGain: 8, impact: "Medium" },
        { label: "Improve Core Web Vitals", seoGain: 12, impact: "High" },
        { label: "Write Better Titles", seoGain: 6, impact: "Medium" },
        { label: "Add Schema Markup", seoGain: 5, impact: "Low" },
      ]);
      setLastChecked("Fallback: Local");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [url]);

  return (
  
       <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-1 text-foreground">
          🧠 AI Suggestions
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary"
          onClick={fetchSuggestions}
        >
          <RefreshCw className={clsx("w-4 h-4", loading && "animate-spin")} />
        </Button>
      </div>

      {/* Always show 5 checklist */}
      <ul className="space-y-3">
        {suggestions.map((item, i) => {
          const isOptimized = item.seoGain === 0;

          return (
            <li
              key={i}
              className="flex text-xs md:text-sm justify-between items-center px-2 py-3 bg-muted/40 rounded-xl"
              
            >
              <div className="flex items-center gap-3">
                {isOptimized ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle
                    className={clsx("w-4 h-4", impactColors[item.impact])}
                    fill="currentColor"
                  />
                )}
                <span className="font-medium">{item.label}</span>
              </div>

              <div className="text-xs md:text-sm font-medium flex items-center gap-2 justify-end">
             {isOptimized ? (
               <span className="text-green-400">Looks good</span>
                ) : (
                <>
                 <span className={clsx(impactColors[item.impact])}>
                {item.impact} Impact
                </span>
                <span className="text-green-400 font-semibold">
                +{item.seoGain}% SEO
                </span>
                </>
               )}
            </div>

            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
        <span>+X% SEO = Estimated visibility gain • Impact = Fix priority</span>
        <span className="italic">Last checked: {lastChecked}</span>
      </div>
    </div>
  );
}
