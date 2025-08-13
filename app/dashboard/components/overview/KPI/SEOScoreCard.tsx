"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import clsx from "clsx";
import SEOScoreChart from "./SEOScoreChart";

type Status = "good" | "warn" | "bad";

type Props = {
  value: number;
  delta?: string;
  down?: boolean;
  note?: string;
  thresholds?: { good: number; warn: number };
  height?: string;
  footerMeta?: { label: string; value: string }[];
  loading?: boolean;
  isSample?: boolean;
};

const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";

/* Disable transitions on first paint to avoid flicker */
function useMountedOnce() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

export default function SEOScoreCard({
  value,
  delta,
  down,
  note = "vs last week",
  thresholds = { good: 80, warn: 50 },
  height = KPI_CARD_HEIGHTS,
  footerMeta,
  loading = false,
  isSample = false,
}: Props) {
  const mounted = useMountedOnce();

  // keep numeric inputs deterministic for SSR/CSR
  const score = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

  const status: Status =
    score >= thresholds.good ? "good" : score >= thresholds.warn ? "warn" : "bad";

  // fixed numeric size to avoid SSR/client mismatch
  const ringSize = 76;
  const ringStroke = 8;

  const ringColor =
    status === "good"
      ? "stroke-emerald-400 group-hover:stroke-emerald-500"
      : status === "warn"
      ? "stroke-amber-400 group-hover:stroke-amber-500"
      : "stroke-rose-400 group-hover:stroke-rose-500";

  const ringBar = clsx(ringColor, mounted ? "transition-colors duration-200" : "transition-none");

  // theme-safe classes (no JS branching)
  const track = "stroke-slate-200 dark:stroke-white/10";

  const cardSurface =
    "border-slate-200 bg-white dark:border-gray-700/70 " +
    "dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]";

  const deltaBadgeBase =
    "inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap";
  const deltaBadge = clsx(
    deltaBadgeBase,
    down
      ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15"
      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
  );

  const statusChip = (s: Status) =>
    s === "good"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
      : s === "warn"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/15"
      : "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15";

  const StatusIcon = status === "good" ? CheckCircle2 : status === "warn" ? AlertTriangle : XCircle;
  const statusLabel = status === "good" ? "Good" : status === "warn" ? "Warn" : "Bad";

  return (
    <div
      className={clsx(
        "group relative rounded-2xl border shadow-sm overflow-hidden transition-colors flex flex-col min-w-0",
        "p-4 sm:p-5",
        cardSurface,
        height
      )}
      aria-live="polite"
      aria-label="SEO Score card"
    >
      {/* decorative blob — always present; only visible in dark */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl hidden dark:block" />

      {/* Header */}
      {/* Header */}
<div className="mb-2 sm:mb-3 min-w-0">
  {/* one row; wraps to 2 rows on small screens */}
  <div className="flex flex-wrap items-center gap-2 pr-0 sm:pr-0">
    {/* left: title + sample */}
    <div className="flex items-center gap-2 min-w-0">
      <p className="text-base md:text-lg font-medium md:whitespace-normal whitespace-nowrap text-slate-900 dark:text-gray-300">
        SEO Score
      </p>

      {isSample && (
        <span className="ml-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80">
          Sample
        </span>
      )}
    </div>

    {/* right: delta — push to the end on sm+ */}
    {!loading && delta && (
      <span
        className={clsx(
          "ml-auto sm:ml-auto",      // <-- pushes to right on same line on desktop
          "order-2 sm:order-none",   // <-- lets it wrap under on very small screens
          "inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap",
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
</div>


      {/* Body */}
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 justify-center md:justify-start text-center md:text-left">
        {loading ? (
          <div className="relative shrink-0 grid place-items-center" style={{ width: ringSize, height: ringSize }}>
            <div
              className="rounded-full border-slate-200 dark:border-white/10"
              style={{ width: ringSize, height: ringSize, borderWidth: ringStroke, borderStyle: "solid" }}
              aria-hidden
            />
            <span className="absolute h-5 w-12 rounded bg-emerald-500/10 animate-pulse" aria-label="Loading score" />
          </div>
        ) : (
          <div className="shrink-0">
            <SEOScoreChart
              value={score}
              max={100}
              size={ringSize}
              stroke={ringStroke}
              barClass={ringBar}
              trackClass={track}
              labelClass="text-slate-900 dark:text-white"
              animateOnMount={false}
            />
          </div>
        )}

        {loading ? (
          <span className="h-5 w-16 rounded-full bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
        ) : (
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs md:px-1.5 font-semibold whitespace-nowrap leading-none",
              statusChip(status)
            )}
            title={`Status: ${statusLabel}`}
          >
            <StatusIcon className="h-3.5 w-3.5" /> {statusLabel}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-center sm:justify-between text-xs text-slate-600 dark:text-gray-400 border-t border-slate-200/70 dark:border-white/10">
        <span className="truncate text-center sm:text-left">
          {isSample ? "Sample data — paste a URL to see your site" : note}
        </span>

        {footerMeta?.length ? (
          <div className="hidden sm:flex items-center gap-4 min-w-0">
            {footerMeta.map((m, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="opacity-70">{m.label}:</span>
                <span className="text-slate-800 dark:text-gray-300">{m.value}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
