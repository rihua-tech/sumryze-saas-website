"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BarChart3, FileText, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { ApexOptions } from "apexcharts"; // ✅ Add this

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function KPISection() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");

  const weeklyData = {
    seoScore: [72, 74, 75, 76, 77, 78],
    topPages: [3, 3, 4, 4, 5, 5],
    conversions: [3.9, 3.8, 3.6, 3.4, 3.3, 3.2],
    revenue: [8000, 8800, 9200, 9700, 10200, 10500],
  };

  const monthlyData = {
    seoScore: [65, 68, 70, 73, 74, 78],
    topPages: [2, 3, 3, 4, 4, 5],
    conversions: [4.1, 3.9, 3.8, 3.6, 3.5, 3.4],
    revenue: [9800, 10200, 10800, 11500, 12000, 12847],
  };

  const data = period === "weekly" ? weeklyData : monthlyData;

  

const chartConfig = (color: string): ApexOptions => ({
  chart: { type: "line", height: 60, sparkline: { enabled: true } },
  stroke: { width: 2, curve: "smooth" }, // ✅ Thicker sparkline
  colors: [color],
  tooltip: { enabled: false },
});


  const cards = [
    {
      title: "SEO Score",
      icon: <BarChart3 className="w-4 h-4 text-purple-500" />,
      value: "78/100",
      change: "+6",
      goal: "Target: 90+",
      color: "#8B5CF6",
      bg: "from-purple-100 via-white to-white",

      trend: data.seoScore,
    },
    {
      title: "Top Performing Pages",
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      value: "5",
      change: "+2",
      goal: "Goal: 8 Pages",
      color: "#3B82F6",
      bg: "from-blue-100 via-white to-white",
      trend: data.topPages,
    },
    {
      title: "Conversions",
      icon: <TrendingUp className="w-4 h-4 text-pink-500" />,
      value: "3.4%",
      change: "-1%",
      goal: "Industry Avg: 4%",
      color: "#EC4899",
      bg: "from-pink-100 via-white to-white",
      trend: data.conversions,
    },
    {
      title: "Revenue",
      icon: <DollarSign className="w-4 h-4 text-green-500" />,
      value: "$12,847",
      change: "+15%",
      goal: "Goal: $15K",
      color: "#10B981",
      bg: "from-green-100 via-white to-white",
      trend: data.revenue,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200">
      {/* Header with Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">
          Key Performance Metrics
        </h2>
        <div className="bg-gray-100 rounded-full flex p-1">
          {["weekly", "monthly"].map((p) => (
            <button
              key={p}
              className={`px-3 sm:px-4 py-1 text-sm rounded-full transition ${
                period === p
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setPeriod(p as "weekly" | "monthly")}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className={`bg-gradient-to-br ${card.bg} p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-2">
              {card.icon}
              <span className="text-sm font-medium">{card.title}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</h3>
            <p className="text-xs sm:text-sm">
              <span
                className={`${
                  card.change.startsWith("+") ? "text-green-600" : "text-red-500"
                }`}
              >
                {card.change}
              </span>{" "}
              <span className="text-gray-500">{card.goal}</span>
            </p>
            <div className="mt-2">
              <Chart
                options={chartConfig(card.color)}
                series={[{ data: card.trend }]}
                type="line"
                height={60}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
