"use client";

import { useId, useMemo } from "react";
import clsx from "clsx";

type Props = {
  series?: number[];                 // last 7/30 points
  className?: string;                // e.g. "w-full h-12"
  colorClass?: string;               // text-emerald-400 | text-amber-400 | text-rose-400 | custom
  strokeWidth?: number;              // default 2.5
  showArea?: boolean;                // default true
  showLastDot?: boolean;             // default true
  ariaLabel?: string;                // accessible label
};

export default function TopPagesChart({
  series,
  className,
  colorClass = "text-emerald-400",
  strokeWidth = 2.5,
  showArea = true,
  showLastDot = true,
  ariaLabel = "Top pages trend",
}: Props) {
  if (!series || series.length < 2) return null;

  // --- derive "tone" from the provided color class (no API changes required)
  const tone: "up" | "watch" | "down" = useMemo(() => {
    const c = colorClass.toLowerCase();
    if (c.includes("rose") || c.includes("red")) return "down";
    if (c.includes("amber") || c.includes("yellow") || c.includes("orange")) return "watch";
    return "up";
  }, [colorClass]);

  // Tone-aware fill strength (top→bottom). Slightly heavier for amber/red.
  const { topOpacity, bottomOpacity } = useMemo(() => {
    switch (tone) {
      case "down":
        return { topOpacity: 0.55, bottomOpacity: 0.08 };
      case "watch":
        return { topOpacity: 0.42, bottomOpacity: 0.06 };
      default:
        return { topOpacity: 0.32, bottomOpacity: 0.05 };
    }
  }, [tone]);

  // --- normalize points to [0..1]
  const points = useMemo(() => {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const span = Math.max(1, max - min);
    const n = series.length - 1;
    return series.map((v, i) => ({
      x: n === 0 ? 0 : i / n,
      y: max === min ? 0.5 : 1 - (v - min) / span, // invert so higher values go up
    }));
  }, [series]);

  // --- Catmull–Rom → Bézier (smooth)
  const pathData = useMemo(() => {
    const cps = (p0: any, p1: any, p2: any, t = 0.5) => ({
      x: p1.x + ((p2.x - p0.x) * t) / 6,
      y: p1.y + ((p2.y - p0.y) * t) / 6,
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1 = cps(p0, p1, p2);
      const c2 = cps(p1, p2, p3);
      d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  // Area path down to bottom
  const areaPath = useMemo(() => {
    const last = points[points.length - 1];
    return `${pathData} L ${last.x} 1 L ${points[0].x} 1 Z`;
  }, [points, pathData]);

  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={clsx(
        "block opacity-90 transition-opacity group-hover:opacity-100",
        colorClass,
        className
      )}
      role="img"
      aria-labelledby={titleId + " " + descId}
    >
      <title id={titleId}>{ariaLabel}</title>
      <desc id={descId}>Sparkline of indexed pages over time.</desc>

      {/* Tone-aware gradient (uses currentColor so it matches the line color & theme) */}
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={topOpacity} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={bottomOpacity} />
        </linearGradient>
      </defs>

      {showArea && (
        <path d={areaPath} fill={`url(#${uid}-fill)`} className="transition-opacity duration-200" />
      )}

      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth / 100}      // normalized (viewBox 0..1)
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"     // crisp when container resizes
      />

      {showLastDot && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={0.012}
          fill="currentColor"
          className="opacity-90"
        />
      )}
    </svg>
  );
}
