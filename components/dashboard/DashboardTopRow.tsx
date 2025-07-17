"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  BarChart3,
  FileText,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Share2,
  Award,
  AlertTriangle
} from "lucide-react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardTopRow() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");

  const handleAskAI = async () => {
    setLoading(true);
    try {
      console.log("Fetching AI insights...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // KPI Data
  const weeklyData = {
    seoScore: [72, 74, 75, 76, 77, 78],
    topPages: [3, 3, 4, 4, 5, 5],
    conversions: [3.9, 3.8, 3.6, 3.4, 3.3, 3.2],
    revenue: [8000, 8800, 9200, 9700, 10200, 10500]
  };

  const monthlyData = {
    seoScore: [65, 68, 70, 73, 74, 78],
    topPages: [2, 3, 3, 4, 4, 5],
    conversions: [4.1, 3.9, 3.8, 3.6, 3.5, 3.4],
    revenue: [9800, 10200, 10800, 11500, 12000, 12847]
  };

  const data = period === "weekly" ? weeklyData : monthlyData;

  const chartConfig = (color: string, data: number[]) => ({
    chart: {
      type: "line",
      height: 60,
      sparkline: { enabled: true }
    },
    stroke: {
      width: 3, // Thicker line
      curve: "smooth"
    },
    colors: [color],
    series: [{ data }],
    tooltip: { enabled: false }
  });

  const cards = [
    {
      title: "SEO Score",
      icon: <BarChart3 className="w-4 h-4 text-purple-500" />,
      value: "78/100",
      change: "+6",
      goal: "Target: 90+",
      suggestion: "Improve LCP for better ranking.",
      color: "#8B5CF6",
      bg: "from-purple-50 to-white",
      trend: data.seoScore
    },
    {
      title: "Top Performing Pages",
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      value: "5",
      change: "+2",
      goal: "Goal: 8 Pages",
      suggestion: "Publish 3 more high-value pages.",
      color: "#3B82F6",
      bg: "from-blue-50 to-white",
      trend: data.topPages
    },
    {
      title: "Conversions",
      icon: <TrendingUp className="w-4 h-4 text-pink-500" />,
      value: "3.4%",
      change: "-1%",
      goal: "Industry Avg: 4%",
      suggestion: "Optimize CTA & forms.",
      color: "#EC4899",
      bg: "from-pink-50 to-white",
      trend: data.conversions
    },
    {
      title: "Revenue",
      icon: <DollarSign className="w-4 h-4 text-green-500" />,
      value: "$12,847",
      change: "+15%",
      goal: "Goal: $15K",
      suggestion: "Push retargeting campaigns.",
      color: "#10B981",
      bg: "from-green-50 to-white",
      trend: data.revenue
    }
  ];

  return (
    <div className="space-y-8">
      {/* ✅ AI Summary Section */}
      <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">AI Summary</h2>

          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              onClick={handleAskAI}
              disabled={loading}
              className={`text-xs font-medium flex items-center gap-1 px-4 py-2 rounded-xl transition shadow-md w-full sm:w-auto justify-center
                ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <>
                  <AutoAwesomeIcon fontSize="small" />
                  <span>Ask AI</span>
                </>
              )}
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 transition" title="Share Report">
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition" title="Refresh">
              <RefreshCw className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mb-5">
          Your SEO score improved by <span className="font-semibold">+6</span> this week. Traffic dropped <span className="text-red-500 font-semibold">12%</span> due to organic loss on 3 key pages. Focus on improving LCP to boost Core Web Vitals.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
            <Award className="w-4 h-4" /> +3 Wins
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-lg">
            <AlertTriangle className="w-4 h-4" /> 3 Warnings
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-lg">
            Traffic -12%
          </div>
        </div>
      </div>

      {/* ✅ KPI Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Key Performance Metrics</h2>
          <div className="bg-gray-100 rounded-full flex p-1">
            {["weekly", "monthly"].map((p) => (
              <button
                key={p}
                className={`px-4 py-1 text-sm rounded-full transition ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.bg} p-5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer`}
            >
              <div className="flex items-center gap-2 mb-3">{card.icon}<span className="text-gray-700 font-medium">{card.title}</span></div>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-sm">
                <span className={`font-medium ${card.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
                  {card.change}
                </span>{" "}
                <span className="text-gray-500">{card.goal}</span>
              </p>
              <div className="mt-3">
                <Chart
                  options={chartConfig(card.color, card.trend)}
                  series={[{ data: card.trend }]}
                  type="line"
                  height={60}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{card.suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
