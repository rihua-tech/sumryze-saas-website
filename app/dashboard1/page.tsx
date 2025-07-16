"use client"

import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import QuickSetup from "@/components/dashboard/QuickSetup";
import AISuggestions from "@/components/dashboard/AISuggestions0";
import { AvatarDropdown } from "@/components/dashboard/AvatarDropdown"
import FixGuideModal from "@/components/dashboard/FixGuideModal";


import {
  Search,
  Bell,
  Menu,
  X,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Target,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Plus,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Star,
  BarChart4,
  Eye,
  ArrowDown,
  ArrowUp,

} from "lucide-react"


// Mock data for the dashboard
const mockData = {
  stats: [
    { title: "Total Reports", value: "2,847", change: "+12%", trend: "up", icon: FileText },
    { title: "Active Users", value: "1,234", change: "+8%", trend: "up", icon: Users },
    { title: "Conversion Rate", value: "3.2%", change: "-2%", trend: "down", icon: TrendingUp },
    { title: "Revenue", value: "$12,847", change: "+15%", trend: "up", icon: DollarSign },
  ],
  recentReports: [
    {
      id: 1,
      title: "E-commerce Site Analysis",
      client: "TechCorp Inc.",
      status: "completed",
      date: "2024-01-15",
      score: 85,
      issues: 12,
      improvements: 8,
    },
    {
      id: 2,
      title: "Blog SEO Audit",
      client: "ContentHub",
      status: "in-progress",
      date: "2024-01-14",
      score: 72,
      issues: 18,
      improvements: 15,
    },
    {
      id: 3,
      title: "Local Business Review",
      client: "Pizza Palace",
      status: "completed",
      date: "2024-01-13",
      score: 91,
      issues: 6,
      improvements: 3,
    },
    {
      id: 4,
      title: "SaaS Platform Audit",
      client: "CloudTech",
      status: "pending",
      date: "2024-01-12",
      score: 0,
      issues: 0,
      improvements: 0,
    },
  ],

  aiSuggestions: [
  {
    id: 1,
    title: "Fix Page Speed Issues",
    description: "Your site has slow-loading pages (>3s). Optimize image compression, caching, and JavaScript for faster load time.",
    impact: "High",
    effort: "Medium",
    category: "Performance",
    priority: 1,
    estimatedImprovement: "+15% SEO Score",
    timeToImplement: "2–3 hours",
  },
  {
    id: 2,
    title: "Add Missing Meta Descriptions",
    description: "23 pages are missing meta descriptions. Add compelling summaries to boost visibility and click-throughs.",
    impact: "High",
    effort: "Low",
    category: "Content",
    priority: 2,
    estimatedImprovement: "+8% CTR",
    timeToImplement: "1 hour",
  },
  {
    id: 3,
    title: "Improve Internal Linking",
    description: "Connect related pages to strengthen topical relevance and distribute authority across your site.",
    impact: "Medium",
    effort: "Medium",
    category: "Content",
    priority: 3,
    estimatedImprovement: "+6% Authority",
    timeToImplement: "3–4 hours",
  },
  {
    id: 4,
    title: "Add Schema Markup",
    description: "Add FAQ and product schema to eligible pages for enhanced SERP display and rich snippets.",
    impact: "High",
    effort: "High",
    category: "Technical",
    priority: 4,
    estimatedImprovement: "+12% Visibility",
    timeToImplement: "4–6 hours",
  },
  {
    id: 5,
    title: "Target High-Intent Keywords",
    description: "Focus content on low-competition, high-search-volume keywords to capture motivated searchers.",
    impact: "High",
    effort: "Medium",
    category: "SEO Strategy",
    priority: 5,
    estimatedImprovement: "+High ROI Traffic",
    timeToImplement: "3–5 hours",
  },
  {
    id: 6,
    title: "Optimize Title Tags",
    description: "8 title tags exceed 60 characters or are duplicated. Shorten and refine for better SERP performance.",
    impact: "Medium",
    effort: "Low",
    category: "Content",
    priority: 6,
    estimatedImprovement: "+6% CTR",
    timeToImplement: "1–2 hours",
  },
  {
    id: 7,
    title: "Fix Broken Links",
    description: "Found 15 broken internal links that impact UX and crawlability. Replace or remove outdated URLs.",
    impact: "Medium",
    effort: "Medium",
    category: "Crawlability",
    priority: 7,
    estimatedImprovement: "+Crawlability",
    timeToImplement: "2 hours",
  },
  {
    id: 8,
    title: "Improve Image Alt Text",
    description: "23 images are missing alt tags. Add descriptive text for accessibility and image SEO.",
    impact: "Low",
    effort: "Low",
    category: "Accessibility",
    priority: 8,
    estimatedImprovement: "+5% Accessibility Score",
    timeToImplement: "1 hour",
  },
  {
    id: 9,
    title: "Create Topic Clusters",
    description: "Group related content into strategic clusters around core topics to boost authority and SEO depth.",
    impact: "High",
    effort: "High",
    category: "SEO Strategy",
    priority: 9,
    estimatedImprovement: "+Topical Authority",
    timeToImplement: "3–6 hours",
  },
  {
    id: 10,
    title: "Optimize for Featured Snippets",
    description: "Format content to directly answer queries and increase chances of ranking in Position 0 (featured snippets).",
    impact: "Medium",
    effort: "Medium",
    category: "Visibility",
    priority: 10,
    estimatedImprovement: "+SERP Visibility",
    timeToImplement: "2–4 hours",
  }
]

}


export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAllSuggestions, setShowAllSuggestions] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const user = { name: "Rihua" } 

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Performance":
      return Zap
    case "Content":
      return FileText
    case "Technical":
      return Target
    case "UX":
      return Users
    case "SEO Strategy":
      return BarChart4
    case "Accessibility":
      return CheckCircle
    case "Crawlability":
      return RefreshCw
    case "Visibility":
      return Eye
    default:
      return Lightbulb
  }
}


  const displayedSuggestions = showAllSuggestions ? mockData.aiSuggestions : mockData.aiSuggestions.slice(0, 5)
  
  const [activeSuggestion, setActiveSuggestion] = useState(null);


  return (
    <div className="min-h-screen">
     

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
           <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hello, {user?.name || "there"} 👋
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                All your reports, KPIs, and AI insights — organized in one smart dashboard.
              </p>
            </div>
            <div className="flex gap-4 justify-end">
                <Button
                size="sm"
                className="rounded-full bg-indigo-600 text-white px-6 py-3 shadow-md hover:bg-indigo-700 transition"
                   >
               <Plus className="w-4 h-4 mr-2" /> Generate Report
               </Button>

              <a
               href="/pricing"
               className="inline-flex items-center rounded-full border border-indigo-600 text-indigo-600 px-6 py-2 text-sm font-medium hover:bg-indigo-50 transition"
                >
               Start Free Trial
              </a>
             </div>
          </div>


          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockData.stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ml-1 ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <stat.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

               


          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Reports and Analytics */}
            <div className="lg:col-span-2 space-y-8">



              {/* Setup Prompts */}

                <QuickSetup />



           
              {/* AI-Powered SEO Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-indigo-600" />
                    AI-Powered SEO Insights
                  </CardTitle>
                  <CardDescription>Automated analysis of your website's SEO performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">85</div>
                      <div className="text-sm text-green-700">SEO Score</div>
                      <div className="text-xs text-green-600 mt-1">+5 this week</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <div className="text-sm text-blue-700">Issues Found</div>
                      <div className="text-xs text-blue-600 mt-1">-3 resolved</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-purple-700">Opportunities</div>
                      <div className="text-xs text-purple-600 mt-1">High impact</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-red-900">Critical: Page speed issues detected</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Fix Now
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-900">
                          Missing meta descriptions on 15 pages
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-900">Opportunity: Add schema markup</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>Your latest SEO analysis reports</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">{report.title}</h3>
                            <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.client}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {report.date}
                            </span>
                            {report.status === "completed" && (
                              <>
                                <span className="flex items-center">
                                  <Star className="h-4 w-4 mr-1" />
                                  Score: {report.score}
                                </span>
                                <span className="flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  {report.issues} issues
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline">View All Reports</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Suggestions */}
            <div className="space-y-6">
             
                <Card className="overflow-hidden rounded-2xl shadow-md">
    
                 {/* New Gradient Header */}
               
                  <div className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-5 py-6 mb-5 rounded-t-2xl flex items-center space-x-3">

                 <span role="img" aria-label="AI bot" className="text-xl">🤖</span>

                  <h2 className="text-white text-lg font-semibold" title="AI-generated SEO optimization recommendations">
                 AI-Powered Insights
                </h2>
              </div>

    
                <CardContent className="space-y-4">
                  {displayedSuggestions.map((suggestion) => {
                    const CategoryIcon = getCategoryIcon(suggestion.category)
                    return (
                      <div
                        key={suggestion.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                              {suggestion.priority}
                            </div>
                            <CategoryIcon className="h-4 w-4 text-gray-500" />
                          </div>
                          <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                            {suggestion.impact} Impact
                          </Badge>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-2">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 mb-3">{suggestion.description}</p>

                        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                            <span className="flex items-center">
                             <TrendingUp className="h-3 w-3 mr-1" />
                                {suggestion.estimatedImprovement}
                            </span>
                           <span className="flex items-center">
                           <Clock className="h-3 w-3 mr-1" />
                           {suggestion.timeToImplement}
                           </span>
                        </div>


                        {/* Actions */}
                          <div className="mt-4  flex space-x-2">
                            <Button 
                             className="text-xs"
                           
                            size="sm"  variant="blue" onClick={() => setActiveSuggestion(suggestion)}>
                              
                             Fix Guide
                            </Button>

                          <button className="text-sm font-medium text-indigo-600 hover:underline">
                           Learn More
                          </button>
                           </div>
                      </div>
                    )
                  })}
                    
                         <Button
                         variant="outline"
                         className="w-full text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 transition"
                         onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                         >
                        {showAllSuggestions
                        ? "Show Top 5 Only"
                        : `View All ${mockData.aiSuggestions.length} Suggestions`}

                         {showAllSuggestions ? (
                         <ArrowUp className="h-3 w-3 ml-2 transition-transform duration-200" />
                          ) : (
                           <ArrowDown className="h-3 w-3 ml-2 transition-transform duration-200" />
                 )}
                          </Button>




                   </CardContent>
              </Card>
                 
                     {/* 👇 Place the modal OUTSIDE the list loop, but still inside the return */}
                        {activeSuggestion && (
                        <FixGuideModal
                        suggestion={activeSuggestion}
                        onClose={() => setActiveSuggestion(null)}
                        />
           )}
         
         
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
