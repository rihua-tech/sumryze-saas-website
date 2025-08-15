"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useUrlContext } from "@/app/context/UrlContext";
import AIPredictionsChart from "./AIPredictionsChart";
import { Info, TrendingUp, Users, MousePointerClick } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Source = "GSC" | "GA4" | string;

interface PredictionData {
  chartData: number[];      // median (historical + forecast ok)
  bandLow?: number[];
  bandHigh?: number[];
  predictedVisitors: number;
  leadsGrowth: number;      // absolute or delta; sign will colorize
  ctrImprovement: number;   // %
  forecastPercent: number;  // headline % vs recent baseline
  source?: Source;
   isMock?: boolean;              // ← NEW         // "GSC" | "GA4" (optional)
}

function fmtInt(n: number) {
  return Math.round(n).toLocaleString();
}

export default function AIPredictionsCard() {
  const { url: currentUrl } = useUrlContext();

  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUrl) {
      setData({
        chartData: [0, 0],
        predictedVisitors: 0,
        leadsGrowth: 0,
        ctrImprovement: 0,
        forecastPercent: 0,
        source: "GSC",
      });
      setLoading(false);
      return;
    }

    let abort = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/ai-predictions?url=${encodeURIComponent(currentUrl)}`, {
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Predictions fetch failed: ${res.status}`);
        const json: PredictionData = await res.json();
        if (!abort) setData(json);
      } catch (err: any) {
        console.error("[ai-predictions] error:", err);
        if (!abort) {
          setError("Failed to load AI predictions.");
          // Graceful fallback so the card never looks empty in dev
          setData({
            chartData: [100, 110, 120, 130, 140, 150, 160],
            bandLow:   [ 90, 100, 110, 120, 130, 140, 150],
            bandHigh:  [110, 120, 130, 140, 150, 160, 170],
            predictedVisitors: 160,
            leadsGrowth: 320,
            ctrImprovement: 0.0,
            forecastPercent: 8,
            source: "GSC",
          });
        }
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => { abort = true; };
  }, [currentUrl]);

  // ---------- Loading / Error ----------
  if (loading) {
    return (
      <div
        className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm"
        aria-busy="true"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          <div className="h-5 w-16 rounded bg-emerald-500/10 animate-pulse" />
        </div>
        <div className="h-[140px] rounded bg-gray-200 dark:bg-white/10 animate-pulse mb-5" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-rose-300/30 bg-rose-50/50 dark:bg-rose-950/10 p-5 sm:p-6 text-sm text-rose-600 dark:text-rose-300">
        {error || "Failed to load predictions."}
      </div>
    );
  }

  // ...inside the component after loading/error checks
  const isMock = !!data.isMock;

  // ---------- View model (no Hooks — keep order stable) ----------
  const isGSC = (data.source ?? "GSC").toUpperCase() === "GSC";
  const unitLabel = isGSC ? "Organic clicks" : "Visitors";
  const primaryLabel = isGSC ? "Predicted Organic Clicks" : "Predicted Visitors";

  // dynamic trend styling from forecast sign
  const trend = Math.sign(data.forecastPercent);
  const chipClass =
    trend > 0
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : trend < 0
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300";

  const strokeClass =
    trend > 0
      ? "text-emerald-500 dark:text-emerald-400"
      : trend < 0
      ? "text-rose-500 dark:text-rose-400"
      : "text-slate-500 dark:text-slate-300";

  const medianAll = Array.isArray(data.chartData) ? data.chartData : [];
  const lowAll = Array.isArray(data.bandLow) ? data.bandLow : undefined;
  const highAll = Array.isArray(data.bandHigh) ? data.bandHigh : undefined;

  // Auto-pick a display window (keeps the sparkline legible)
  const windowSize =
    medianAll.length >= 90 ? 90 :
    medianAll.length >= 60 ? 60 :
    Math.max(0, medianAll.length);
  const from = windowSize ? -windowSize : 0;

  const median = medianAll.slice(from);
  const bandLow = lowAll?.slice(from);
  const bandHigh = highAll?.slice(from);

  const hasBand =
    !!bandLow && !!bandHigh && bandLow.length === median.length && bandHigh.length === median.length;

  const lastMedian = (median.length ? median[median.length - 1] : data.predictedVisitors) || 0;
  const lastLow = hasBand ? bandLow![bandLow!.length - 1] : undefined;
  const lastHigh = hasBand ? bandHigh![bandHigh!.length - 1] : undefined;

  const metrics = [
    {
      icon: <Users className="w-4 h-4 text-indigo-400" />,
      label: primaryLabel,
      value: hasBand
        ? `~${fmtInt(lastMedian)} (${fmtInt(lastLow ?? lastMedian)}–${fmtInt(lastHigh ?? lastMedian)})`
        : `~${fmtInt(lastMedian)}`,
      valueClass: "text-indigo-500 dark:text-indigo-400",
    },
    {
      icon: <TrendingUp className={clsx("w-4 h-4", data.leadsGrowth >= 0 ? "text-emerald-400" : "text-rose-400")} />,
      label: "Leads Growth",
      value: `${data.leadsGrowth >= 0 ? "+" : ""}${fmtInt(data.leadsGrowth)}`,
      valueClass: data.leadsGrowth >= 0 ? "text-emerald-400" : "text-rose-400",
    },
    {
      icon: <MousePointerClick className={clsx("w-4 h-4", data.ctrImprovement >= 0 ? "text-sky-400" : "text-rose-400")} />,
      label: "CTR Improvement",
      value: `${data.ctrImprovement >= 0 ? "+" : ""}${Number(data.ctrImprovement).toFixed(1)}%`,
      valueClass: data.ctrImprovement >= 0 ? "text-sky-400" : "text-rose-400",
    },
  ];

  return (
    <TooltipProvider delayDuration={120}>
      <div
        className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm"
        aria-live="polite"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              AI Predictions
            </h3>
              
              
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="About this forecast"
                >
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p className="text-xs leading-snug">
                  {isGSC
                    ? "Traffic forecast from Google Search Console clicks. Median path with an uncertainty band."
                    : "Traffic forecast from GA4. Median path with an uncertainty band."}
                </p>
              </TooltipContent>
            </Tooltip>


             {isMock && (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold
                     tracking-wide border
                     bg-slate-100 text-slate-700 border-slate-300/80
                     dark:bg-white/10 dark:text-slate-300 dark:border-white/15"
          aria-label="Example data"
        >
          Sample 
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[260px]">
        <p className="text-xs leading-snug">
          Showing example forecast. Connect your data sources to see your real predictions.
        </p>
      </TooltipContent>
    </Tooltip>
  )}
          </div>

          {/* Headline % – color reflects trend */}
          <span
            className={clsx(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
              chipClass
            )}
            title="Projected change vs. recent baseline"
          >
            {data.forecastPercent >= 0 ? "+" : ""}
            {Math.round(data.forecastPercent)}%
          </span>
        </div>

        {/* Chart */}
        <div className="mb-5 sm:mb-6">
         

          <AIPredictionsChart
           median={median ?? []}          // ← guard
           bandLow={bandLow}
           bandHigh={bandHigh}
           unitLabel={unitLabel}
           height={180}
          strokeWidth={2}
          strokeClass={strokeClass}      // your up/down color logic
          />

        </div>

        {/* Metrics */}
        <div className="space-y-2.5 text-sm">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                {m.icon}
                <span>{m.label}</span>
              </div>
              <span className={clsx("font-semibold tabular-nums", m.valueClass)}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
          {isGSC ? "Based on GSC clicks (last 180 days)." : "Based on recent GA4 traffic."} The shaded region visualizes uncertainty; actuals may vary.
        </p>
      </div>
    </TooltipProvider>
  );
}
