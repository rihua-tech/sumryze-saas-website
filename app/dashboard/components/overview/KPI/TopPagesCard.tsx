"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import clsx from "clsx";
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
  if (!sm.length) return "healthy";
  const half = Math.floor(sm.length / 2);
  const prevMean = Math.max(1, mean(sm.slice(0, half)));
  const last = sm[sm.length - 1];
  const pctChange = ((last - prevMean) / prevMean) * 100;
  const absDrop = prevMean - last;

  let declinePct = 10;
  let minDropPages = 5;
  if (prevMean < 50) { declinePct = 15; minDropPages = 3; }
  else if (prevMean <= 1000) { declinePct = 10; minDropPages = 5; }
  else if (prevMean <= 10000) { declinePct = 7; minDropPages = 15; }
  else { declinePct = 4; minDropPages = 60; }

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

  const numericValue = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  const formatted = useMemo(() => new Intl.NumberFormat("en-US").format(numericValue), [numericValue]);

  const hasSeries =
    Array.isArray(series) && series.length > 0 && series.every((n) => Number.isFinite(n));
  const hasEnough = hasSeries && (series as number[]).length >= 4;

  const pending = Boolean(loading && !isSample);

  const finalHealth: Health | null = useMemo(() => {
    if (hasEnough) return classifyHealth(series as number[]);
    if (typeof down === "boolean") return down ? "declining" : "healthy";
    return null;
  }, [hasEnough, series, down]);

  const chipClass =
    finalHealth === "healthy"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
      : finalHealth === "watch"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/15"
      : "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15";

  const cardSurface =
    "border-slate-200 bg-white dark:border-gray-700/70 dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]";

  const deltaBadge = clsx(
    "inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap",
    down
      ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15"
      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
  );

  /* ---------- NEW: digit-aware width & font scaling ---------- */
  const rawDigits = String(numericValue).length;
  const digits = Math.min(6, Math.max(2, rawDigits));      // design up to 6 digits
  const minCh = digits + 0.3;                               // reserve width (prevents jitter)

  
  // put near top of file
const NUMBER_SIZES = {
  sm: "text-[clamp(1.1rem,3.0vw,1.9rem)]",
  md: "text-[clamp(1.25rem,3.2vw,2.25rem)]",
  lg: "text-[clamp(1.75rem,4.2vw,3.0rem)]",
} as const;

// pick one:
const sizeClass = NUMBER_SIZES.lg; // was lg
                  
  return (
    <TooltipProvider delayDuration={120}>
      <div
        className={clsx(
          "group relative rounded-2xl border shadow-sm overflow-hidden transition-shadow flex flex-col min-w-0",
          "p-4 sm:p-5",
          cardSurface,
          height
        )}
        aria-live="polite"
        aria-busy={pending || undefined}
        aria-label="Top Pages card"
      >
        {/* decorative blob (dark only) */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl hidden dark:block bg-indigo-500/10" />

        {/* Header row */}
        <div className="mb-1.5 sm:mb-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-base md:text-lg font-medium text-slate-900 dark:text-gray-200">
                Top Pages
              </p>

              {isSample && !pending && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-gray-300"
                      aria-label="Sample data"
                    >
                      Sample
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[280px]">
                    <p className="text-xs leading-snug">
                      Showing sample data. Paste a URL to see your real results.
                    </p>
                  </TooltipContent>
                </Tooltip>
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
                    Count of pages currently indexed. Health compares the latest value with a
                    smoothed previous-period average using size-aware thresholds.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {!!delta && !pending && (
              <span
                className={clsx("ml-auto", deltaBadge)}
                title={down ? "Decrease" : "Increase"}
                aria-label={`Change ${down ? "down" : "up"} ${delta}`}
              >
                {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                {delta}
              </span>
            )}
          </div>
        </div>

        {/* Body — ONE centered row: big number + status pill */}
        <div className="flex-1 flex items-center justify-center">
          {pending ? (
            <div className="flex items-center gap-1">
              <div className="h-10 w-24 rounded bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
              <span className="h-6 w-20 rounded-full bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
            </div>
          ) : (
            <div className="flex items-center gap-0">
              <div
                className={clsx(
                  "font-extrabold leading-none tabular-nums tracking-tight whitespace-nowrap",
                  sizeClass,
                  "text-slate-900 dark:text-white",
                  mounted ? "opacity-95 group-hover:opacity-100 transition-opacity" : "opacity-95"
                )}
                style={{ minWidth: `${minCh}ch` }}   // reserve width for current digit count
                aria-label={`Top pages count ${numericValue}`}
              >
                {formatted}
              </div>

              {finalHealth && (
                <span
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold leading-none",
                    chipClass
                  )}
                  title={
                    finalHealth === "healthy"
                      ? "Healthy"
                      : finalHealth === "watch"
                      ? "Watch"
                      : "Declining"
                  }
                  role="status"
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
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
