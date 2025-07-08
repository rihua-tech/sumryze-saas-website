"use client"

import { useState } from "react"
import { fetchFromAPI } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, TrendingUp, BarChart3, Download, Eye, MoreHorizontal } from "lucide-react"
import SeoKpiBlock from "@/components/SeoKpiBlock";


const recentReports = [
  {
    id: 1,
    client: "Acme Corp",
    website: "acmecorp.com",
    status: "completed",
    date: "2024-01-15",
    score: 87,
    type: "Monthly SEO Report",
  },
  {
    id: 2,
    client: "TechStart Inc",
    website: "techstart.io",
    status: "processing",
    date: "2024-01-14",
    score: null,
    type: "Technical Audit",
  },
  {
    id: 3,
    client: "Green Solutions",
    website: "greensolutions.com",
    status: "completed",
    date: "2024-01-12",
    score: 92,
    type: "Competitor Analysis",
  },
  {
    id: 4,
    client: "Fashion Forward",
    website: "fashionforward.com",
    status: "completed",
    date: "2024-01-10",
    score: 78,
    type: "Monthly SEO Report",
  },
]

export default function DashboardPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-700">Processing</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your reports.</p>
            </div>
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-sm text-emerald-600 mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm text-emerald-600 mt-2">+2 new this month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. SEO Score</p>
                  <p className="text-3xl font-bold text-gray-900">85</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-emerald-600 mt-2">+3 points improved</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">6</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Reports generated</p>
            </CardContent>
          </Card>
        </div>


           {/* ✅ SEO Dashboard KPI Block */}
      <SeoKpiBlock />

        {/* Recent Reports */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Reports</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.client}</h3>
                      <p className="text-sm text-gray-600">
                        {report.website} • {report.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(report.status)}
                    {report.score && (
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{report.score}</p>
                        <p className="text-xs text-gray-600">SEO Score</p>
                      </div>
                    )}
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{new Date(report.date).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {report.status === "completed" && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
