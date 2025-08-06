"use client";

import dynamic from "next/dynamic";

// ✅ Fix: Load Chart client-side only
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AIPredictionsChart({ data }: { data: number[] }) {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.6,
        gradientToColors: ["#6366f1"],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    colors: ["#6366f1"],
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val.toLocaleString()} Visitors`,
      },
    },
    markers: { size: 0, hover: { size: 5 } },
  };

  const series = [{ name: "Traffic", data }];

  return <Chart options={chartOptions} series={series} type="area" height={130} />;
}
