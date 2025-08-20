"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

// 🔧 keep the donut height in one place
const CHART_H = 148;

// Reserve the space while react-apexcharts loads

// after
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="w-full" style={{ height: CHART_H }} aria-hidden />,
});


export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;
  target: number;
  unit: "s" | "ms" | "";
  thresholds?: [number, number];
  color?: string;
};
type Props = { vitals?: CoreVital[] };

const DEFAULT_THRESHOLDS: Record<string, [number, number]> = {
  LCP: [2.5, 4.0],
  INP: [200, 500],
  CLS: [0.1, 0.25],
};
type StatusKey = "good" | "warn" | "poor";
const STATUS_COLOR: Record<StatusKey, string> = {
  good: "#10b981",
  warn: "#f59e0b",
  poor: "#ef4444",
};

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

function scoreToGood(value: number, good: number, warn: number) {
  if (!Number.isFinite(value)) return 0;
  if (value <= good) return 100;
  if (value >= warn) return 0;
  const span = warn - good || 1;
  return Math.max(0, Math.min(100, ((warn - value) / span) * 100));
}
function statusKeyFor(v: CoreVital): StatusKey {
  const [good, warn] = v.thresholds ?? DEFAULT_THRESHOLDS[v.name] ?? [v.target, v.target * 1.6];
  if (v.value <= good) return "good";
  if (v.value <= warn) return "warn";
  return "poor";
}
function formatRaw(value: number, unit: CoreVital["unit"]) {
  if (!Number.isFinite(value)) return "-";
  if (unit === "s") return (Math.round(value * 10) / 10).toFixed(1);
  if (unit === "ms") return String(Math.round(value));
  return (Math.round(value * 100) / 100).toFixed(2);
}

function StatusPill({ status, className, title }: { status: StatusKey; className?: string; title?: string }) {
  const label = status === "good" ? "Good" : status === "warn" ? "Needs work" : "Poor";
  const pillClass =
    status === "good"
      ? "border-transparent bg-slate-100 dark:bg-white/5 text-emerald-600 dark:text-emerald-400"
      : status === "warn"
      ? "border-amber-300/30 bg-amber-500/10 text-amber-400"
      : "border-rose-300/30 bg-rose-500/10 text-rose-400";
  return (
    <span role="status" title={title} className={clsx("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition-colors", pillClass, className)}>
      {label}
    </span>
  );
}

export default function CoreWebVitalsChart({ vitals = [] }: Props) {
  // If parent always passes seeded vitals, this branch won’t hit. Still keep the space.
  if (!vitals.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="apex-vitals min-h-[200px] flex flex-col items-center" />
        ))}
      </div>
    );
  }

  const reduceMotion = useReducedMotion();

  const items = useMemo(() => {
    return vitals.map((v) => {
      const [good, warn] = v.thresholds ?? DEFAULT_THRESHOLDS[v.name] ?? [v.target, v.target * 1.6];
      const status = statusKeyFor(v);
      const ringColor = v.color ?? STATUS_COLOR[status];
      const progress = Number(scoreToGood(v.value, good, warn).toFixed(1));
      const rawLabel = `${formatRaw(v.value, v.unit)}${v.unit}`;
      const targetLabel = `${formatRaw(v.target, v.unit)}${v.unit}`;
      const statusTitle =
        status === "good"
          ? "Meets Core Web Vitals target"
          : status === "warn"
          ? "Needs improvement (between good and poor thresholds)"
          : "Poor (above the poor threshold)";

      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "radialBar",
          sparkline: { enabled: true },
         
           animations: {
      enabled: false,
      animateGradually: { enabled: false },
      dynamicAnimation: { enabled: false },
      speed: 0,
    },
          foreColor: "currentColor",
          toolbar: { show: false },
          redrawOnParentResize: true,
        },
        noData: { text: "" }, // ✅ top-level
        colors: [ringColor],
        fill: { type: "solid", colors: [ringColor] },
        
        stroke: { colors: [ringColor], lineCap: "round" },
        plotOptions: {
          radialBar: {
            hollow: { size: "55%", margin: 2 },
            track: { background: "rgba(148,163,184,0.25)", strokeWidth: "88%" },
            dataLabels: {
              value: {
                show: true,
                offsetY: -14,
                fontSize: "18px",
                fontWeight: 800,
                color: "currentColor",
                formatter: () => rawLabel,
              },
              name: { show: true, offsetY: 20, color: "currentColor", fontSize: "14px", fontWeight: 700 },
            },
          },
        },
        tooltip: { enabled: true, y: { formatter: () => `${rawLabel} • representative (p75) value over the last 28 days` } },
        labels: [v.name],
      };

      const series = [Number.isFinite(progress) ? progress : 0.001];

      return { key: `${v.name}-${ringColor}`, v, status, progress, rawLabel, targetLabel, statusTitle, options, series };
    });
  }, [vitals, reduceMotion]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((it) => (
        <div
          key={it.key}
          className="apex-vitals min-h-[200px] flex flex-col items-center text-center text-slate-900 dark:text-white"
          role="img"
          aria-label={`${it.v.name} ${it.rawLabel}, target ≤ ${it.targetLabel}, status ${it.status}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(it.progress)}
        >
          {/* 🔒 Reserve donut space from first paint */}
          

          <div className="w-full flex items-center justify-center" style={{ height: CHART_H }}>
         <Chart key={it.key} options={it.options} series={it.series} type="radialBar" height={CHART_H} />
          </div>


          <p className="mt-2 text-[11px] text-slate-500/80 dark:text-slate-400/80">Target ≤ {it.targetLabel}</p>
          <StatusPill status={it.status} className="mt-2" title={it.statusTitle} />

          <style jsx global>{`
            .apex-vitals .apexcharts-datalabel-value {
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
            }
            .dark .apex-vitals .apexcharts-datalabel-value {
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
