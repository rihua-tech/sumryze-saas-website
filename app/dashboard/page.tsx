"use client"

import { useState, useRef } from "react"
import { RefreshCw, TrendingUp, TrendingDown, BarChart3, ArrowRight, ExternalLink, Download } from "lucide-react"
import CoreWebVitals from "./components/overview/CoreWebVitals"
import DashboardHeaderCenter from "./components/DashboardHeaderCenter";
import UrlSearchBar from "./components/UrlSearchBar";
import { useUserContext } from "@/app/context/UserContext";



import { Share,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"



import { usePathname } from "next/navigation"

export default function Dashboard() {

  const { isFreeUser } = useUserContext(); 
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [trafficPeriod, setTrafficPeriod] = useState("Weekly")
  const pathname = usePathname();

  // Add missing state and ref for client dropdown
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("Client A");
  const clientOptions = ["Client A", "Client B", "Client C"];
  const clientDropdownRef = useRef<HTMLDivElement>(null);

  // Example values for AI Insights summary
  const positiveChange = 6
  const negativeChange = 12
  const affectedPages = 3
  const recommendation = "consider optimizing page speed and meta descriptions"

  return (    
        <div className="max-w-7xl mx-auto px-5 py-5 space-y-8">


        <div className="w-full px-4 pt-8">
  <div className="max-w-screen-xl mx-auto w-full space-y-4">

    {/* ✅ Search bar centered */}
    <div className="w-full flex justify-center">
      <UrlSearchBar isFreeUser={isFreeUser} />
    </div>

    {/* ✅ Controls centered */}
    <div className="w-full pt-0 flex justify-center">
      <div className="flex flex-wrap gap-5 justify-center w-full max-w-7xl">
        <DashboardHeaderCenter />
      </div>
    </div>

  </div>

 </div>

         






                {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white shadow-lg flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-xl">✨</span> AI Insights
          </h2>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 hover:shadow-lg transition-all duration-300">
              Ask AI
            </button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all duration-300">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all duration-300">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-white text-base font-medium leading-relaxed">
          <span className="font-semibold">Your SEO score improved by </span>
          <span className="text-green-300 font-bold">+{positiveChange}</span> this week.<br />
          <span className="font-semibold">But traffic dropped </span>
          <span className="text-red-300 font-bold">{negativeChange}%</span> on {affectedPages} key pages — 
          <span className="text-indigo-100 font-semibold"> {recommendation}</span>.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold shadow-sm hover:scale-105">
            ✅ +3 Wins
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold shadow-sm hover:scale-105">
            ⚠️ 3 Warnings
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold shadow-sm hover:scale-105">
            📉 Traffic -12%
          </div>
        </div>
      </div> 



            {/* Section 2: Key Performance Metrics */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              {/* Header with Title and Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Key Performance Metrics</h2>
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button className="px-4 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm font-medium transition-all duration-200">
                    Weekly
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                    Monthly
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* SEO Score Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">SEO Score</h3>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">78</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
                      <span className="text-sm text-green-600 font-semibold bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        +6
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Target: 90+</p>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BarChart3 className="h-3 w-3" />
                      <span>ApexChart</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                {/* Top Performing Pages Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Pages</h3>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">5</span>
                      <span className="text-sm text-green-600 font-semibold bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        +2
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Goal: 8 Pages</p>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-16 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-all duration-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <TrendingUp className="h-3 w-3" />
                      <span>ApexChart</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                </div>

                {/* Conversions Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</h3>
                    </div>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">3.4%</span>
                      <span className="text-sm text-red-600 font-semibold bg-red-100 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                        -1%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Industry Avg: 4%</p>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-16 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <TrendingDown className="h-3 w-3" />
                      <span>ApexChart</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</h3>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$12,847</span>
                      <span className="text-sm text-green-600 font-semibold bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        +15%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Goal: $15K</p>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center mb-3 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BarChart3 className="h-3 w-3" />
                      <span>ApexChart</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: "86%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Traffic Overview, Keyword Growth, AI Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Traffic Overview */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Overview</h3>
                  <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setTrafficPeriod("Weekly")}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        trafficPeriod === "Weekly"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setTrafficPeriod("Monthly")}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                        trafficPeriod === "Monthly"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="chart-placeholder h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center border border-blue-100 dark:border-blue-800/30">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">ApexCharts Placeholder</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Line Chart - Traffic Trends</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Keyword Growth */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Keyword Growth</h3>
                </div>

                {/* Chart Placeholder */}
                <div className="chart-placeholder h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg flex items-center justify-center border border-green-100 dark:border-green-800/30">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">ApexCharts Placeholder</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Growth Trend Line Chart</p>
                  </div>
                </div>
              </div>

              {/* Card 3: AI Suggestions */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Suggestions</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Suggestion 1 */}
                  <div className="group p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Fix Page Speed</h4>
                      <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-medium">
                        High
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">+15% SEO improvement potential</p>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Fix Guide
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Suggestion 2 */}
                  <div className="group p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Add Meta Descriptions</h4>
                      <span className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full font-medium">
                        Medium
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">+8% SEO improvement potential</p>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Fix Guide
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Suggestion 3 */}
                  <div className="group p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Schema Markup</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
                        Low
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">+5% SEO improvement potential</p>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Fix Guide
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* View All Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group">
                  View All Suggestions
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </div>


    
    {/* Core Web Vitals + Traffic by Channel */}
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"> 
  {/* Core Web Vitals Card */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Core Web Vitals
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Core Web Vitals Component */}
        <CoreWebVitals />
      </CardContent>
    </Card>
  </motion.div>

  {/* Traffic by Channel Card */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.9 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Traffic by Channel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center space-x-6">
          {/* Donut Chart Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                ApexCharts
                <br />
                Donut Chart
              </span>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="flex-1 space-y-4">
            {[
              { name: 'Organic', color: 'bg-blue-500', value: '45%', change: '+5%', trend: 'green' },
              { name: 'Paid', color: 'bg-green-500', value: '25%', change: '-2%', trend: 'red' },
              { name: 'Social', color: 'bg-purple-500', value: '15%', change: '+8%', trend: 'green' },
              { name: 'Referral', color: 'bg-orange-500', value: '10%', change: '+1%', trend: 'green' },
              { name: 'Email', color: 'bg-red-500', value: '5%', change: '+3%', trend: 'green' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                  <span
                    className={`text-xs font-medium ${
                      item.trend === 'green'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
    </div>

      
      
      
      
      
           

                {/* AI Predictions Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white border-0 shadow-xl dark:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-sm">AI Predictions</h3>
                <p className="text-white/95 mb-4 text-lg drop-shadow-sm">+22% Traffic Growth (Next 30 Days)</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-white/80">Predicted Visitors</p>
                    <p className="text-2xl font-bold text-white">
                      18,500 <span className="text-base">(+320)</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/80">CTR Improvement</p>
                    <p className="text-2xl font-bold text-white">+15%</p>
                  </div>
                </div>
              </div>
              <div className="h-24 w-32 bg-white/20 rounded-lg flex items-center justify-center text-white/80 text-xs backdrop-blur-sm border border-white/30">
                Prediction Chart
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>


   {/* Bottom Cards Section */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
  {/* Card 1: Top Pages */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.1 }}
    className="h-full"
  >
    

    <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Top Pages
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="h-32 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
          Horizontal Bar Chart
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Card 2: Backlink Summary */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
    className="h-full"
  >
    

    <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Backlink Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">1,250</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Backlinks</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">DoFollow vs NoFollow</span>
          </div>
          <Progress value={65} className="h-3 bg-gray-200 dark:bg-gray-800" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Growth Trend</span>
            <span className="text-green-600 dark:text-[#10B981] font-medium">+12%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Card 3: Conversion Funnel */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.3 }}
    className="h-full"
  >
   

    <Card className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Conversion Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {[
            { label: 'Traffic', value: '15,420 (100%)', color: 'from-blue-50 dark:from-blue-500/10' },
            { label: 'Leads', value: '1,850 (12%)', color: 'from-purple-50 dark:from-purple-500/10' },
            { label: 'Conversions', value: '524 (3.4%)', color: 'from-orange-50 dark:from-orange-500/10' },
            { label: 'Revenue', value: '$12,847 (+12%)', color: 'from-green-50 dark:from-green-500/10' }
          ].map((item, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-2 rounded-lg bg-gradient-to-r ${item.color} to-transparent`}
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
      </Card>
      </motion.div>
    </div>

          
            

            {/* Section 6: Bottom CTA */}
           
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 p-6">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to take the next step?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share, download, or dive deeper into your technical SEO dashboard.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                  <Button className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Go to SEO Dashboard
                  </Button>
                </div>
              </div>
            </div>
                
            {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
       