"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity, Bell, Calendar, ExternalLink } from "lucide-react"
import Header from "../dashboard/components/header"
import Footer from "../dashboard/components/footer"

export default function StatusPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")

  // Overall system status
  const systemStatus = {
    status: "operational", // operational, partial, outage
    message: "All systems operational",
    lastUpdated: "2024-01-18T14:30:00Z",
  }

  // Individual services
  const services = [
    {
      name: "Dashboard",
      description: "Main application dashboard and user interface",
      status: "operational",
      uptime: "99.98%",
      responseTime: "245ms",
      lastIncident: null,
    },
    {
      name: "API",
      description: "REST API endpoints and data access",
      status: "operational",
      uptime: "99.95%",
      responseTime: "180ms",
      lastIncident: "2024-01-15T09:15:00Z",
    },
    {
      name: "Reports",
      description: "SEO report generation and analytics",
      status: "partial",
      uptime: "99.87%",
      responseTime: "520ms",
      lastIncident: "2024-01-18T12:45:00Z",
    },
    {
      name: "Authentication",
      description: "User login and session management",
      status: "operational",
      uptime: "99.99%",
      responseTime: "95ms",
      lastIncident: null,
    },
    {
      name: "Data Processing",
      description: "Background data collection and processing",
      status: "operational",
      uptime: "99.92%",
      responseTime: "1.2s",
      lastIncident: "2024-01-16T18:30:00Z",
    },
  ]

  // Recent incidents
  const recentIncidents = [
    {
      id: 1,
      title: "Intermittent report generation delays",
      status: "investigating",
      severity: "minor",
      startTime: "2024-01-18T12:45:00Z",
      description: "Some users may experience slower report generation times. We are investigating the issue.",
      updates: [
        {
          time: "2024-01-18T14:30:00Z",
          message: "We have identified the root cause and are implementing a fix.",
        },
        {
          time: "2024-01-18T13:15:00Z",
          message: "Investigation ongoing. Report generation may take up to 2x longer than usual.",
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
      case "partial":
        return "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30"
      case "outage":
        return "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
      default:
        return "text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "partial":
        return "Partial Outage"
      case "outage":
        return "Major Outage"
      default:
        return "Unknown"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const timeframeOptions = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className="flex-1 pt-16 transition-colors">
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">System Status</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Real-time status and performance monitoring for all Sumryze services
                </p>
              </div>

              {/* Overall Status Indicator */}
              <div className="max-w-2xl mx-auto">
                <div
                  className={`flex items-center justify-center gap-4 p-6 rounded-xl border-2 ${
                    systemStatus.status === "operational"
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30"
                      : systemStatus.status === "partial"
                        ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30"
                        : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30"
                  }`}
                >
                  {getStatusIcon(systemStatus.status)}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{systemStatus.message}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Last updated: {formatDate(systemStatus.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Status Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Service Status</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Uptime (30d)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Response Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Incident
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {services.map((service, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{service.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}
                            >
                              {getStatusText(service.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{service.uptime}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">{service.responseTime}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {service.lastIncident ? formatDate(service.lastIncident) : "No recent incidents"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Uptime Graph */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Uptime History</h3>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  {timeframeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTimeframe(option.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        selectedTimeframe === option.value
                          ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Uptime Graph Placeholder */}
              <div className="chart-placeholder h-64 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center border border-green-100 dark:border-green-800/30 hover:border-green-200 dark:hover:border-green-700/50 transition-all duration-200 group">
                <div className="text-center">
                  <Activity className="h-16 w-16 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">Uptime Chart Placeholder</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Interactive uptime visualization for{" "}
                    {timeframeOptions.find((opt) => opt.value === selectedTimeframe)?.label}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Partial Outage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Major Outage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uptime Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.96%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Overall Uptime</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">245ms</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Incidents (30d)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12m</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Downtime</div>
                </div>
              </div>
            </div>

            {/* Recent Incidents */}
            {recentIncidents.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Incidents</h3>

                <div className="space-y-6">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{incident.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Started: {formatDate(incident.startTime)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                            {incident.status}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {incident.severity}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">{incident.description}</p>

                      <div className="space-y-3">
                        {incident.updates.map((update, updateIndex) => (
                          <div key={updateIndex} className="flex gap-3 text-sm">
                            <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">{formatDate(update.time)}</span>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">{update.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscribe for Updates CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Updated</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get notified about service updates, maintenance windows, and incident reports via email or SMS.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group">
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Subscribe for Updates
                  </button>

                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md group">
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    View Maintenance Schedule
                  </button>

                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md group">
                    <ExternalLink className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    Historical Data
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>📧 Email alerts • 📱 SMS notifications • 🔔 Webhook integrations • 📊 Custom dashboards</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
