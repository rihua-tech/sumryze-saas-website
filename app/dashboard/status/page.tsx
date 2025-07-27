"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function StatusPage() {
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/data/status.json");
        if (!res.ok) throw new Error("Failed to load status");
        const json = await res.json();
        setStatusData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-300">
        Loading system status...
      </div>
    );
  }

  if (!statusData) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Unable to load status data.
      </div>
    );
  }

  const { systemStatus, services, uptimeHistory, recentIncidents } = statusData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        System Status
      </h1>

      {/* Status Banner */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <p
            className={`font-semibold ${
              systemStatus.status === "operational"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {systemStatus.message}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date(systemStatus.lastUpdated).toLocaleString()}
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
            SLA: 99.9% Uptime Guarantee
          </span>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-green-500 text-xl font-bold">99.96%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overall Uptime
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-blue-500 text-xl font-bold">245ms</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg Response
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-yellow-500 text-xl font-bold">1</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Incidents (30d)
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-red-500 text-xl font-bold">12m</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Downtime
          </p>
        </div>
      </div>

      {/* Uptime History */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Uptime History
        </h2>
        <div className="w-full" style={{ height: "220px" }}>
          <Line
            data={{
              labels: uptimeHistory.labels,
              datasets: [
                {
                  label: "Uptime (%)",
                  data: uptimeHistory.data,
                  borderColor: "#6366F1",
                  backgroundColor: "rgba(99,102,241,0.2)",
                  tension: 0.4,
                  pointRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  min: 99.7,
                  max: 100,
                  ticks: { color: "#9CA3AF" },
                },
                x: {
                  ticks: { color: "#9CA3AF" },
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Services
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2">Service</th>
                <th>Status</th>
                <th>Uptime</th>
                <th>Response Time</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s: any, i: number) => (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2">{s.name}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        s.status === "operational"
                          ? "bg-green-500/20 text-green-500"
                          : s.status === "partial"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>{s.uptime}</td>
                  <td>{s.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-3">
          {services.map((s: any, i: number) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{s.name}</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    s.status === "operational"
                      ? "bg-green-500/20 text-green-500"
                      : s.status === "partial"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                Uptime: {s.uptime} | Response: {s.responseTime}
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Recent Incidents */}
<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-5 shadow">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Recent Incidents
  </h2>
  {recentIncidents.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400 text-sm">
      No incidents reported.
    </p>
  ) : (
    <div className="space-y-4">
      {recentIncidents.map((incident: any) => (
        <div
          key={incident.id}
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all bg-white dark:bg-gray-900"
        >
          {/* Header Row */}
          <div className="flex flex-wrap justify-between items-center mb-2">
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">
              {incident.title}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                incident.severity === "minor"
                  ? "bg-yellow-500/20 text-yellow-600"
                  : incident.severity === "major"
                  ? "bg-red-500/20 text-red-600"
                  : "bg-green-500/20 text-green-600"
              }`}
            >
              {incident.severity}
            </span>
          </div>

          {/* Meta Info */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="font-medium">Status:</span> {incident.status} •{" "}
            <span className="font-medium">Started:</span>{" "}
            {new Date(incident.startTime).toLocaleString()}
          </p>

          {/* Timeline */}
          <div className="border-l border-gray-300 dark:border-gray-600 pl-4 space-y-3">
            {incident.updates.map((u: any, idx: number) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[9px] w-2 h-2 rounded-full bg-indigo-500"></span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(u.time).toLocaleString()}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
                  {u.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  );
}
