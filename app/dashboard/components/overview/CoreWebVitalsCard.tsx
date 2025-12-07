"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import CoreWebVitalsChart from "./CoreWebVitalsChart";
import type { CoreVital } from "./CoreWebVitalsChart";

interface Props {
  vitals: CoreVital[] | null;
  loading: boolean;
  error: string | null;
}

/* --------------------------------------------------
   MOCK DEMO DATA (shown when real data is missing)
-------------------------------------------------- */
const MOCK_VITALS: CoreVital[] = [
  {
    name: "LCP",
    value: 2.1,
    target: 2.5,
    unit: "s",
    thresholds: [2.5, 4],
    color: "#22c55e",
  },
  {
    name: "INP",
    value: 180,
    target: 200,
    unit: "ms",
    thresholds: [200, 500],
    color: "#3b82f6",
  },
  {
    name: "CLS",
    value: 0.09,
    target: 0.1,
    unit: "",
    thresholds: [0.1, 0.25],
    color: "#f59e0b",
  },
];

export default function CoreWebVitalsCard({ vitals, loading, error }: Props) {
  const noRealVitals =
    !loading && (!!error || !vitals || vitals.length === 0);

  /** 
   * ⭐ Logic for what to show:
   * 1. If API returned real vitals → show vitals
   * 2. Else show MOCK charts (beautiful UI)
   * 3. Also show warning message below the chart
   */
  const chartData = noRealVitals ? MOCK_VITALS : vitals ?? MOCK_VITALS;

  return (
    <TooltipProvider delayDuration={120}>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm">

        {/* --------------------------------------------------
            Header
        -------------------------------------------------- */}
        <div className="mb-3 flex items-start justify-between gap-3">
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
                  LCP, INP, and CLS — measured from Chrome UX field performance
                  over the last 28 days (p75).
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* --------------------------------------------------
            Chart (always shown — using real or mock data)
        -------------------------------------------------- */}
        <div className="min-h-[230px]">
          <CoreWebVitalsChart vitals={chartData} />
        </div>

        {/* --------------------------------------------------
            Warning — Only if real vitals missing
        -------------------------------------------------- */}
        {noRealVitals && (
          <div className="mt-0 space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ⚠️ No real Core Web Vitals field data available for this URL.
            </p>

            {/* <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
              ⚠️ This website does not have enough monthly traffic for Google
              to include it in the Chrome UX public dataset (CrUX).
              Showing sample demo metrics instead.
            </p> */}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

