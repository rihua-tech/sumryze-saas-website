"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function BacklinkSummary() {
  const totalBacklinks = 1250; // Example total backlinks
  const referringDomains = 320;
  const trend = 8; // Positive percentage change

  const series = [
    {
      name: "Backlinks",
      data: [900, 940, 980, 1020, 1100, 1180, 1250], // 7-day trend
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        stops: [0, 100],
      },
    },
    grid: {
      padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    colors: [trend >= 0 ? "#10B981" : "#EF4444"], // Green for positive, red for negative
    tooltip: {
      x: { show: true },
      y: {
        formatter: (val: number) => `${val} backlinks`,
      },
    },
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Title */}
      <h3 className="text-sm font-semibold mb-10 text-gray-800">Backlink Summary</h3>

      {/* KPI Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {totalBacklinks.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Total Backlinks</p>
        </div>
        <div className={`text-sm font-semibold ${trend >= 0 ? "text-green-600" : "text-red-500"}`}>
          {trend >= 0 ? "▲" : "▼"} {trend}% <span className="text-gray-500 text-xs">vs last 7 days</span>
        </div>
      </div>

      {/* Secondary Metric */}
      <p className="text-xs text-gray-600">Referring Domains: {referringDomains.toLocaleString()}</p>

      {/* Sparkline Chart */}
      <Chart options={options} series={series} type="line" height={80} />
    </div>
  );
}
