"use client";

import { useEffect, useMemo, useState } from "react";

function CountUp({ to, duration = 800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{val.toLocaleString()}</>;
}

export default function SEOScoreChart({
  value,
  max = 100,
  size = 76,
  stroke = 10,
  trackClass = "stroke-slate-200 dark:stroke-white/10", // ⬅️ theme-aware
  barClass = "stroke-emerald-400",
  labelClass = "text-gray-700 dark:text-white",        // ⬅️ theme-aware
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  trackClass?: string;
  barClass?: string;
  labelClass?: string;
}) {
  const r = useMemo(() => (size - stroke) / 2, [size, stroke]);
  const c = useMemo(() => 2 * Math.PI * r, [r]);
  const pct = Math.max(0, Math.min(1, value / max));
  const dash = useMemo(() => `${c * pct} ${c * (1 - pct)}`, [c, pct]);

  return (
    <div className="relative" aria-label="SEO score gauge">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
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
       
        <CountUp to={value} />
      </div>
    </div>
  );
}
