// components/charts/DonutChart.tsx
"use client";
import Chart from "react-apexcharts";

export default function DonutChart({ title }: { title?: string }) {
  const options = {
    labels: ["Organic", "Paid", "Social", "Referral", "Email"],
  };
  const series = [45, 25, 15, 10, 5];

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl text-white">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <Chart options={options} series={series} type="donut" width="100%" height={250} />
    </div>
  );
}
