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
import { useMemo } from "react";

type DataPoint = { day: string; count: number };

export default function KeywordLineChart({ data }: { data: DataPoint[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="keywordLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          stroke={isDark ? "#cbd5e1" : "#334155"}
          tick={{ fontSize: 12 }}
          tickMargin={6}
        />
        <YAxis
          stroke={isDark ? "#cbd5e1" : "#334155"}
          tick={{ fontSize: 12 }}
          width={36}
        />

        <Tooltip
          formatter={(v: any) => [v, "Keywords"]}
          labelFormatter={(l) => `Day: ${l}`}
          contentStyle={{
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            borderColor: isDark ? "#334155" : "#e5e7eb",
            color: isDark ? "#e2e8f0" : "#0f172a",
            borderRadius: 8,
          }}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
          fill="url(#keywordLineGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
