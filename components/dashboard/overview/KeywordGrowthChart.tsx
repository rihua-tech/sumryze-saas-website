"use client";

import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


export default function KeywordGrowthChart() {
  const [series] = useState([
    {
      name: "Keywords",
      data: [120, 135, 160, 155, 180, 200, 240], // Example data
    },
  ]);

 
 const [options] = useState<ApexOptions>({
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#3b82f6"], // Tailwind Blue-500
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
            color: "#3b82f6",
            opacity: 0.3,
          },
          {
            offset: 100,
            color: "#3b82f6",
            opacity: 0,
          },
        ],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#4B5563", // Tailwind gray-600
          fontSize: "13px",
        },
      },
      axisBorder: {
        color: "#e5e7eb", // Tailwind gray-200
      },
    },
    
    yaxis: {
  forceNiceScale: true,
  tickAmount: 6,
  labels: {
    formatter: (val: number) => val.toFixed(0),
    style: {
      fontSize: "13px",
      colors: "#6b7280",
    },
  },
},


    grid: {
      borderColor: "#e5e7eb", // Tailwind gray-200
      strokeDashArray: 4,
    },
    markers: {
      size: 5,
      colors: ["#3b82f6"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { sizeOffset: 3 },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => `${val} keywords`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Keyword Growth</h3>
      <Chart options={options} series={series} type="area" height={260} />
    </div>
  );
}
