"use client";

import dynamic from "next/dynamic";
import clsx from "clsx";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;
  target: number;
  unit: string;                 // "s" | "ms" | ""
  thresholds?: number[];        // [good, needs-improvement] (low is better)
  color?: string;               // optional ring color override
};

type Props = { vitals?: CoreVital[] };

const DEFAULT_THRESHOLDS: Record<string, [number, number]> = {
  LCP: [2.5, 4.0],
  INP: [200, 500],
  CLS: [0.1, 0.25],
};

const RING_COLOR_BY_VITAL: Record<string, string> = {
  LCP: "#10b981", // emerald
  INP: "#3b82f6", // blue
  CLS: "#f59e0b", // amber
};

function pctToTarget(value: number, target: number) {
  const t = Math.max(0.000001, target);
  return Math.min(100, Math.max(0, (value / t) * 100));
}

type StatusKey = "good" | "warn" | "poor";
function statusKeyFor(v: CoreVital): StatusKey {
  const [good, warn] = v.thresholds ?? DEFAULT_THRESHOLDS[v.name] ?? [v.target, v.target * 1.6];
  if (v.value <= good) return "good";
  if (v.value <= warn) return "warn";
  return "poor";
}

function formatRaw(value: number, unit: string) {
  if (!Number.isFinite(value)) return "-";
  if (unit === "s") return value.toFixed(1);
  if (unit === "ms") return String(Math.round(value));
  return String(value);
}

function StatusPill({ status, className }: { status: StatusKey; className?: string }) {
  const label = status === "good" ? "Good" : status === "warn" ? "Needs work" : "Poor";
  const pillClass =
    status === "good"
      ? "border-transparent bg-slate-100 dark:bg-white/5 text-emerald-600 dark:text-emerald-400"
      : status === "warn"
      ? "border-amber-300/30 bg-amber-500/10 text-amber-400"
      : "border-rose-300/30 bg-rose-500/10 text-rose-400";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition-colors",
        pillClass,
        className
      )}
    >
      {label}
    </span>
  );
}

export default function CoreWebVitalsChart({ vitals = [] }: Props) {
  if (!vitals.length) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center">
        No Core Web Vitals data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {vitals.map((v, i) => {
        const status = statusKeyFor(v);
        const progress = Number(pctToTarget(v.value, v.target).toFixed(1));
        const ringColor = v.color ?? RING_COLOR_BY_VITAL[v.name] ?? "#64748b";
        const rawLabel = `${formatRaw(v.value, v.unit)}${v.unit}`;
        const targetLabel = `${formatRaw(v.target, v.unit)}${v.unit}`;

        const options: ApexCharts.ApexOptions = {
          chart: { type: "radialBar", sparkline: { enabled: true } },
          colors: [ringColor],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "55%",       // base: keep roomy center
                margin: 2,
              },
              track: {
                background: "rgba(148,163,184,0.25)",
                strokeWidth: "88%", // slightly thinner ring
              },
              dataLabels: {
                value: {
                  show: true,
                  offsetY: -14,
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "currentColor",
                  formatter: () => rawLabel,
                },
                name: {
                  show: true,
                  offsetY: 20,
                  color: "currentColor",
                  fontSize: "14px",
                  fontWeight: 700,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal",
              gradientToColors: [ringColor],
              stops: [0, 100],
            },
          },
          stroke: { lineCap: "round" },
          labels: [v.name],
          // Phone-first tweaks
          responsive: [
            {
              breakpoint: 480,
              options: {
                plotOptions: {
                  radialBar: {
                    hollow: { size: "55%" },               // more inner space
                    track: { strokeWidth: "90%" },         // even slimmer ring
                    dataLabels: {
                      value: { fontSize: "18px", offsetY: -14 },
                      name: { fontSize: "12px", offsetY: 22 },
                    },
                  },
                },
              },
            },
            {
              breakpoint: 300,
              options: {
                plotOptions: {
                  radialBar: {
                    hollow: { size: "55%" },
                    track: { strokeWidth: "90%" },
                    dataLabels: {
                      value: { fontSize: "18px", offsetY: -12 },
                      name: { fontSize: "12px", offsetY: 22 },
                    },
                  },
                },
              },
            },
          ],
        };

        return (
          <div
            key={`${v.name}-${i}`}
            className="apex-vitals flex flex-col items-center text-center text-slate-900 dark:text-white"
            aria-label={`${v.name} ${rawLabel}, target ${targetLabel}`}
          >
            <Chart options={options} series={[progress]} type="radialBar" height={148} />

            <p className="mt-3 text-sm text-slate-800 dark:text-slate-200">
              <span className="font-semibold">{rawLabel}</span>
              <span className="opacity-60">&nbsp;·&nbsp;target {targetLabel}</span>
            </p>

            <StatusPill status={status} className="mt-2" />

            {/* scoped readability boost for the center value */}
            <style jsx global>{`
              .apex-vitals .apexcharts-datalabel-value {
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
              }
              .dark .apex-vitals .apexcharts-datalabel-value {
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}
