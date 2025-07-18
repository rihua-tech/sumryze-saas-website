"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function BacklinkSummary() {
  const totalBacklinks = 1250;
  const referringDomains = 320;
  const trendPercent = 8;
  const newBacklinks = 100;
  const avgDA = 62;

  const doFollow = 950;
  const noFollow = 300;

  const trendSeries = [
    { name: "Backlinks", data: [900, 940, 980, 1020, 1100, 1180, 1250] },
  ];

  const sparklineOptions: ApexCharts.ApexOptions = {
    chart: { type: "line", sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: { shade: "light", type: "vertical", stops: [0, 100] },
    },
    colors: [trendPercent >= 0 ? "#10B981" : "#EF4444"],
    tooltip: { y: { formatter: (val: number) => `${val} backlinks` } },
  };

  const donutSeries = [doFollow, noFollow];
  const donutOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: ["DoFollow", "NoFollow"],
    colors: ["#10B981", "#9CA3AF"],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val: number) => `${val.toLocaleString()} links` } },
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between mb-8 items-center">
        <h3 className="text-lg font-semibold text-gray-900">Backlink Summary</h3>
        <select className="text-xs border border-gray-300 rounded-md px-2 py-1 text-gray-600">
          <option>Last 90 Days</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      {/* KPI Section - Left: Number + Label, Right: Growth */}
      <div className="flex justify-between items-center">
        <div className="flex items-baseline">
          <p className="text-3xl font-bold text-gray-900">{totalBacklinks.toLocaleString()}</p>
          <span className="text-gray-400 text-sm ml-2">Total</span>
        </div>
        <div
          className={`text-sm font-medium ${
            trendPercent >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {trendPercent >= 0 ? "▲" : "▼"} {trendPercent}%{" "}
          <span className="text-gray-500 text-xs">( +{newBacklinks} links )</span>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="flex justify-center gap-8 text-xs text-gray-600">
        <p>Referring Domains: {referringDomains}</p>
        <p>Average DA: {avgDA}</p>
      </div>

      {/* DoFollow vs NoFollow */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-2">
        <div className="w-28">
          <Chart options={donutOptions} series={donutSeries} type="donut" height={120} />
        </div>
        <div className="text-xs text-gray-600 text-center sm:text-left">
          <p>
            <span className="text-green-600 font-medium">● DoFollow:</span>{" "}
            {doFollow.toLocaleString()} ({((doFollow / totalBacklinks) * 100).toFixed(1)}%)
          </p>
          <p>
            <span className="text-gray-500 font-medium">● NoFollow:</span>{" "}
            {noFollow.toLocaleString()} ({((noFollow / totalBacklinks) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-1 text-center sm:text-left">Growth Trend</p>
        <Chart options={sparklineOptions} series={trendSeries} type="line" height={80} />
      </div>
    </div>
  );
}
