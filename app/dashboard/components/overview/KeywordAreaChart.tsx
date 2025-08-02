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
import { useMemo, useState } from "react";

type KeywordDataPoint = {
  day: string;
  count: number;
};

const weeklyData: KeywordDataPoint[] = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 135 },
  { day: "Wed", count: 160 },
  { day: "Thu", count: 155 },
  { day: "Fri", count: 180 },
  { day: "Sat", count: 200 },
  { day: "Sun", count: 240 },
];

const monthlyData: KeywordDataPoint[] = [
  { day: "Jan", count: 420 },
  { day: "Feb", count: 480 },
  { day: "Mar", count: 520 },
  { day: "Apr", count: 600 },
  { day: "May", count: 680 },
  { day: "Jun", count: 750 },
  { day: "Jul", count: 830 },
  { day: "Aug", count: 910 },
  { day: "Sep", count: 980 },
  { day: "Oct", count: 1020 },
  { day: "Nov", count: 1100 },
  { day: "Dec", count: 1170 },
];

export default function KeywordGrowthCard() {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  const data = activeTab === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-[#111827] dark:bg-[#1f2937] rounded-xl p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white text-md md:text-lg font-semibold">
          Keyword Growth
        </h2>
        <div className="flex gap-2 text-sm">
          {["weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "weekly" | "monthly")}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[250px]">
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
      </div>
    </div>
  );
}
