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

const weeklyData = [
  { day: "Mon", traffic: 3400 },
  { day: "Tue", traffic: 4200 },
  { day: "Wed", traffic: 5100 },
  { day: "Thu", traffic: 4800 },
  { day: "Fri", traffic: 6100 },
  { day: "Sat", traffic: 6900 },
  { day: "Sun", traffic: 7500 },
];

const monthlyData = [
  { day: "Jan", traffic: 3200 },
  { day: "Feb", traffic: 3800 },
  { day: "Mar", traffic: 4200 },
  { day: "Apr", traffic: 5000 },
  { day: "May", traffic: 5600 },
  { day: "Jun", traffic: 6100 },
  { day: "Jul", traffic: 7400 },
  { day: "Aug", traffic: 8100 },
  { day: "Sep", traffic: 8600 },
  { day: "Oct", traffic: 9200 },
  { day: "Nov", traffic: 9700 },
  { day: "Dec", traffic: 10200 },
];

export default function TrafficAreaChart({
  activeTab,
}: {
  activeTab: "weekly" | "monthly";
}) {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  const data = activeTab === "weekly" ? weeklyData : monthlyData;
  const latestValue = data.length ? data[data.length - 1].traffic : 0;

  return (
    <div className="w-full h-[230px]">
      {/* Optional live value label */}
      <div className="text-[10px] text-right text-gray-500 dark:text-gray-400 mb-1 pr-1">
        Latest: {latestValue.toLocaleString()} visitors
      </div>

      {data.length === 0 ? (
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
              dataKey="day"
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
