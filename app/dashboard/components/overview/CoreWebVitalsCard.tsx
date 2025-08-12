"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import CoreWebVitalsChart from "./CoreWebVitalsChart";
import { useUrlContext } from "@/app/context/UrlContext";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;          // raw metric (s or ms for LCP/INP, unitless for CLS)
  target: number;         // “good” threshold goal
  unit: string;           // "s" | "ms" | ""
  thresholds?: number[];  // [good, needs-improvement] cut points (low is better)
  color?: string;         // optional accent color
};

type ApiResponse = {
  vitals: CoreVital[];
  isMock?: boolean;
};

export default function CoreWebVitalsCard() {
  const { url: currentUrl } = useUrlContext();
  const [vitals, setVitals] = useState<CoreVital[]>([]);
  const [isMock, setIsMock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const qs = currentUrl ? `?url=${encodeURIComponent(currentUrl)}` : "";
        const res = await fetch(`/api/web-vitals${qs}`, {
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });

        const json: ApiResponse = await res.json();

        if (!res.ok || !Array.isArray(json?.vitals)) {
          throw new Error((json as any)?.error || "Invalid response");
        }

        setVitals(json.vitals);
        setIsMock(Boolean(json.isMock));
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error("[CoreWebVitals] fetch failed:", e);
          setError(e.message || "Failed to load Core Web Vitals.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [currentUrl]);

  return (
    <TooltipProvider delayDuration={120}>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Core Web Vitals
            </h3>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="About Core Web Vitals"
                >
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p className="text-xs leading-snug">
                  LCP (largest paint), <b>INP</b> (interaction latency), and CLS (layout shift).
                  Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Lower is better.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Sample badge if the API returned mock data */}
          {isMock && (
            <span
              className="rounded-full bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 px-2 py-0.5 text-[11px] font-semibold"
              title="Using example data until a live source is connected"
            >
              Sample
            </span>
          )}
        </div>

        {/* Body */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[160px] rounded-xl bg-slate-100 dark:bg-white/10 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border border-rose-300/30 bg-rose-50/60 dark:bg-rose-950/10 p-3 text-sm text-rose-600 dark:text-rose-300">
            {error}
          </div>
        ) : (
          <CoreWebVitalsChart vitals={vitals} />
        )}
      </div>
    </TooltipProvider>
  );
}
