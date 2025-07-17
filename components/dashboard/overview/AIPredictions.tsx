"use client";

import React from "react";
import Chart from "react-apexcharts";
import { TrendingUp, Users, MousePointerClick } from "lucide-react";

export default function AIPredictions() {
  const forecastValue = "+22%";
  const forecastLabel = "Traffic Growth (Next 30 Days)";

  // ✅ Chart Configuration
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.8,
        gradientToColors: ["#ffffff"],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: ["#4f46e5"], // Indigo (brand color)
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: "Traffic",
      data: [12000, 13500, 14000, 15000, 16000, 17000, 18500],
    },
  ];

  const metrics = [
    {
      icon: <Users className="w-4 h-4 text-indigo-600" />,
      label: "Predicted Visitors",
      value: "18,500",
      valueColor: "text-gray-800",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
      label: "Leads Growth",
      value: "+320",
      valueColor: "text-green-600",
    },
    {
      icon: <MousePointerClick className="w-4 h-4 text-blue-600" />,
      label: "CTR Improvement",
      value: "+1.5%",
      valueColor: "text-blue-600",
    },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-10">AI Predictions</h3>

      {/* Highlight */}
      <div className="text-center mb-4">
        <p className="text-xl font-bold text-green-600">{forecastValue}</p>
        <p className="text-xs text-gray-500">{forecastLabel}</p>
      </div>

      {/* Chart */}
      <div className="mb-5">
        <Chart options={chartOptions} series={chartSeries} type="area" height={110} />
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              {m.icon}
              {m.label}
            </div>
            <span className={`font-semibold ${m.valueColor}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
