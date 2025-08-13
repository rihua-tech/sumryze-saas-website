"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

type TabType = "weekly" | "monthly";
interface TrafficDataPoint { date: string; traffic: number }

/* -------- Phone breakpoint (client-only, hydration-safe) -------- */
function useIsPhone(max = 420) {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${max}px)`);
    const on = () => setIsPhone(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [max]);
  return isPhone;
}

/* -------- Measure container to adapt tick count to pixel height -------- */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ width: r.width, height: r.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

/* -------- Nice integer ticks + ~8% domain padding (clamp min to 0) -------- */
function niceScaleInt(min: number, max: number, desiredTicks = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { ticks: [0, 1], domain: [0, 1] as [number, number] };
  }
  if (min === max) { min = Math.max(0, Math.floor(min - 1)); max = Math.ceil(max + 1); }
  if (min > max) [min, max] = [max, min];

  const span = Math.max(1, max - min);
  const rough = span / Math.max(2, desiredTicks - 1);

  const p10 = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * p10).find(s => s >= rough) ?? 10 * p10;

  const pad = Math.max(step, Math.round(span * 0.08)); // ~8% headroom
  let niceMin = Math.floor((min - pad) / step) * step;
  let niceMax = Math.ceil((max + pad) / step) * step;
  niceMin = Math.max(0, niceMin);

  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax; v += step) ticks.push(Math.round(v));
  if (ticks.length < 2) ticks.push(Math.round(niceMax + step));

  return { ticks, domain: [niceMin, niceMax] as [number, number] };
}

export default function TrafficAreaChart({
  activeTab,
  data,
}: { activeTab: TabType; data: TrafficDataPoint[] }) {
  const isPhone = useIsPhone();
  const [boxRef, box] = useElementSize<HTMLDivElement>();
  const uid = useId(); // unique gradient id per instance

  const clean = useMemo(
    () => (Array.isArray(data) ? data : []).map(d => ({
      date: String(d?.date ?? ""),
      traffic: Number(d?.traffic) || 0,
    })),
    [data]
  );

  const latestValue = useMemo(
    () => (clean.length ? clean[clean.length - 1].traffic : 0),
    [clean]
  );

  /* Adaptive tick count from pixel height (3–7 ticks) */
  const desiredTicks = useMemo(() => {
    const h = box.height || (isPhone ? 220 : 230);
    const approx = Math.round(h / 48);         // ~48px between horizontal grid lines
    return Math.min(7, Math.max(3, approx));
  }, [box.height, isPhone]);

  /* Nice ticks + padded domain */
  const { ticks, domain } = useMemo(() => {
    if (!clean.length) return { ticks: [0, 1], domain: [0, 1] as [number, number] };
    let min = Infinity, max = -Infinity;
    for (const p of clean) { const v = p.traffic; if (v < min) min = v; if (v > max) max = v; }
    return niceScaleInt(min, max, desiredTicks);
  }, [clean, desiredTicks]);

  /* Compact Y labels for large sites + auto width */
  const nfCompact = useMemo(
    () => new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }),
    []
  );
  const yAxisWidth = useMemo(() => {
    const maxVal = clean.length ? Math.max(...clean.map(d => d.traffic)) : 0;
    return maxVal >= 1_000_000 ? 64 : maxVal >= 10_000 ? 52 : (isPhone ? 30 : 44);
  }, [clean, isPhone]);

  const lineHex = activeTab === "weekly" ? "#5b7cfa" : "#22c55e";
  const gradId = `${uid}-trafficGradient-${activeTab}`;

  if (!clean.length) {
    return (
      <div
        ref={boxRef}
        className="w-full h-full min-h-[200px] rounded-xl bg-[color:var(--traffic-grid,rgba(0,0,0,0.06))]/20 flex items-center justify-center text-gray-500 dark:text-gray-400"
      >
        No traffic data available
      </div>
    );
  }

  /* Responsive chart cosmetics (kept) */
  const margin = isPhone
    ? { top: 8, right: 7, left: 8, bottom: 4 } // tighter on phones
    : { top: 12, right: 8, left: 8, bottom: 8 };

  const tickSize   = isPhone ? 10 : 12;
  const dotR       = isPhone ? 2  : 3;
  const activeDotR = isPhone ? 4  : 5;
  const strokeW    = isPhone ? 2  : 2.25;

  return (
    <div
      ref={boxRef}
      className="
        relative w-full h-full
        [--traffic-grid:rgba(0,0,0,0.06)] dark:[--traffic-grid:rgba(255,255,255,0.06)]
        [--traffic-axis:#334155] dark:[--traffic-axis:#cbd5e1]
        [--traffic-tip-bg:#ffffff] dark:[--traffic-tip-bg:#0f172a]
        [--traffic-tip-br:#e5e7eb] dark:[--traffic-tip-br:#334155]
        [--traffic-tip-fg:#0f172a] dark:[--traffic-tip-fg:#e2e8f0]
      "
      aria-label="Traffic chart"
    >
      {/* Latest label */}
      <div className="absolute right-2 top-0 text-[11px] text-gray-500 dark:text-gray-400">
        Latest: {latestValue.toLocaleString()} visitors
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={clean} margin={margin}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={lineHex} stopOpacity={0.25} />
              <stop offset="95%" stopColor={lineHex} stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--traffic-grid)" strokeDasharray="4 4" />

          <XAxis
            dataKey="date"
            stroke="var(--traffic-axis)"
            tick={{ fontSize: tickSize, fill: "var(--traffic-axis)" }}
            minTickGap={12}
            tickMargin={6}
            interval="preserveStartEnd"
          />

          <YAxis
            stroke="var(--traffic-axis)"
            tick={{ fontSize: tickSize, fill: "var(--traffic-axis)" }}
            allowDecimals={false}
            width={yAxisWidth}
            domain={domain}
            ticks={ticks}
            tickFormatter={(v) =>
              Math.abs(Number(v)) >= 10_000 ? nfCompact.format(Number(v)) : Number(v).toLocaleString()
            }
            label={{
              value: "Visitors",
              angle: -90,
              position: "insideLeft",
              offset: isPhone ? -4 : 10,
              fill: "var(--traffic-axis)",
              fontSize: tickSize,
            }}
          />

          <Tooltip
            wrapperStyle={{ fontSize: isPhone ? 11 : 12 }}
            formatter={(value: any) => [`${Number(value).toLocaleString()} visitors`, ""]}
            contentStyle={{
              backgroundColor: "var(--traffic-tip-bg)",
              borderColor: "var(--traffic-tip-br)",
              color: "var(--traffic-tip-fg)",
              borderRadius: 8,
            }}
          />

          <Area
            type="monotoneX"
            dataKey="traffic"
            stroke={lineHex}
            strokeWidth={strokeW}
            fill={`url(#${gradId})`}
            isAnimationActive={false}
            dot={{ r: dotR, fill: lineHex }}
            activeDot={{ r: activeDotR }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
