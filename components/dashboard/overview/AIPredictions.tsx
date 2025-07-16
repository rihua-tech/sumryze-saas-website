"use client";

import React from "react";
import Chart from "react-apexcharts";
import { TrendingUp, Users, MousePointerClick } from "lucide-react";

export default function AIPredictions() {
  const forecastValue = "+22%";
  const forecastLabel = "Traffic Growth (Next 30 Days)";

  // ✅ Forecast chart data
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    colors: ["#4f46e5"], // Indigo color
    tooltip: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      name: "Traffic",
      data: [12000, 13500, 14000, 15000, 16000, 17000, 18500], // Forecast data
    },
  ];

  const metrics = [
    {
      icon: <Users className="w-4 h-4 text-indigo-600" />,
      label: "Predicted Visitors",
      value: "18,500",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
      label: "Leads Growth",
      value: "+320",
    },
    {
      icon: <MousePointerClick className="w-4 h-4 text-blue-600" />,
      label: "CTR Improvement",
      value: "+1.5%",
    },
  ];

  return (
    <div className="p-5">
      {/* Title */}
      <h3 className="text-base font-semibold text-gray-800 mb-8">
        AI Predictions
      </h3>

      {/* Main Highlight */}
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-green-600">{forecastValue}</p>
        <p className="text-xs text-gray-500">{forecastLabel}</p>
      </div>

      {/* Forecast Chart */}
      <div className="mb-5">
        <Chart options={chartOptions} series={chartSeries} type="area" height={100} />
      </div>

      {/* Key Metrics */}
      <div className="space-y-3 mb-4">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              {m.icon}
              {m.label}
            </div>
            <span className="font-semibold text-gray-800">{m.value}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="#"
          className="text-xs font-medium text-indigo-600 hover:underline"
        >
          View Full Forecast →
        </a>
      </div>
    </div>
  );
}
