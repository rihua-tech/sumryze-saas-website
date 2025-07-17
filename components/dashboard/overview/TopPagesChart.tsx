"use client";

import React from "react";
import Chart from "react-apexcharts";

interface TopPage {
  url: string;
  visits: number;
  percent: number;
  trend: number; // positive or negative %
}

export default function TopPagesChart() {
  const topPages: TopPage[] = [
    { url: "/homepage", visits: 4500, percent: 43.7, trend: 12 },
    { url: "/product", visits: 3100, percent: 30.1, trend: -3 },
    { url: "/blog/seo-guide", visits: 2700, percent: 26.2, trend: 5 },
  ];

  const categories = topPages.map((p) => truncatePath(p.url));
  const values = topPages.map((p) => p.visits);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "60%",
      },
    },
    colors: ["#8B5CF6", "#3B82F6", "#10B981"],
    dataLabels: {
      enabled: true,
      formatter: (val: number, opts) => {
        const percent = topPages[opts.dataPointIndex].percent;
        return `${val.toLocaleString()} • ${percent}%`;
      },
      style: {
        fontSize: "13px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories,
      labels: {
        style: { fontSize: "12px" },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number, opts) => {
          const page = topPages[opts.dataPointIndex];
          return `${page.url} - ${val.toLocaleString()} visits (${page.percent}%)`;
        },
      },
    },
    grid: {
      strokeDashArray: 4,
    },
    legend: { show: false }, // ✅ Removed unnecessary legend
  };

  const series = [{ name: "Visits", data: values }];

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>

      {/* ApexChart */}
      <Chart options={options} series={series} type="bar" height={250} />

      {/* Table below the chart */}
      <div className="mt-4 space-y-3">
        {topPages.map((page) => (
          <div
            key={page.url}
            className="flex items-center justify-between text-sm border-b pb-2 last:border-none"
          >
            {/* URL with icon */}
            <div className="flex items-center gap-2">
              <span className="text-lg">🔗</span>
              <a
                href={page.url}
                className="text-indigo-600 font-medium hover:underline"
                title={page.url}
              >
                {page.url}
              </a>
            </div>

            {/* Visits & Trend */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-semibold">
                {page.visits.toLocaleString()} ({page.percent}%)
              </span>
              <span
                className={`font-semibold ${
                  page.trend > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {page.trend > 0 ? "▲" : "▼"} {Math.abs(page.trend)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Helper: Truncate URL if too long
function truncatePath(url: string): string {
  if (url.length > 18) {
    return url.slice(0, 15) + "...";
  }
  return url;
}
