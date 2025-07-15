"use client";

import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function TopPagesChart() {
  const pageNames = ["Homepage", "/product", "/blog/seo-guide"];
  const pageVisits = [4500, 3100, 2700];
  const totalVisits = pageVisits.reduce((a, b) => a + b, 0);

  const [series] = useState([
    {
      name: "Visits",
      data: pageVisits,
    },
  ]);

  const [options] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false },
      height: 260,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: "55%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number, opts: any) => {
        const percentage = ((val / totalVisits) * 100).toFixed(1);
        return `${val.toLocaleString()} visits • ${percentage}%`;
      },
      style: {
        colors: ["#fff"],
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    xaxis: {
      categories: pageNames,
      labels: {
        style: {
          fontSize: "13px",
          colors: "#6b7280", // Tailwind gray-500
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
          colors: "#6b7280",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} visits`,
      },
    },
    colors: ["#6366f1", "#3b82f6", "#10b981"], // Indigo, Blue, Green
    grid: {
      strokeDashArray: 4,
      borderColor: "#E5E7EB", // Tailwind gray-200
    },
    legend: {
      show: false, // Removed for cleaner UI
    },
  });

  return (
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-900 mb-3">Top Pages</h3>
      <Chart options={options} series={series} type="bar" height={260} />
    </div>
  );
}
