"use client"

import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Share,
  RefreshCw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import CoreWebVitals from "./components/overview/CoreWebVitals";




export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* AI Insights Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white border-0 shadow-xl dark:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-white drop-shadow-sm" />
                  <h2 className="text-xl font-bold text-white drop-shadow-sm">AI Insights</h2>
                </div>
                <p className="text-white/95 max-w-2xl text-lg drop-shadow-sm">
                  Your SEO score improved by +6 this week. Traffic dropped 12% on 3 key pages. Focus on improving LCP
                  for Core Web Vitals.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/30 text-green-100 border-green-400/40 backdrop-blur-sm"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    +3 Wins
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500/30 text-yellow-100 border-yellow-400/40 backdrop-blur-sm"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />3 Warnings
                  </Badge>
                  <Badge variant="secondary" className="bg-red-500/30 text-red-100 border-red-400/40 backdrop-blur-sm">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Traffic -12%
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50 hover:shadow-lg text-white border-0 transition-all duration-300"
                  size="sm"
                >
                  Ask AI
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all duration-300">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all duration-300">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Performance Metrics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Key Performance Metrics</h2>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:border-purple-500 transition-all duration-300 rounded-lg"
            >
              Weekly
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:border-purple-500 transition-all duration-300 rounded-lg"
            >
              Monthly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1C1F27] dark:to-[#16181E] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">SEO Score</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-[#10B981]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">78/100</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-3 w-3 text-green-600 dark:text-[#10B981]" />
                  <span className="text-sm text-green-600 dark:text-[#10B981] font-medium">+6 this week</span>
                </div>
                <div className="mt-4 h-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 rounded-lg flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
                  Chart
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1C1F27] dark:to-[#16181E] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Top Performing Pages
                </CardTitle>
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-3 w-3 text-green-600 dark:text-[#10B981]" />
                  <span className="text-sm text-green-600 dark:text-[#10B981] font-medium">+2 this week</span>
                </div>
                <div className="mt-4 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-lg flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
                  Chart
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1C1F27] dark:to-[#16181E] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</CardTitle>
                <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                  <MousePointer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3.4%</div>
                <div className="flex items-center space-x-2">
                  <ArrowDown className="h-3 w-3 text-red-600 dark:text-[#EF4444]" />
                  <span className="text-sm text-red-600 dark:text-[#EF4444] font-medium">-1% this week</span>
                </div>
                <div className="mt-4 h-16 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-500/20 dark:to-red-500/20 rounded-lg flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
                  Chart
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white dark:bg-gradient-to-br dark:from-[#1C1F27] dark:to-[#16181E] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</CardTitle>
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-[#10B981]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$12,847</div>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="h-3 w-3 text-green-600 dark:text-[#10B981]" />
                  <span className="text-sm text-green-600 dark:text-[#10B981] font-medium">+12% this month</span>
                </div>
                <div className="mt-4 h-16 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20 rounded-lg flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
                  Chart
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Traffic Overview + Keyword Growth + AI Suggestions - 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Traffic Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-500 dark:hover:shadow-indigo-500/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Traffic Overview</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 rounded-lg text-xs px-3 py-1"
                  >
                    Weekly
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 rounded-lg text-xs px-3 py-1"
                  >
                    Monthly
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                <TrendingUp className="h-8 w-8 mb-2 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium">ApexCharts Line Chart</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">Traffic data visualization</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Column 2: Keyword Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-500 dark:hover:shadow-indigo-500/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Keyword Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                <BarChart3 className="h-8 w-8 mb-2 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium">ApexCharts Area Chart</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">Keyword ranking trends</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Column 3: AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-1"
        >
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-500 dark:hover:shadow-indigo-500/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* High Impact Suggestion */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="flex items-start space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/10 dark:to-red-800/5 hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-sm dark:hover:shadow-red-500/10 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shadow-sm"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Fix Page Speed</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">+15% SEO improvement</p>
                    <Badge className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700/50 rounded-full px-2 py-1 font-medium shadow-sm">
                      High Impact
                    </Badge>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Fix Guide →
                    </Button>
                  </div>
                </motion.div>

                {/* Medium Impact Suggestion */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  className="flex items-start space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-gradient-to-r from-yellow-50 to-yellow-50/50 dark:from-yellow-900/10 dark:to-yellow-800/5 hover:border-yellow-300 dark:hover:border-yellow-500/50 hover:shadow-sm dark:hover:shadow-yellow-500/10 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shadow-sm"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Add Meta Descriptions</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">+8% SEO improvement</p>
                    <Badge className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50 rounded-full px-2 py-1 font-medium shadow-sm">
                      Medium Impact
                    </Badge>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Fix Guide →
                    </Button>
                  </div>
                </motion.div>

                {/* Low Impact Suggestion */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="flex items-start space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-900/10 dark:to-blue-800/5 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-sm dark:hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shadow-sm"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Implement Schema Markup</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">+5% SEO improvement</p>
                    <Badge className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50 rounded-full px-2 py-1 font-medium shadow-sm">
                      Low Impact
                    </Badge>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Fix Guide →
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 text-white border-0 rounded-lg font-bold text-sm py-3 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] transform">
                  View All Suggestions
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Core Web Vitals + Traffic by Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Core Web Vitals Card - New Component */}
        <CoreWebVitals />

        {/* Traffic by Channel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card className="h-full flex flex-col bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Traffic by Channel
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center space-x-6">
                {/* Left Side - Donut Chart Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 rounded-full flex items-center justify-center border border-gray-200 dark:border-[#2C2F36]">
                    <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                      ApexCharts
                      <br />
                      Donut Chart
                      <br />
                      Placeholder
                    </span>
                  </div>
                </div>

                {/* Right Side - Traffic Sources List */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2C2F36]/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm dark:shadow-lg dark:shadow-blue-500/50"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Organic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">45%</span>
                      <span className="text-xs text-green-600 dark:text-[#10B981] font-medium">+5%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2C2F36]/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm dark:shadow-lg dark:shadow-green-500/50"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Paid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">25%</span>
                      <span className="text-xs text-red-600 dark:text-[#EF4444] font-medium">-2%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2C2F36]/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm dark:shadow-lg dark:shadow-purple-500/50"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Social</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">15%</span>
                      <span className="text-xs text-green-600 dark:text-[#10B981] font-medium">+8%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2C2F36]/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm dark:shadow-lg dark:shadow-orange-500/50"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Referral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">10%</span>
                      <span className="text-xs text-green-600 dark:text-[#10B981] font-medium">+1%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2C2F36]/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm dark:shadow-lg dark:shadow-red-500/50"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">5%</span>
                      <span className="text-xs text-green-600 dark:text-[#10B981] font-medium">+3%</span>
                    </div>
                  </div>
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

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Card className="bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2C2F36]">
                Horizontal Bar Chart
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Card className="bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Backlink Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Card className="bg-white dark:bg-[#1C1F27] border-gray-200 dark:border-[#2C2F36] rounded-xl shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl hover:border-purple-500 dark:hover:shadow-purple-500/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-500/10 dark:to-transparent">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Traffic</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">15,420 (100%)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-500/10 dark:to-transparent">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Leads</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">1,850 (12%)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-500/10 dark:to-transparent">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Conversions</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">524 (3.4%)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-green-50 to-transparent dark:from-green-500/10 dark:to-transparent">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">$12,847 (+12%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
