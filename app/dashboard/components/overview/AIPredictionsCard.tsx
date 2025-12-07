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
  chartData: number[];
  bandLow?: number[];
  bandHigh?: number[];
  predictedVisitors: number;
  leadsGrowth: number;
  ctrImprovement: number;
  forecastPercent: number;
  source?: Source;
  isMock?: boolean;
}

// Helper formatter
function fmtInt(x: number) {
  return Math.round(x).toLocaleString();
}

/** ---- Beautiful Sample Data Generator ---- */
function buildMockPrediction(): PredictionData {
  const days = 30;
  let base = 120;

  const median = Array.from({ length: days }, (_, i) => {
    base += Math.random() * 10 - 2; // small trend
    return Math.round(base);
  });

  const bandLow = median.map((v) => Math.round(v * 0.92));
  const bandHigh = median.map((v) => Math.round(v * 1.08));

  return {
    chartData: median,
    bandLow,
    bandHigh,
    predictedVisitors: median[median.length - 1],
    leadsGrowth: Math.round(Math.random() * 400 - 50),
    ctrImprovement: Number((Math.random() * 4 - 1).toFixed(1)),
    forecastPercent: Number((Math.random() * 15 - 2).toFixed(1)),
    source: "GSC",
    isMock: true,
  };
}

export default function AIPredictionsCard() {
  const { url: currentUrl } = useUrlContext();
  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      if (!currentUrl) {
        setData(buildMockPrediction());
        setLoading(false);
        return;
      }

      try {
        const r = await fetch(`/api/ai-predictions?url=${encodeURIComponent(currentUrl)}`);
        if (!r.ok) throw new Error("Bad response");
        const json = await r.json();
        if (!cancelled) setData(json);
      } catch (err) {
        console.warn("AI predictions failed, using mock", err);
        if (!cancelled) setData(buildMockPrediction());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [currentUrl]);

  if (loading || !data) {
    return (
      <div className="rounded-2xl border bg-white dark:bg-[#0f1423] p-6 shadow-sm">
        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse mb-5 rounded" />
        <div className="h-[160px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
      </div>
    );
  }

  const isMock = data.isMock === true;
  const isGSC = (data.source ?? "GSC").toUpperCase() === "GSC";
  const unitLabel = isGSC ? "Organic clicks" : "Visitors";
  const mainLabel = isGSC ? "Predicted Organic Clicks" : "Predicted Visitors";

  const trend = Math.sign(data.forecastPercent);
  const chipClass =
    trend > 0
      ? "bg-emerald-500/10 text-emerald-500"
      : trend < 0
      ? "bg-rose-500/10 text-rose-500"
      : "bg-gray-200 text-gray-600 dark:bg-white/10";

  const colorClass =
    trend > 0 ? "text-emerald-500" : trend < 0 ? "text-rose-500" : "text-gray-500";

  const lastValue = data.chartData[data.chartData.length - 1];

  return (
    <TooltipProvider>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1423] p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
              AI Predictions
            </h3>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 rounded-full text-slate-500 dark:text-slate-400">
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[240px] text-xs">
                Forecast traffic based on historical trend with uncertainty band.
              </TooltipContent>
            </Tooltip>

            {isMock && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 border text-gray-600 dark:text-gray-300">
                Sample
              </span>
            )}
          </div>

          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${chipClass}`}>
            {data.forecastPercent >= 0 ? "+" : ""}
            {data.forecastPercent}%
          </span>
        </div>

        {/* Chart */}
        <AIPredictionsChart
          median={data.chartData}
          bandLow={data.bandLow}
          bandHigh={data.bandHigh}
          unitLabel={unitLabel}
          height={180}
          strokeWidth={2}
          strokeClass={colorClass}
        />

        {/* Metrics */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Users size={15} className="text-indigo-500" />
              {mainLabel}
            </div>
            <span className="font-semibold text-indigo-500">
              {fmtInt(lastValue)}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <TrendingUp size={15} className={data.leadsGrowth >= 0 ? "text-emerald-500" : "text-rose-500"} />
              Leads Growth
            </div>
            <span className={data.leadsGrowth >= 0 ? "text-emerald-500" : "text-rose-500"}>
              {data.leadsGrowth >= 0 ? "+" : ""}
              {fmtInt(data.leadsGrowth)}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <MousePointerClick size={15} className={data.ctrImprovement >= 0 ? "text-sky-500" : "text-rose-500"} />
              CTR Improvement
            </div>
            <span className={data.ctrImprovement >= 0 ? "text-sky-500" : "text-rose-500"}>
              {data.ctrImprovement >= 0 ? "+" : ""}
              {data.ctrImprovement}%
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-4">
          Based on last 180 days. The shaded uncertainty band indicates likely variance.
        </p>
      </div>
    </TooltipProvider>
  );
}


