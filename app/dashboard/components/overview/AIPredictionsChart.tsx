"use client";

import clsx from "clsx";

type Glow = "none" | "soft" | "strong";

type Props = {
  median: number[];
  bandLow?: number[];
  bandHigh?: number[];
  unitLabel?: string;
  height?: number;

  // Appearance
  strokeWidth?: number;           // line thickness (px)
  strokeClass?: string;           // tailwind class -> uses currentColor
  strokeHex?: string;             // exact color (overrides strokeClass)
  glow?: Glow;                    // "none" | "soft" | "strong"
  className?: string;             // wrapper <div> class
};

export default function AIPredictionsChart({
  median,
  bandLow,
  bandHigh,
  unitLabel,
  height = 150,
  strokeWidth = 3,
  strokeClass = "text-slate-700 dark:text-slate-200",
  strokeHex,
  glow = "none",
  className,
}: Props) {
  const W = 1000;        // internal SVG width
  const H = 300;         // internal SVG height
  const PAD = 16;

  const N = Math.max(2, median.length);

  // y-scale domain
  const lo = Math.min(...median, ...(bandLow ?? [Infinity]));
  const hi = Math.max(...median, ...(bandHigh ?? [-Infinity]));
  const span = Math.max(1, hi - lo);

  const X = (i: number) => PAD + (i / (N - 1)) * (W - PAD * 2);
  const Y = (v: number) => PAD + (1 - (v - lo) / span) * (H - PAD * 2);

  const pathFor = (arr: number[]) =>
    arr.map((v, i) => `${i ? "L" : "M"} ${X(i)} ${Y(v)}`).join(" ");

  const medianPath = pathFor(median);
  const hasBand = !!bandLow && !!bandHigh && bandLow.length === N && bandHigh.length === N;

  // Build a closed polygon for the uncertainty band
  let bandPath = "";
  if (hasBand) {
    const top = bandHigh!.map((v, i) => `${i ? "L" : "M"} ${X(i)} ${Y(v)}`).join(" ");
    const bottom = bandLow!
      .map((v, i) => `L ${X(N - 1 - i)} ${Y(bandLow![N - 1 - i])}`) // reverse
      .join(" ");
    bandPath = `${top} ${bottom} Z`;
  }

  // Glow tuning
  const glowBlur = glow === "none" ? 0 : glow === "strong" ? 6 : 2.2;
  const glowOpacity = glow === "none" ? 0 : glow === "strong" ? 0.35 : 0.18;
  const glowExtra = glow === "none" ? 0 : 2;

  const id = "spark-" + Math.random().toString(36).slice(2);

  return (
    <div className={clsx("relative", className)} aria-label={unitLabel}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={height}
        role="img"
        aria-label={unitLabel}
        className="block"
      >
        <defs>
          {/* soft glow */}
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* band gradient (very subtle) */}
          {hasBand && (
            <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.08} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0.02} />
            </linearGradient>
          )}
        </defs>

        {/* Uncertainty band */}
        {hasBand && (
          <path d={bandPath} fill={`url(#${id}-area)`} className="text-slate-400 dark:text-white" />
        )}

        {/* Glow stroke (under the main line) */}
        {glow !== "none" && (
          <path
            d={medianPath}
            fill="none"
            stroke={strokeHex ?? "currentColor"}
            strokeWidth={strokeWidth + glowExtra}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter={`url(#${id}-glow)`}
            opacity={glowOpacity}
            className={strokeClass}
          />
        )}

        {/* Main line */}
        <path
          d={medianPath}
          fill="none"
          stroke={strokeHex ?? "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={strokeClass}
        />
      </svg>
    </div>
  );
}
