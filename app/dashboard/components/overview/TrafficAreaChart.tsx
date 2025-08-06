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

type TabType = "weekly" | "monthly";

interface TrafficDataPoint {
  date: string;
  traffic: number;
}

export default function TrafficAreaChart({
  activeTab,
  data,
}: {
  activeTab: TabType;
  data: TrafficDataPoint[];
}) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  const latestValue = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data[data.length - 1].traffic;
  }, [data]);

  return (
    <div className="w-full h-[230px] relative">
      {/* ✅ Latest visitors label */}
      <div className="text-[11px] text-right text-gray-500 dark:text-gray-400 mb-1 pr-1">
        Latest: {latestValue.toLocaleString()} visitors
      </div>

      {(!data || data.length === 0) ? (
        <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
          No traffic data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            {/* ✅ Gradient Fill */}
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={activeTab === "weekly" ? "#3b82f6" : "#10b981"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={activeTab === "weekly" ? "#3b82f6" : "#10b981"}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            {/* ✅ Dashed Grid */}
            <CartesianGrid
              stroke={isDark ? "#333" : "#eee"}
              strokeDasharray="4 4"
            />

            {/* ✅ X Axis */}
            <XAxis
              dataKey="date"
              stroke={isDark ? "#aaa" : "#555"}
              tick={{ fontSize: 12 }}
            />

            {/* ✅ Y Axis with 'Visitors' label */}
            <YAxis
              stroke={isDark ? "#aaa" : "#555"}
              tick={{ fontSize: 12 }}
              tickFormatter={(val) => val.toLocaleString()}
              label={{
                value: "Visitors",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: isDark ? "#aaa" : "#555",
                fontSize: 12,
              }}
            />

            {/* ✅ Tooltip */}
            <Tooltip
              formatter={(value: number) =>
                `${value.toLocaleString()} visitors`
              }
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#fff",
                borderColor: isDark ? "#475569" : "#ccc",
                color: isDark ? "#f1f5f9" : "#111",
                fontSize: "12px",
              }}
            />

            {/* ✅ Area line */}
            <Area
              type="monotone"
              dataKey="traffic"
              stroke={activeTab === "weekly" ? "#3b82f6" : "#10b981"}
              strokeWidth={2}
              fill="url(#trafficGradient)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
