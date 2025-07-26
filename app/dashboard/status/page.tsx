"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CheckCircle, Clock } from "lucide-react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// ✅ TypeScript Types for JSON Data
interface Service {
  name: string;
  status: string;
  uptime: string;
  responseTime: string;
}

interface IncidentUpdate {
  time: string;
  message: string;
}

interface Incident {
  id: number;
  title: string;
  status: string;
  severity: string;
  startTime: string;
  updates: IncidentUpdate[];
}

interface StatusData {
  systemStatus: {
    status: string;
    message: string;
    lastUpdated: string;
  };
  services: Service[];
  uptimeHistory: {
    labels: string[];
    data: number[];
  };
  recentIncidents: Incident[];
  kpis?: {
    uptime: string;
    avgResponse: string;
    incidents: string;
    downtime: string;
  };
}

export default function StatusPage() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/status.json");
        if (!res.ok) throw new Error("Failed to load status data");
        const json = await res.json();

        // ✅ Basic Validation
        if (!json.systemStatus || !json.services) {
          throw new Error("Invalid status data format");
        }

        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "maintenance":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "partial":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "outage":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
        Loading system status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const { systemStatus, services, uptimeHistory, recentIncidents, kpis } = data;

  const uptimeData = {
    labels: uptimeHistory?.labels || [],
    datasets: [
      {
        label: "Uptime %",
        data: uptimeHistory?.data || [],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const uptimeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: 99.8,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main className="flex-1 pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* ✅ Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              System Status
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time performance & uptime monitoring for Sumryze services
            </p>
          </div>

          {/* ✅ Overall Status */}
          <div
            className={`flex flex-col md:flex-row items-center justify-center gap-4 p-6 rounded-xl border-2 ${
              systemStatus.status === "operational"
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30"
                : ""
            }`}
          >
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {systemStatus.message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(systemStatus.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>

          {/* ✅ KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-green-500 text-2xl font-bold">{kpis?.uptime || "99.96%"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overall Uptime</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-blue-500 text-2xl font-bold">{kpis?.avgResponse || "245ms"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Response</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-yellow-500 text-2xl font-bold">{kpis?.incidents || "3"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Incidents (30d)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-red-500 text-2xl font-bold">{kpis?.downtime || "12m"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Downtime</p>
            </div>
          </div>

          {/* ✅ Services Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Services Status
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Uptime
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Response Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {services && services.length > 0 ? (
                    services.map((service, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">{service.name}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                              service.status
                            )}`}
                          >
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{service.uptime}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {service.responseTime}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No services data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ Uptime Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm h-80">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Uptime History
            </h3>
            <Line data={uptimeData} options={uptimeOptions} />
          </div>

          {/* ✅ Recent Incidents */}
          {recentIncidents && recentIncidents.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Incidents</h3>
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{incident.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Started: {new Date(incident.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {incident.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {incident.severity}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3">
                    {incident.updates.map((update, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {new Date(update.time).toLocaleString()}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
