"use client";

import React, { useState } from "react";
import Chart from "react-apexcharts";

const TrafficChart = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const weeklyData = {
    name: "Avg Traffic",
    data: [3400, 4200, 5100, 4800, 6100, 6900, 7500],
  };

  const monthlyData = {
    name: "Avg Traffic",
    data: [3200, 3800, 4200, 5000, 5600, 6100, 7400, 8100, 8600, 9200, 9700, 10200],
  };

  const categories = activeTab === "weekly"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const series = [
    {
      name: activeTab === "weekly" ? "Avg Traffic" : "Monthly Avg Traffic",
      data: activeTab === "weekly" ? weeklyData.data : monthlyData.data,
    },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#6366f1"], // Sumryze Indigo
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#6366f1",
            opacity: 0.3,
          },
          {
            offset: 100,
            color: "#6366f1",
            opacity: 0,
          },
        ],
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#4B5563", // Tailwind slate-600
          fontSize: "13px",
        },
      },
    },
   
    
    
    yaxis: {
  forceNiceScale: true,
  tickAmount: 6,
  labels: {
    formatter: (val: number) => `${Math.round(val / 1000)}k`,
    style: {
      fontSize: "13px",
      colors: "#4B5563", // Tailwind slate-600
    },
  },
},

    tooltip: {
      shared: true,
      intersect: false,
      x: { show: true },
      style: {
        fontSize: "13px",
      },
    },
    markers: {
      size: 4,
      colors: ["#6366f1"],
      strokeWidth: 2,
      strokeColors: "#fff",
      hover: { sizeOffset: 4 },
    },
    grid: {
      strokeDashArray: 4,
      borderColor: "#E5E7EB", // Tailwind gray-200
    },
  };

  return (

<div className="p-4">
  {/* Title and Toggle aligned in one row */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
    {/* Left: Title */}
    <h3 className="text-md font-semibold text-gray-900">Traffic Overview</h3>

    {/* Right: Toggle */}
    <div className="flex gap-2 text-sm justify-end mt-2 sm:mt-0">
      <button
        onClick={() => setActiveTab("weekly")}
        className={`px-3 py-1 rounded-full transition ${
          activeTab === "weekly"
            ? "bg-indigo-100 text-indigo-600 font-semibold"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        Weekly
      </button>
      <button
        onClick={() => setActiveTab("monthly")}
        className={`px-3 py-1 rounded-full transition ${
          activeTab === "monthly"
            ? "bg-indigo-100 text-indigo-600 font-semibold"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        Monthly
      </button>
    </div>
  </div>

  <Chart options={options} series={series} type="area" height={260} />
</div>


   
  );

};

export default TrafficChart;
