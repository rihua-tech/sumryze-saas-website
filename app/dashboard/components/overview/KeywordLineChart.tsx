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

// Define type of data expected
type DataPoint = {
  day: string;
  count: number;
};

export default function KeywordLineChart({ data }: { data: DataPoint[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="keywordLineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke={isDark ? "#333" : "#eee"} strokeDasharray="3 3" />
        <XAxis dataKey="day" stroke={isDark ? "#aaa" : "#555"} tick={{ fontSize: 12 }} />
        <YAxis stroke={isDark ? "#aaa" : "#555"} tick={{ fontSize: 12 }} />

        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
            borderColor: isDark ? "#333" : "#ccc",
            color: isDark ? "#eee" : "#111",
          }}
        />

        <Line
          type="monotone"
          dataKey="count"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          fill="url(#keywordLineGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
