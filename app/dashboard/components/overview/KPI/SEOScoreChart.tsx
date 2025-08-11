"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

function CountUp({
  to,
  duration = 800,
  animateOnMount = true,
}: {
  to: number;
  duration?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [val, setVal] = useState<number>(animateOnMount && !reduce ? 0 : to);
  const prevTo = useRef<number>(to);

  useEffect(() => {
    // First paint: snap if animateOnMount=false or reduced motion
    if (first.current) {
      first.current = false;
      if (!animateOnMount || reduce) {
        setVal(to);
        prevTo.current = to;
        return;
      }
    }

    // No change or reduced motion → snap
    if (to === prevTo.current || reduce) {
      setVal(to);
      prevTo.current = to;
      return;
    }

    // Animate from current displayed value
    let raf = 0;
    const start = performance.now();
    const from = val;
    const dur = Math.max(120, duration);

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    prevTo.current = to;
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration, animateOnMount, reduce]);

  return <>{val.toLocaleString()}</>;
}

export default function SEOScoreChart({
  value,
  max = 100,
  size = 76,
  stroke = 10,
  trackClass = "stroke-slate-200 dark:stroke-white/10",
  barClass = "stroke-emerald-400",
  labelClass = "text-gray-700 dark:text-white",
  animateOnMount = true,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  trackClass?: string;
  barClass?: string;
  labelClass?: string;
  animateOnMount?: boolean;
}) {
  const safeMax = Math.max(1, max || 100);
  const safeVal = Math.min(Math.max(0, value), safeMax);

  const r = useMemo(() => (size - stroke) / 2, [size, stroke]);
  const c = useMemo(() => 2 * Math.PI * r, [r]);
  const pct = safeVal / safeMax;
  const dash = useMemo(() => `${c * pct} ${c * (1 - pct)}`, [c, pct]);

  return (
    <div
      className="relative"
      aria-label="SEO score gauge"
      role="img"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeVal}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <title>SEO Score: {safeVal} / {safeMax}</title>
        <circle cx={size / 2} cy={size / 2} r={r} className={trackClass} strokeWidth={stroke} fill="none" />
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

      <div className={`absolute inset-0 grid place-items-center text-xl font-extrabold ${labelClass}`}>
        <CountUp to={Math.round(safeVal)} duration={800} animateOnMount={animateOnMount} />
      </div>
    </div>
  );
}
