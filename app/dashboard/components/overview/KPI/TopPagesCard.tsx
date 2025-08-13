"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import clsx from "clsx";
import TopPagesChart from "./TopPagesChart";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Health = "healthy" | "watch" | "declining";

type Props = {
  value: number;
  delta?: string;
  down?: boolean;
  series?: number[];
  height?: string;
  loading?: boolean;
  isSample?: boolean;
};

const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";

/* ---------- utils ---------- */
function smoothMA3(arr: number[]) {
  if (arr.length < 3) return arr.slice();
  const out: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i - 1] ?? arr[i];
    const b = arr[i];
    const c = arr[i + 1] ?? arr[i];
    out.push((a + b + c) / 3);
  }
  return out;
}
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function classifyHealth(series: number[]): Health {
  const sm = smoothMA3(series);
  const half = Math.floor(sm.length / 2);
  const prevMean = Math.max(1, mean(sm.slice(0, half)));
  const last = sm[sm.length - 1];
  const pctChange = ((last - prevMean) / prevMean) * 100;
  const absDrop = prevMean - last;

  let declinePct = 10;
  let minDropPages = 5;
  if (prevMean < 50) {
    declinePct = 15; minDropPages = 3;
  } else if (prevMean <= 1000) {
    declinePct = 10; minDropPages = 5;
  } else if (prevMean <= 10000) {
    declinePct = 7; minDropPages = 15;
  } else {
    declinePct = 4; minDropPages = 60;
  }

  if (pctChange <= -declinePct && absDrop >= minDropPages) return "declining";
  if (pctChange < 2) return "watch";
  return "healthy";
}

/* Disable transitions on first paint (avoid color flicker) */
function useMountedOnce() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

export default function TopPagesCard({
  value,
  delta,
  down,
  series,
  height = KPI_CARD_HEIGHTS,
  loading = false,
  isSample = false,
}: Props) {
  const mounted = useMountedOnce();

  const numericValue = Number.isFinite(value) ? value : 0;

  // --- new: robust flags
  const hasSeries =
    Array.isArray(series) &&
    series.length > 0 &&
    series.every((n) => Number.isFinite(n));

  const hasEnough = hasSeries && (series as number[]).length >= 4;

  // Only show skeleton while actively loading data that will replace existing series.
  const pending = Boolean(loading && hasSeries);

  // Use real history when present; otherwise a stable placeholder for deterministic markup.
  const safeSeries = useMemo(
    () => (hasSeries ? (series as number[]) : [numericValue, numericValue]),
    [hasSeries, series, numericValue]
  );

  // Health only when it's meaningful; otherwise derive from `down` or hide.
  const finalHealth: Health | null = useMemo(() => {
    if (hasEnough) return classifyHealth(safeSeries);
    return typeof down === "boolean" ? (down ? "declining" : "healthy") : null;
  }, [hasEnough, safeSeries, down]);

  const chipClass =
    finalHealth === "healthy"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
      : finalHealth === "watch"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/15"
      : "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15";

  const chartColorBase =
    finalHealth === "healthy"
      ? "text-emerald-400 group-hover:text-emerald-500"
      : finalHealth === "watch"
      ? "text-amber-400 group-hover:text-amber-500"
      : "text-rose-400 group-hover:text-rose-500";

  const chartColor = clsx(
    chartColorBase,
    mounted ? "transition-colors duration-200" : "transition-none"
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={clsx(
          "group relative rounded-2xl border shadow-sm overflow-hidden transition-shadow flex flex-col min-w-0",
          "p-4 sm:p-5 hover:shadow-md hover:shadow-indigo-500/10",
          "border-slate-200 bg-white dark:border-gray-700/70 dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]",
          height
        )}
        aria-live="polite"
        aria-busy={pending ? true : undefined}
        aria-label="Top Pages card"
      >
        {/* decorative blob — always present, visible in dark */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl hidden dark:block bg-indigo-500/10" />

        {/* Header row: title + badges */}
        <div className="mb-2 sm:mb-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-base md:text-lg font-medium md:whitespace-normal whitespace-nowrap text-slate-900 dark:text-gray-300">
                Top Pages
              </p>

              {isSample && !pending && (
                <span className="rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-gray-300">
                  Sample
                </span>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={14}
                    className="cursor-pointer shrink-0 text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="What does this metric mean?"
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[280px]">
                  <p className="text-xs text-slate-700 dark:text-gray-200">
                    Number of pages currently indexed. Health compares the latest value with the
                    previous-period average using smoothing and size-aware thresholds.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {!pending && delta && (
              <span
                className={clsx(
                  "ml-auto inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap",
                  down
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15"
                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
                )}
                title={down ? "Decrease" : "Increase"}
                aria-label={`Change ${down ? "down" : "up"} ${delta}`}
              >
                {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                {delta}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Number + status */}
          <div className="flex items-center gap-x-3 gap-y-2 flex-wrap justify-center mt-4 md:justify-start text-center md:text-left">
            {pending ? (
              <>
                <div className="h-9 w-24 rounded bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
                <span className="h-5 w-20 rounded-full bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
              </>
            ) : (
              <>
                <div
                  className="font-extrabold leading-none tabular-nums tracking-tight whitespace-nowrap text-[clamp(2rem,5.2vw,3.25rem)] text-slate-900 dark:text-white opacity-95 group-hover:opacity-100 transition-opacity"
                  aria-label={`Top pages count ${numericValue}`}
                >
                  {new Intl.NumberFormat("en-US").format(numericValue)}
                </div>
                {finalHealth && (
                  <span
                    className={clsx(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold",
                      chipClass
                    )}
                    title={
                      finalHealth === "healthy"
                        ? "Healthy"
                        : finalHealth === "watch"
                        ? "Watch"
                        : "Declining"
                    }
                  >
                    {finalHealth === "healthy" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : finalHealth === "watch" ? (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    {finalHealth === "healthy" ? "Healthy" : finalHealth === "watch" ? "Watch" : "Declining"}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Sparkline pinned to bottom so height is stable */}
          <div className="mt-auto w-full h-10 sm:h-12 md:h-14">
            {pending ? (
              <div className="w-full h-full rounded bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
            ) : hasSeries ? (
              <TopPagesChart
                series={safeSeries}
                strokeWidth={1.5}
                colorClass={chartColor}
                className="w-full h-full"
                ariaLabel="Top pages trend over time"
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-xs text-slate-500 dark:text-gray-400">
                Connect data to see trend
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
