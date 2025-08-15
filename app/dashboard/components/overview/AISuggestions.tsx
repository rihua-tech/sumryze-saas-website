"use client";

import { useEffect, useState } from "react";
import { Check, Circle, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useUrlContext } from "@/app/context/UrlContext";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Types
type Suggestion = {
  label: string;
  impact: "High" | "Medium" | "Low" | null;
  seoBoost: string | null;
  display: "Needs Fix" | "Looks Good";
  color: "red" | "yellow" | "blue" | "green";
};

// Dot color map
const dotColors: Record<Suggestion["color"], string> = {
  red: "text-red-500",
  yellow: "text-yellow-400",
  blue: "text-blue-400",
  green: "text-green-500",
};

// Fixed checklist order
const defaultChecks = [
  "Fix Page Speed",
  "Add Meta Descriptions",
  "Improve Core Web Vitals",
  "Write Better Titles",
  "Add Schema Markup",
];

// 🔒 Stable fallback data
const fallbackSuggestions: Suggestion[] = [
  {
    label: "Fix Page Speed",
    impact: "High",
    seoBoost: "+15%",
    display: "Needs Fix",
    color: "red",
  },
  {
    label: "Add Meta Descriptions",
    impact: "Medium",
    seoBoost: "+8%",
    display: "Needs Fix",
    color: "yellow",
  },
  {
    label: "Add Schema Markup",
    impact: "Low",
    seoBoost: "+5%",
    display: "Needs Fix",
    color: "blue",
  },
  {
    label: "Improve Core Web Vitals",
    impact: null,
    seoBoost: "0%",
    display: "Looks Good",
    color: "green",
  },
  {
    label: "Write Better Titles",
    impact: null,
    seoBoost: "0%",
    display: "Looks Good",
    color: "green",
  },
];

export default function AiSuggestions() {
  const { url: currentUrl } = useUrlContext();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [lastChecked, setLastChecked] = useState<string | null>("August 5, 2025");
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);

    try {
      if (!currentUrl) {
        // No URL: fallback
        setSuggestions([...fallbackSuggestions].sort(sortByBoost));
        setLastChecked("Fallback: Local");
        console.log("🧠 Suggestions shown (fallback):", fallbackSuggestions);
        return;
      }

      const res = await fetch(`/api/suggestions?url=${encodeURIComponent(currentUrl)}`);
      
      const data = await res.json();

      const map = new Map<string, Suggestion>();
      (data?.suggestions || []).forEach((item: Suggestion) => map.set(item.label, item));

      const normalized: Suggestion[] = defaultChecks.map((label) => {
        const suggestion = map.get(label);
        if (suggestion) {
          return suggestion;
        }
        return {
          label,
          impact: null,
          seoBoost: null,
          display: "Looks Good" as "Looks Good",
          color: "green",
        };
      });

      setSuggestions(normalized.sort(sortByBoost));
      setLastChecked(new Date().toLocaleDateString());
    } catch (err) {
      console.error("❌ Failed to fetch suggestions. Falling back.");
      setSuggestions([...fallbackSuggestions].sort(sortByBoost));
      setLastChecked("Fallback: Error");
    } finally {
      setLoading(false);
    }
  };

  const sortByBoost = (a: Suggestion, b: Suggestion) => {
    const getBoost = (s: Suggestion) =>
      parseInt(s.seoBoost?.replace("+", "").replace("%", "") || "0");
    return getBoost(b) - getBoost(a);
  };

  useEffect(() => {
    fetchSuggestions();
  }, [currentUrl]);

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

      {/* Suggestion List */}
      <ul className="space-y-4">
        {suggestions.map((item, i) => {
          const isGood = item.display === "Looks Good";
          return (
            <li
              key={i}
              className="flex text-xs md:text-sm justify-between items-center px-2 py-3 bg-muted/40 rounded-xl"
            >
              {/* Label + dot/check */}
              <div className="flex items-center gap-3">
                {isGood ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle
                    className={clsx("w-4 h-4", dotColors[item.color])}
                    fill="currentColor"
                  />
                )}
                <span className="font-medium">{item.label}</span>
              </div>

              {/* Side text */}
              <div className="text-xs md:text-sm font-medium flex items-center gap-2 justify-end">
                {isGood ? (
                  <span className="text-green-400">Looks Good</span>
                ) : (
                  <>
                    <span className={clsx(dotColors[item.color])}>
                      {item.impact} Impact
                    </span>
                  

              <TooltipProvider>
                 <Tooltip>
                 <TooltipTrigger asChild>        
                  <span className="text-green-400 font-semibold cursor-help">
                    {item.seoBoost}
                  </span>  
                 </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[220px] text-xs font-poppins">
                   Estimated SEO gain. Actual impact may vary.
             </TooltipContent>
               </Tooltip>
            </TooltipProvider>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-4 text-[10px] text-muted-foreground flex justify-between items-center">
        <span>+X% SEO = Estimated SEO gain. Actual impact may vary. • Impact = Fix priority</span>
        <span className="italic">Last checked: {lastChecked}</span>
      </div>
    </div>
  );
}
