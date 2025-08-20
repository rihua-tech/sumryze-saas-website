"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Reduced motion (with Safari fallback) ---------- */
function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(!!mq.matches);
    update();
    // modern
    if ("addEventListener" in mq) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // Safari < 14
    // @ts-expect-error legacy
    mq.addListener?.(update);
    // @ts-expect-error legacy
    return () => mq.removeListener?.(update);
  }, []);
  return reduce;
}

/* ---------- Count-up (respects reduced motion) ---------- */
function CountUp({
  to,
  duration = 800,
  animateOnMount = true,
  format = (n: number) => n.toLocaleString(),
}: {
  to: number;
  duration?: number;
  animateOnMount?: boolean;
  format?: (n: number) => string;
}) {
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [val, setVal] = useState<number>(animateOnMount && !reduce ? 0 : to);
  const prevTo = useRef<number>(to);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (!animateOnMount || reduce) {
        setVal(to);
        prevTo.current = to;
        return;
      }
    }
    if (to === prevTo.current || reduce) {
      setVal(to);
      prevTo.current = to;
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = val;
    const dur = Math.max(120, duration);

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    prevTo.current = to;
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration, animateOnMount, reduce]);

  return <>{format(val)}</>;
}

/* ---------- Gauge ---------- */
export default function SEOScoreChart({
  value,
  max = 100,
  size = 76,
  stroke = 10,
  /** Optional thresholds to auto-color ring (<=good = green, <=warn = amber, else red) */
  thresholds,
  trackClass = "stroke-slate-200 dark:stroke-white/10",
  barClass, // if provided, overrides auto color
  labelClass = "text-gray-700 dark:text-white",
  animateOnMount = true,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  /** e.g. { good: 80, warn: 60 } */
  thresholds?: { good: number; warn: number };
  trackClass?: string;
  barClass?: string;
  labelClass?: string;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();

  const safeMax = Math.max(1, Math.floor(max || 100));
  const safeVal = Math.min(Math.max(0, Math.round(value)), safeMax);

  // Geometry safety: never let radius go negative; clamp stroke to size.
  const clampedStroke = Math.min(stroke, Math.max(1, size - 2));
  const r = useMemo(() => Math.max(1, (size - clampedStroke) / 2), [size, clampedStroke]);
  const c = useMemo(() => 2 * Math.PI * r, [r]);
  const pct = safeVal / safeMax;
  const dash = useMemo(() => `${(c * pct).toFixed(3)} ${(c * (1 - pct)).toFixed(3)}`, [c, pct]);

  // Auto color by thresholds unless a barClass is supplied
  const autoBarClass =
    thresholds
      ? safeVal >= thresholds.good
        ? "stroke-emerald-400"
        : safeVal >= thresholds.warn
        ? "stroke-amber-400"
        : "stroke-rose-400"
      : "stroke-emerald-400";
  const ringClass = barClass || autoBarClass;

  const ariaValueText = `SEO score ${safeVal} out of ${safeMax}`;

  return (
    <div
      className="relative"
      role="progressbar"
      aria-label="SEO score"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeVal}
      aria-valuetext={ariaValueText}
      aria-live="polite"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={trackClass}
          strokeWidth={clampedStroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={ringClass}
          strokeWidth={clampedStroke}
          strokeLinecap="round"
          strokeDasharray={dash}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
          // subtle motion if allowed
          style={{ transition: reduce ? undefined : "stroke-dasharray 600ms ease-out" }}
        />
      </svg>

      <div
        className={`absolute inset-0 grid place-items-center text-xl font-extrabold ${labelClass}`}
      >
        <CountUp
          to={safeVal}
          duration={800}
          animateOnMount={animateOnMount}
        />
      </div>
    </div>
  );
}
