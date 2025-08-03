"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useMemo } from "react";

interface TrafficDataPoint {
  date: string; // or "day" depending on API schema
  traffic: number;
}

interface TrafficAreaChartProps {
  activeTab: "weekly" | "monthly";
  data: TrafficDataPoint[];
}

export default function TrafficAreaChart({ activeTab, data }: TrafficAreaChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  const latestValue = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data[data.length - 1].traffic;
  }, [data]);

  return (
    <div className="w-full h-[230px]">
      {/* Optional live value label */}
      <div className="text-[10px] text-right text-gray-500 dark:text-gray-400 mb-1 pr-1">
        Latest: {latestValue.toLocaleString()} visitors
      </div>

      {(!data || data.length === 0) ? (
        <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={isDark ? "#333" : "#eee"}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="date" // Change if your key is "day"
              stroke={isDark ? "#aaa" : "#555"}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke={isDark ? "#aaa" : "#555"}
              tick={{ fontSize: 12 }}
              label={{
                value: "Visitors",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: isDark ? "#aaa" : "#555",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
                borderColor: isDark ? "#333" : "#ccc",
                color: isDark ? "#eee" : "#111",
              }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#4F46E5"
              fillOpacity={1}
              fill="url(#trafficGradient)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
