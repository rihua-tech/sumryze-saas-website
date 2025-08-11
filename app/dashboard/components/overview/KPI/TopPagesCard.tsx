"use client";

import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Info,
} from "lucide-react";
import clsx from "clsx";
import TopPagesChart from "./TopPagesChart";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

type Health = "healthy" | "watch" | "declining";

/* ---------- Status chip ---------- */
function StatusChip({ health, isDark }: { health: Health; isDark: boolean }) {
  const map = {
    healthy: {
      cls: isDark
        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
      Icon: CheckCircle2,
      label: "Healthy",
    },
    watch: {
      cls: isDark
        ? "bg-amber-500/10  text-amber-400  hover:bg-amber-500/15"
        : "bg-amber-50   text-amber-700   hover:bg-amber-100",
      Icon: AlertTriangle,
      label: "Watch",
    },
    declining: {
      cls: isDark
        ? "bg-rose-500/10   text-rose-400   hover:bg-rose-500/15"
        : "bg-rose-50    text-rose-700    hover:bg-rose-100",
      Icon: XCircle,
      label: "Declining",
    },
  } as const;
  const { cls, Icon, label } = map[health];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
        cls
      )}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </span>
  );
}

/* ---------- helpers ---------- */
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
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;

function classifyHealth(series?: number[]): { health: Health } {
  if (!series || series.length < 4) return { health: "watch" };
  const sm = smoothMA3(series);
  const half = Math.floor(sm.length / 2);
  const prevMean = Math.max(1, mean(sm.slice(0, half)));
  const last = sm[sm.length - 1];
  const pctChange = ((last - prevMean) / prevMean) * 100;
  const absDrop = prevMean - last;

  let declinePct = 10,
    minDropPages = 5;
  if (prevMean < 50) {
    declinePct = 15;
    minDropPages = 3;
  } else if (prevMean <= 1000) {
    declinePct = 10;
    minDropPages = 5;
  } else if (prevMean <= 10000) {
    declinePct = 7;
    minDropPages = 15;
  } else {
    declinePct = 4;
    minDropPages = 60;
  }

  const smallGainBand = 2;
  if (pctChange <= -declinePct && absDrop >= minDropPages)
    return { health: "declining" };
  if (pctChange < smallGainBand) return { health: "watch" };
  return { health: "healthy" };
}

/** SAME heights as SEO card */
const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";

/* Disable transitions on first paint (prevents color flicker) */
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
  loading = false, // ← NEW
}: {
  value: number;
  delta?: string;
  down?: boolean;
  series?: number[];
  height?: string;
  loading?: boolean; // ← NEW
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const mounted = useMountedOnce(); // ← NEW

  // ---- Safe values / series
  const numericValue = Number.isFinite(value) ? value : 0;

  const safeSeries = useMemo(() => {
    if (Array.isArray(series) && series.length > 1 && series.every(n => Number.isFinite(n))) {
      return series;
    }
    return [numericValue, numericValue];
  }, [series, numericValue]);

  // ---- Health & color (memoized)
  const finalHealth: Health = useMemo(() => {
    const hasEnough = Array.isArray(series) && series.length >= 4;
    const computed = classifyHealth(hasEnough ? series : safeSeries);
    if (hasEnough) return computed.health;
    // fall back to "down" when no history
    return typeof down === "boolean" ? (down ? "declining" : "healthy") : "watch";
  }, [series, safeSeries, down]);

  const chartColorBase =
    finalHealth === "healthy"
      ? "text-emerald-400 group-hover:text-emerald-500"
      : finalHealth === "watch"
      ? "text-amber-400 group-hover:text-amber-500"
      : "text-rose-400 group-hover:text-rose-500";

  const chartColor = clsx(
    chartColorBase,
    mounted ? "transition-colors duration-200" : "transition-none" // ← NEW
  );

  const numberTone = isDark ? "text-white" : "text-slate-900";

  const cardClass = isDark
    ? "border-gray-700/70 bg-gradient-to-br from-[#0e1322] via-[#101528] to-[#0b0f1c]"
    : "border-slate-200 bg-white";
  const titleClass = isDark ? "text-gray-300" : "text-slate-900";

  const deltaBadge = isDark
    ? down
      ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/15"
      : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
    : down
    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100";

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={clsx(
          "group relative rounded-2xl border shadow-sm overflow-hidden transition-shadow flex flex-col min-w-0",
          "p-4 sm:p-5 hover:shadow-md hover:shadow-indigo-500/10",
          cardClass,
          height
        )}
        aria-live="polite"
        aria-label="Top Pages card"
      >
        {isDark && (
          <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />
        )}

        {/* Header */}
        <div className="relative mb-2 sm:mb-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0 pr-12 md:pr-14">
            <FileText
              size={16}
              className={isDark ? "text-indigo-400" : "text-indigo-600"}
            />
            <p
              className={clsx(
                "text-base font-medium md:whitespace-normal whitespace-nowrap",
                titleClass
              )}
            >
              Top Pages
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  size={14}
                  className={clsx(
                    "cursor-pointer shrink-0",
                    isDark
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-slate-500 hover:text-slate-700"
                  )}
                  aria-label="What does this metric mean?"
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p
                  className={clsx(
                    "text-xs",
                    isDark ? "text-gray-200" : "text-slate-700"
                  )}
                >
                  Number of pages currently indexed. Health compares the latest
                  value to the previous-period average with smoothing and
                  size-aware thresholds.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {!loading && delta && (
            <span
              className={clsx(
                "absolute right-0 top-0 inline-flex items-center gap-1 rounded-full",
                "px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap",
                deltaBadge
              )}
              title={down ? "Decrease" : "Increase"}
              aria-label={`Change ${down ? "down" : "up"} ${delta}`}
            >
              {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
              {delta}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Number + status */}
          <div className="flex items-center gap-x-3 gap-y-2 flex-wrap justify-center mt-4 md:justify-start text-center md:text-left">
            {loading ? (
              <>
                <div className="h-9 w-24 rounded bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
                <span className="h-5 w-20 rounded-full bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
              </>
            ) : (
              <>
                <div
                  className={clsx(
                    "font-extrabold leading-none tabular-nums tracking-tight whitespace-nowrap",
                    "text-[clamp(2rem,5.2vw,3.25rem)]",
                    numberTone,
                    "opacity-95 group-hover:opacity-100 transition-opacity"
                  )}
                  aria-label={`Top pages count ${numericValue}`}
                >
                  {numericValue.toLocaleString()}
                </div>
                <StatusChip health={finalHealth} isDark={isDark} />
              </>
            )}
          </div>

          {/* Sparkline pinned to bottom so height is stable */}
          <div className="mt-auto w-full h-10 sm:h-12 md:h-14">
            {loading ? (
              <div className="w-full h-full rounded bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
            ) : (
              <TopPagesChart
                series={safeSeries}
                strokeWidth={1.5}
                colorClass={chartColor}
                className="w-full h-full"
                ariaLabel="Top pages trend over time"
              />
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
