// components/overview/AIPredictionsChart.tsx
"use client";

import { useId, useMemo } from "react";
import clsx from "clsx";


type Props = {
  /** Median series to draw. If missing/short, a subtle placeholder line is rendered. */
  median?: number[];
  /** Optional uncertainty bounds (must match median length to render). */
  bandLow?: number[];
  bandHigh?: number[];
  /** Accessible label for the graphic. */
  unitLabel?: string;
  /** Pixel height of the svg (width is 100%). */
  height?: number;
  /** Stroke thickness in px. */
  strokeWidth?: number;
  /** Tailwind class to color the line (uses currentColor). */
  strokeClass?: string;
  /** Optional explicit color (hex/rgb). Overrides strokeClass. */
  strokeHex?: string;
};

export default function AIPredictionsChart({
  median = [],
  bandLow,
  bandHigh,
  unitLabel,
  height = 150,
  strokeWidth = 3,
  strokeClass = "text-slate-700 dark:text-slate-200",
  strokeHex,
}: Props) {
  // Fixed internal viewport so we can compute paths in px and scale via viewBox.
  const W = 1000;
  const H = 300;
  const PAD = 16;

  // Sanitize inputs once.
  const med = Array.isArray(median) ? median : [];
  const low = Array.isArray(bandLow) ? bandLow : [];
  const high = Array.isArray(bandHigh) ? bandHigh : [];

  // If we don't have enough points, show a faint baseline (non-breaking state).
  if (med.length < 2) {
    return (
      <div className="relative" aria-label={unitLabel}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          height={height}
          width="100%"
          preserveAspectRatio="none"
          className="block"
          role="img"
          aria-hidden={!unitLabel ? true : undefined}
        >
          <line
            x1={PAD}
            y1={H - PAD * 1.5}
            x2={W - PAD}
            y2={H - PAD * 1.5}
            stroke={strokeHex ?? "currentColor"}
            strokeOpacity={0.15}
            strokeWidth={strokeWidth}
            className={strokeClass}
          />
        </svg>
      </div>
    );
  }

  const id = useId(); // stable across renders (prevents hydration issues)

  // Compute scales + paths only when inputs change.
  const { medianPath, areaPath } = useMemo(() => {
    const N = med.length;

    // Y domain considers the band if present
    const lo = Math.min(...med, ...(low.length ? low : [Infinity]));
    const hi = Math.max(...med, ...(high.length ? high : [-Infinity]));
    const span = Math.max(1e-6, hi - lo);

    const X = (i: number) => PAD + (i / (N - 1)) * (W - PAD * 2);
    const Y = (v: number) => PAD + (1 - (v - lo) / span) * (H - PAD * 2);

    const pathFrom = (arr: number[]) =>
      arr.map((v, i) => `${i ? "L" : "M"} ${X(i)} ${Y(v)}`).join(" ");

    const medianPath = pathFrom(med);

    let areaPath = "";
    const bandValid = low.length === N && high.length === N;
    if (bandValid) {
      // Build polygon: high forward + low reversed
      const highPts = high.map((v, i) => [X(i), Y(v)] as const);
      const lowPts = low.map((v, i) => [X(i), Y(v)] as const).reverse();

      areaPath =
        `M ${highPts[0][0]} ${highPts[0][1]} ` +
        highPts
          .slice(1)
          .map(([x, y]) => `L ${x} ${y}`)
          .join(" ") +
        " " +
        lowPts.map(([x, y]) => `L ${x} ${y}`).join(" ") +
        " Z";
    }

    return { medianPath, areaPath };
  }, [med, low, high]);

  return (
    <div className="relative" aria-label={unitLabel}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        height={height}
        width="100%"
        preserveAspectRatio="none"
        className="block"
        role="img"
        aria-hidden={!unitLabel ? true : undefined}
      >
        {/* Band gradient */}
        {areaPath && (
          <defs>
            <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.08} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0.02} />
            </linearGradient>
          </defs>
        )}

        {/* Uncertainty band (only if both bounds valid) */}
        {areaPath && <path d={areaPath} fill={`url(#${id}-area)`} />}

        {/* Median line */}
        <path
          d={medianPath}
          fill="none"
          stroke={strokeHex ?? "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={clsx(strokeClass)}
        />
      </svg>
    </div>
  );
}
