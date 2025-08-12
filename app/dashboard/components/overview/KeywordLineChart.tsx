"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useId, useMemo } from "react";

type DataPoint = { day: string; count: number };

export default function KeywordLineChart({ data }: { data: DataPoint[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  // Unique gradient id so multiple charts don't clash
  const gid = useId();

  // Clean/sanitize data
  const clean = useMemo<DataPoint[]>(
    () => (Array.isArray(data) ? data.map((d) => ({ day: String(d.day), count: Number(d.count) || 0 })) : []),
    [data]
  );

  const longSeries = clean.length > 40;

  if (clean.length < 2) {
    // Graceful tiny-placeholder state (keeps layout stable)
    return (
      <div className="w-full h-full rounded-xl" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)" }} />
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={clean} margin={{ top: 8, right: 16, left: 6, bottom: 6 }}>
        <defs>
          <linearGradient id={`kw-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          stroke={isDark ? "#cbd5e1" : "#334155"}
          tick={{ fontSize: 12 }}
          minTickGap={12}
          tickMargin={6}
        />
        <YAxis
          stroke={isDark ? "#cbd5e1" : "#334155"}
          tick={{ fontSize: 12 }}
          allowDecimals={false}
          width={40}
        />

        <Tooltip
          formatter={(v: any) => [Number(v).toLocaleString(), "Keywords"]}
          labelFormatter={(l) => `Day: ${l}`}
          contentStyle={{
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e5e7eb",
            color: isDark ? "#e2e8f0" : "#0f172a",
            borderRadius: 8,
          }}
        />

        <Line
          type="monotoneX"
          dataKey="count"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={longSeries ? false : { r: 3 }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
          // Recharts <Line> doesn't render area; if you want the gradient under the line,
          // consider switching to <AreaChart>. Keeping gradient here for future swap.
          // fill={`url(#kw-${gid})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
