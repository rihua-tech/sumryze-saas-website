"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import SEOScoreChart from "./SEOScoreChart";

type Status = "good" | "warn" | "bad";

/* 1) Breakpoints: lg starts at 1280 (iPad stays md) */
function useBreakpoint() {
  const [bp, setBp] = useState<"xs" | "sm" | "md" | "lg">("md");
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w >= 1280 ? "lg" : w >= 768 ? "md" : w >= 640 ? "sm" : "xs");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
}

/* Shared with TopPages */
const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";

export default function SEOScoreCard({
  value,
  delta,
  down,
  note = "vs last week",
  thresholds = { good: 80, warn: 50 },
  height = KPI_CARD_HEIGHTS,
  footerMeta,
}: {
  value: number;
  delta?: string;
  down?: boolean;
  note?: string;
  thresholds?: { good: number; warn: number };
  height?: string;
  footerMeta?: { label: string; value: string }[];
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const bp = useBreakpoint();

  const status: Status = value >= thresholds.good ? "good" : value >= thresholds.warn ? "warn" : "bad";

  /* 2) Slightly smaller ring on md (iPad) */
  const ringSize   = bp === "lg" ? 84 : bp === "md" ? 76 : 72;
  const ringStroke = bp === "lg" ? 10 : 8;

  const ringBar =
    status === "good"
      ? "stroke-emerald-400 group-hover:stroke-emerald-500 transition-colors duration-200"
      : status === "warn"
      ? "stroke-amber-400 group-hover:stroke-amber-500 transition-colors duration-200"
      : "stroke-rose-400 group-hover:stroke-rose-500 transition-colors duration-200";

  const track = isDark ? "stroke-white/10" : "stroke-slate-200";
  const cardClass = isDark
    ? "border-gray-700/70 bg-gradient-to-br from-[#0e1322] via-[#101528] to-[#0b0f1c]"
    : "border-slate-200 bg-white";
  const titleClass = isDark ? "text-gray-300" : "text-slate-900";
  const muted = isDark ? "text-gray-400" : "text-slate-600";

  const deltaBadge = isDark
    ? (down ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/15" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15")
    : (down ? "bg-rose-50 text-rose-600 hover:bg-rose-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100");

  const statusChip = (s: Status) =>
    isDark
      ? s === "good"
        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
        : s === "warn"
        ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/15"
        : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/15"
      : s === "good"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      : s === "warn"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
      : "bg-rose-50 text-rose-700 hover:bg-rose-100";

  const StatusIcon = status === "good" ? CheckCircle2 : status === "warn" ? AlertTriangle : XCircle;
  const statusLabel = status === "good" ? "Good" : status === "warn" ? "Warn" : "Bad";

  return (
    <div
      className={clsx(
        "group relative rounded-2xl border shadow-sm overflow-hidden transition-colors flex flex-col min-w-0",
        "p-4 sm:p-5",
        cardClass,
        height
      )}
      aria-live="polite"
      aria-label="SEO Score card"
    >
      {isDark && <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />}

      {/* Header */}
      {/* Header – same pattern as TopPages: relative + absolute delta */}
<div className="relative mb-2 sm:mb-3 min-w-0">
  {/* Leave room on the right for the absolute delta chip */}
  <div className="flex items-center gap-2 min-w-0 pr-12 md:pr-14">
    <TrendingUp size={16} className={isDark ? "text-indigo-400" : "text-indigo-600"} />
    {/* Don’t wrap on xs; allow normal on md so it won’t force two lines */}
       <p className={clsx("text-base font-medium md:whitespace-normal whitespace-nowrap", titleClass)}>
      SEO Score
    </p>
  </div>

  {delta && (
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


      {/* Body — wraps if needed; ring never shrinks */}
        <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-3 gap-y-2
                justify-center md:justify-start text-center md:text-left">

        <div className="shrink-0">
          <SEOScoreChart
            value={value}
            max={100}
            size={ringSize}
            stroke={ringStroke}
            barClass={ringBar}
            trackClass={track}
            labelClass="text-slate-900 dark:text-white"
          />
        </div>

        <span
          className={clsx(
            "inline-flex items-center gap-1 rounded-full",
            "px-2 py-0.5 text-[11px] sm:text-xs md:px-1.5",
            "font-semibold whitespace-nowrap leading-none",
            statusChip(status)
          )}
          title={`Status: ${statusLabel}`}
        >
          <StatusIcon className="h-3.5 w-3.5" /> {statusLabel}
        </span>
      </div>

      {/* Footer */}
     
        <div className={clsx("mt-auto pt-3 sm:pt-4 flex items-center justify-center sm:justify-between text-xs", muted, isDark ? "border-t border-white/10" : "border-t border-slate-200/70")}>

        <span className="truncate text-center sm:text-left">{note}</span>

        {footerMeta?.length ? (
          <div className="hidden sm:flex items-center gap-4 min-w-0">
            {footerMeta.map((m, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="opacity-70">{m.label}:</span>
                <span className={isDark ? "text-gray-300" : "text-slate-800"}>{m.value}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
