"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import clsx from "clsx";

type KPIProps = {
  title: string;
  value: string | number;
  /** e.g. "+4" or "-3%" */
  delta?: string;
  /** true = red (down), false/undefined = green (up) */
  down?: boolean;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** small note, e.g. "vs last week" or "indexed pages" */
  note?: string;
  /** visual style */
  variant?: "gradient" | "tint";
  /** min height */
  minH?: string;

  /** Progress-ring config for percentage-like metrics (e.g., SEO Score) */
  ringMax?: number;                // show ring if provided AND value is numeric
  statusThresholds?: {             // thresholds for status color (relative to ringMax)
    good: number;                  // >= good => Good (emerald)
    warn: number;                  // >= warn => Fair (amber), else Poor (rose)
  };
};

/* -------------------------- helpers -------------------------- */

function CountUp({ to, duration = 800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <>{val.toLocaleString()}</>;
}

function ProgressRing({
  value,
  max = 100,
  size = 76,
  stroke = 8,
  trackClass = "stroke-white/10",
  barClass = "stroke-indigo-400",
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  trackClass?: string;
  barClass?: string;
}) {
  const r = useMemo(() => (size - stroke) / 2, [size, stroke]);
  const c = useMemo(() => 2 * Math.PI * r, [r]);
  const pct = Math.max(0, Math.min(1, value / max));
  const dash = useMemo(() => `${c * pct} ${c * (1 - pct)}`, [c, pct]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className={trackClass}
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        className={barClass}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={dash}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />
    </svg>
  );
}

function StatusChip({ status }: { status: "good" | "warn" | "bad" }) {
  const cls =
    status === "good"
      ? "bg-emerald-500/10 text-emerald-400"
      : status === "warn"
      ? "bg-amber-500/10 text-amber-400"
      : "bg-rose-500/10 text-rose-400";
  const Icon =
    status === "good" ? CheckCircle2 : status === "warn" ? AlertTriangle : XCircle;
  const label = status === "good" ? "Good" : status === "warn" ? "Fair" : "Needs work";
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", cls)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

/* -------------------------- component -------------------------- */

export default function KPI({
  title,
  value,
  delta,
  down,
  icon,
  note,
  variant = "gradient",
  minH = "min-h-[148px]",
  ringMax,
  statusThresholds = { good: 80, warn: 50 },
}: KPIProps) {
  const isNumber = typeof value === "number" && Number.isFinite(value);

  // Determine status for ring-based metrics
  let status: "good" | "warn" | "bad" | undefined;
  if (isNumber && ringMax) {
    const v = value as number;
    status = v >= statusThresholds.good ? "good" : v >= statusThresholds.warn ? "warn" : "bad";
  }

  const gradientBg =
    "bg-gradient-to-br from-[#0e1322] via-[#101528] to-[#0b0f1c] border-gray-700/70";

  // Color ring by status
  const ringClass =
    status === "good"
      ? "stroke-emerald-400"
      : status === "warn"
      ? "stroke-amber-400"
      : "stroke-rose-400";

  return (
    <div
      className={clsx(
        "relative rounded-2xl border shadow-sm p-5 overflow-hidden transition-colors",
        variant === "gradient" ? gradientBg : "bg-white/5 dark:bg-gray-900/60 border-gray-700"
      )}
      aria-live="polite"
    >
      {/* Subtle corner glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <p className="text-sm font-medium text-gray-300">{title}</p>
        </div>

        {delta && (
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              down ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
            )}
            title={down ? "Decrease" : "Increase"}
          >
            {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex items-center gap-4">
        {isNumber && ringMax ? (
          <div className="relative">
            <ProgressRing
              value={value as number}
              max={ringMax}
              size={76}
              stroke={8}
              trackClass="stroke-white/10"
              barClass={ringClass}
            />
            <div className="absolute inset-0 grid place-items-center text-xl font-extrabold text-white">
              <CountUp to={value as number} />
            </div>
          </div>
        ) : (
          <div className="text-5xl font-extrabold leading-none text-white">
            {isNumber ? <CountUp to={value as number} /> : value}
          </div>
        )}

        <div className="flex-1 flex flex-col gap-1">
          {status && <StatusChip status={status} />}
          {note && <div className="text-xs text-gray-400">{note}</div>}
        </div>
      </div>
    </div>
  );
}
