"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";
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
  /** Show “Sample” badge when using demo/mock data */
  isSample?: boolean; // ⬅️ NEW
};

/* Breakpoints (SSR-safe) */
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

/* Disable transitions on first paint to kill any color flicker */
function useMountedOnce() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";

export default function SEOScoreCard({
  value,
  delta,
  down,
  note = "vs last week",
  thresholds = { good: 80, warn: 50 },
  height = KPI_CARD_HEIGHTS,
  footerMeta,
  loading = false,
  isSample = false, // ⬅️ NEW
}: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const bp = useBreakpoint();
  const mounted = useMountedOnce();

  const status: Status = value >= thresholds.good ? "good" : value >= thresholds.warn ? "warn" : "bad";

  const ringSize   = bp === "lg" ? 84 : bp === "md" ? 76 : 72;
  const ringStroke = bp === "lg" ? 10 : 8;

  const ringColor =
    status === "good"
      ? "stroke-emerald-400 group-hover:stroke-emerald-500"
      : status === "warn"
      ? "stroke-amber-400 group-hover:stroke-amber-500"
      : "stroke-rose-400 group-hover:stroke-rose-500";

  const ringBar = clsx(ringColor, mounted ? "transition-colors duration-200" : "transition-none");

  const track = isDark ? "stroke-white/10" : "stroke-slate-200";
  

    const cardClass =
  "border border-slate-200 bg-white dark:border-gray-700/70 " +
  "dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]";
    
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
    
      {mounted && isDark && (
       <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />
       )}


      {/* Header */}
      <div className="relative mb-2 sm:mb-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 pr-12 md:pr-14">
         
          <p className={clsx("text-base md:text-lg font-medium md:whitespace-normal whitespace-nowrap", titleClass)}>
            SEO Score
          </p>

          {/* Sample badge — clear but unobtrusive */}
          {isSample && (
            <span
              className={clsx(
                "ml-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                isDark ? "bg-white/10 text-white/80" : "bg-slate-100 text-slate-700"
              )}
              title="Showing sample data. Paste a URL to see your site."
            >
              Sample
            </span>
          )}
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
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 justify-center md:justify-start text-center md:text-left">
        {loading ? (
          <div className="relative shrink-0 grid place-items-center" style={{ width: ringSize, height: ringSize }}>
            <div
              className={clsx("rounded-full", isDark ? "border-white/10" : "border-slate-200")}
              style={{ width: ringSize, height: ringSize, borderWidth: ringStroke, borderStyle: "solid" }}
              aria-hidden
            />
            <span className="absolute h-5 w-12 rounded bg-emerald-500/10 animate-pulse" aria-label="Loading score" />
          </div>
        ) : (
          <div className="shrink-0">
            <SEOScoreChart
              value={value}
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
              "inline-flex items-center gap-1 rounded-full",
              "px-2 py-0.5 text-[11px] sm:text-xs md:px-1.5",
              "font-semibold whitespace-nowrap leading-none",
              statusChip(status)
            )}
            title={`Status: ${statusLabel}`}
          >
            <StatusIcon className="h-3.5 w-3.5" /> {statusLabel}
          </span>
        )}
      </div>

      {/* Footer */}
      <div
        className={clsx(
          "mt-auto pt-3 sm:pt-4 flex items-center justify-center sm:justify-between text-xs",
          muted,
          isDark ? "border-t border-white/10" : "border-t border-slate-200/70"
        )}
      >
        <span className="truncate text-center sm:text-left">
          {isSample ? "Sample data — paste a URL to see your site" : note}
        </span>

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
