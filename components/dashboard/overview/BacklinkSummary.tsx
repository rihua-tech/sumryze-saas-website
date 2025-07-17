"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function BacklinkSummary() {
  const totalBacklinks = 1250;
  const referringDomains = 320;
  const trendPercent = 8; // Growth %
  const newBacklinks = 100; // Example new backlinks
  const avgDA = 62; // Example average Domain Authority

  // DoFollow vs NoFollow data
  const doFollow = 950;
  const noFollow = 300;

  // Sparkline data for trend
  const trendSeries = [
    {
      name: "Backlinks",
      data: [900, 940, 980, 1020, 1100, 1180, 1250], // 7-day trend
    },
  ];

  const sparklineOptions: ApexCharts.ApexOptions = {
    chart: { type: "line", sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: { shade: "light", type: "vertical", stops: [0, 100] },
    },
    colors: [trendPercent >= 0 ? "#10B981" : "#EF4444"], // green or red
    tooltip: { y: { formatter: (val: number) => `${val} backlinks` } },
  };

  // Donut chart for DoFollow vs NoFollow
  const donutSeries = [doFollow, noFollow];
  const donutOptions: ApexCharts.ApexOptions = {
    chart: { type: "donut" },
    labels: ["DoFollow", "NoFollow"],
    colors: ["#10B981", "#9CA3AF"], // Green & Gray
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val: number) => `${val.toLocaleString()} links` } },
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h3 className="text-lg font-semibold text-gray-900">Backlink Summary</h3>
        <select className="text-xs border border-gray-300 rounded-md px-2 py-1 text-gray-600">
          <option>Last 90 Days</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      {/* KPI Section */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-3xl font-bold text-gray-900">{totalBacklinks.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Backlinks</p>
        </div>
        <div className="text-right">
          <p
            className={`text-sm font-semibold flex items-center gap-1 ${
              trendPercent >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {trendPercent >= 0 ? "▲" : "▼"} {trendPercent}%{" "}
            <span className="text-gray-500 text-xs">( +{newBacklinks} links )</span>
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <p className="text-xs text-gray-600">Referring Domains: {referringDomains}</p>
      <p className="text-xs text-gray-600">Average DA: {avgDA}</p>

      {/* DoFollow vs NoFollow Mini Chart */}
      <div className="flex items-center gap-4">
        <div className="w-24">
          <Chart options={donutOptions} series={donutSeries} type="donut" height={120} />
        </div>
        <div className="text-xs text-gray-600">
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

      {/* Top Anchor & Domain */}
      <div className="text-xs text-gray-600 mt-2">
        <p>
          Top Anchor:{" "}
          <a href="#" className="text-indigo-600 font-semibold hover:underline">
            "SEO Tools"
          </a>{" "}
          (15%)
        </p>
        <p>
          Top Domain:{" "}
          <a href="#" className="text-indigo-600 font-semibold hover:underline">
            example.com
          </a>{" "}
          (DA 85)
        </p>
      </div>

      {/* Sparkline Trend */}
      <div>
        <Chart options={sparklineOptions} series={trendSeries} type="line" height={80} />
      </div>
    </div>
  );
}
