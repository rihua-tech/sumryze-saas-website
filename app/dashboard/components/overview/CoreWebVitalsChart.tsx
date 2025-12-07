"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import type { ApexOptions } from "apexcharts";

/** Keep the donut height in one place (no layout shift) */
const CHART_H = 148;

/** Lazy-load ApexCharts with a fixed-height placeholder */
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="w-full" style={{ height: CHART_H }} aria-hidden />,
});

export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;                 // use NaN for loading state
  target: number;
  unit: "s" | "ms" | "";
  thresholds?: [number, number]; // [good, warn]
  color?: string;                // optional override
};
type Props = { vitals?: CoreVital[] | null };

export const DEFAULT_THRESHOLDS: Record<string, [number, number]> = {
  LCP: [2.5, 4.0],
  INP: [200, 500],
  CLS: [0.1, 0.25],
};

type StatusKey = "good" | "warn" | "poor";
const PILL_COLOR: Record<StatusKey, string> = {
  good: "text-emerald-600 dark:text-emerald-400",
  warn: "text-amber-500 dark:text-amber-400",
  poor: "text-rose-500 dark:text-rose-400",
};

const NEUTRAL_TRACK = "rgba(148,163,184,0.25)"; // slate-400 @25%

/** Fixed ring colors per metric */
const RING_COLOR_BY_VITAL: Record<string, string> = {
  LCP: "#10b981", // emerald-500
  INP: "#3b82f6", // blue-500
  CLS: "#f59e0b", // amber-500
};

/** Status logic (p75 <= good -> good; <= warn -> needs work; else poor) */
function getVitalStatus(value: number, thresholds: [number, number]): StatusKey {
  const [good, warn] = thresholds;
  if (value <= good) return "good";
  if (value <= warn) return "warn";
  return "poor";
}

/** Convert a raw measurement to the ring “progress” (0..100) */
function scoreToGood(value: number, good: number, warn: number) {
  if (!Number.isFinite(value)) return NaN;
  if (value <= good) return 100;
  if (value >= warn) return 0;
  const span = Math.max(1e-6, warn - good);
  return ((warn - value) / span) * 100;
}

function formatRaw(value: number, unit: CoreVital["unit"]) {
  if (!Number.isFinite(value)) return "—";
  if (unit === "s") return (Math.round(value * 10) / 10).toFixed(1);
  if (unit === "ms") return String(Math.round(value));
  return (Math.round(value * 100) / 100).toFixed(2);
}

function StatusPill({
  status,
  className,
  title,
}: {
  status: StatusKey | "loading";
  className?: string;
  title?: string;
}) {
  const label =
    status === "good" ? "Good" : status === "warn" ? "Needs work" : status === "poor" ? "Poor" : "Loading...";

  const classes =
    status === "good"
      ? "bg-emerald-500/10 border-transparent"
      : status === "warn"
      ? "bg-amber-500/10 border-amber-300/30"
      : status === "poor"
      ? "bg-rose-500/10 border-rose-300/30"
      : "bg-slate-200/40 border-slate-300/50 dark:bg-white/5 dark:border-white/10";

  const text =
    status === "good"
      ? PILL_COLOR.good
      : status === "warn"
      ? PILL_COLOR.warn
      : status === "poor"
      ? PILL_COLOR.poor
      : "text-slate-500 dark:text-slate-300";

  return (
    <span
      role="status"
      title={title}
      className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border", classes, text, className)}
    >
      {label}
    </span>
  );
}

export default function CoreWebVitalsChart({ vitals }: Props) {
  if (vitals === null) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No Data
      </div>
    );
  }

  const safeVitals = Array.isArray(vitals) ? vitals : [];

  // Always reserve the 3 cells even if nothing is provided
  if (!safeVitals.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="min-h-[200px] flex flex-col items-center" />
        ))}
      </div>
    );
  }

  const items = useMemo(() => {
    return safeVitals.map((v) => {
      const thresholds = v.thresholds ?? DEFAULT_THRESHOLDS[v.name] ?? [v.target, v.target * 1.6];
      const isLoading = !Number.isFinite(v.value);
      const status: StatusKey | "loading" = isLoading ? "loading" : getVitalStatus(v.value, thresholds);

      const targetLabel = `${formatRaw(v.target, v.unit)}${v.unit}`;
      const valueLabel = `${formatRaw(v.value, v.unit)}${Number.isFinite(v.value) ? v.unit : ""}`;

      // fixed ring color per metric (also while loading)
      const ringColor = v.color ?? RING_COLOR_BY_VITAL[v.name] ?? "#0ea5e9"; // fallback sky-500

      // while loading, draw a full ring so the donuts look “ready”
      const progressRaw = scoreToGood(v.value, thresholds[0], thresholds[1]);
      const progress = isLoading
        ? 100
        : Number.isFinite(progressRaw)
        ? Number(progressRaw.toFixed(1))
        : 100;

      const statusTitle =
        status === "loading"
          ? "Loading field data..."
          : status === "good"
          ? "Meets Core Web Vitals target"
          : status === "warn"
          ? "Needs improvement"
          : "Poor";

      const options: ApexOptions = {
        chart: {
          type: "radialBar",
          sparkline: { enabled: true },
          animations: {
            enabled: false,
            animateGradually: { enabled: false },
            dynamicAnimation: { enabled: false },
          },
          toolbar: { show: false },
          foreColor: "currentColor",
          redrawOnParentResize: true,
        },
        noData: { text: "" },
        colors: [ringColor],
        fill: { type: "solid", colors: [ringColor] },
        stroke: { colors: [ringColor], lineCap: "round" },
        plotOptions: {
          radialBar: {
            hollow: { size: "55%", margin: 2 },
            track: { background: NEUTRAL_TRACK, strokeWidth: "88%" },
            dataLabels: {
              show: false, // we overlay our own center content
              value: { show: false },
              name: { show: false },
              total: { show: false },
            },
          },
        },
        labels: [v.name],
        tooltip: {
          enabled: !isLoading, // disable tooltip while loading
          y: {
            formatter: () =>
              isLoading ? "" : `${valueLabel} • representative (p75) value over the last 28 days`,
          },
        },
      };

      const series = [progress];

      return {
        key: v.name,
        v,
        status,
        ringColor,
        valueLabel,
        targetLabel,
        statusTitle,
        options,
        series,
      };
    });
  }, [safeVitals]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((it) => (
        <div
          key={it.key}
          className="min-h-[200px] flex flex-col items-center text-center text-slate-900 dark:text-white"
          role="group"
          aria-label={`${it.v.name} ${it.valueLabel} target ≤ ${it.targetLabel}`}
        >
          {/* Ring */}
          <div className="relative w-full flex items-center justify-center" style={{ height: CHART_H }}>
            <Chart options={it.options} series={it.series} type="radialBar" height={CHART_H} />

            {/* Center overlay (static content) */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-sm font-semibold tracking-wide">{it.v.name}</div>
              <div className="mt-1 text-[11px] text-slate-500/80 dark:text-slate-400/80">
                Target ≤ {it.targetLabel}
              </div>
            </div>
          </div>

          {/* Dynamic line: value + status */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="tabular-nums font-extrabold text-base leading-none">
              {it.valueLabel}
            </span>
            <StatusPill status={it.status} title={it.statusTitle} />
          </div>
        </div>
      ))}
    </div>
  );
}

export type { CoreVital as CoreVitalType };
