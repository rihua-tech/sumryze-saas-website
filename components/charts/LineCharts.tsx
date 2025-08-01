// components/charts/LineChart.tsx
"use client";
import Chart from "react-apexcharts";

export default function LineChart({ title }: { title?: string }) {
  const options = {
    chart: { id: "line" },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  };
  const series = [{ name: "Traffic", data: [30, 40, 45, 50, 49] }];

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-white">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <Chart options={options} series={series} type="line" width="100%" height={250} />
    </div>
  );
}

