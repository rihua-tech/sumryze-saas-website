"use client"

import { useState, useRef } from "react"
import { RefreshCw, TrendingUp, TrendingDown, BarChart3, ArrowRight, ExternalLink, Download } from "lucide-react"
import CoreWebVitals from "./components/overview/CoreWebVitals"
import DashboardHeaderCenter from "./components/DashboardHeaderCenter";
import UrlSearchBar from "./components/UrlSearchBar";
import { useUserContext } from "@/app/context/UserContext";
import Link from 'next/link';
import SegmentedMenu from "./components/SegmentedMenu";
import { Button } from "@/components/ui/button";

import { ArrowUp, ArrowDown, Sparkles } from "lucide-react";
import LineChart from "@/components/charts/LineCharts";
import DonutChart from "@/components/charts/DonutChart";



import { Share,} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"



import { usePathname } from "next/navigation"

export default function Dashboard() {

  const { isFreeUser } = useUserContext(); 
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [trafficPeriod, setTrafficPeriod] = useState("Weekly")
  const pathname = usePathname();

  
  // Example values for AI Insights summary
  const positiveChange = 6
  const negativeChange = 12
  const affectedPages = 3
  const recommendation = "consider optimizing page speed and meta descriptions"

  return (    
        <div className="max-w-7xl mx-auto px-5 pb-8 space-y-8">
          
         <SegmentedMenu />
          
           {/* ✅ Call button for phone*/}                
          <div className="flex md:hidden justify-center "> 
            <Link href="/pricing" passHref>
              <Button
                 className="h-8 px-4 py-1.5 text-sm font-medium  bg-indigo-500 hover:bg-indigo-600  text-white  rounded-md shadow-sm ml-4 
               transition-colors duration-200 ease-in-out"
              >
              Start Free Trial
             </Button>
            </Link>
          </div>

          <div className="w-full px-4 pt-0">
            <div className="max-w-screen-xl mx-auto w-full space-y-4">
             <div className="text-center mt-2 md:pt-6 mb-6">          
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 ">
               Analyze Any Website for SEO Insights
                </h1>            
             </div>

             {/* ✅ Search bar centered */}
               <div className="w-full flex justify-center">
             <UrlSearchBar isFreeUser={isFreeUser} />
               </div>             
            </div>
           </div>

           
               {/* 1. AI Insights Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="flex items-center text-lg font-semibold">
            <Sparkles className="w-5 h-5 mr-2" /> AI Insights
          </div>
          <p className="text-sm mt-1">
            Your SEO score improved by <span className="font-bold">+6</span> this week. But traffic dropped 12% on 3 pages — consider optimizing page speed and meta descriptions.
          </p>
        </div>
        <Button variant="secondary" className="mt-4 md:mt-0">Ask AI</Button>
      </div>

      {/* 2. Top Section: SEO KPIs + LLM SEO Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO KPI Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPI title="SEO Score" value="78" delta="+6" />
            <KPI title="Top Pages" value="5" delta="+2" />
            <KPI title="Conversions" value="3.4%" delta="-1%" down />
            <KPI title="Revenue" value="$12,847" delta="+15%" />
          </div>
          <LineChart title="Traffic Overview" />
          <LineChart title="Keyword Growth" />
        </div>

        {/* LLM SEO Actions */}
        <div className="space-y-4">
         <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-3">
           <h3 className="text-white font-semibold text-lg">🧠 AI SEO Assistant</h3>
  
           <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
           📝 Generate Blog
            </Button>
             <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
             🧩 Fix Meta Descriptions
            </Button>
            <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
            💡 Content Ideas
          </Button>
              <input
              placeholder="Enter keyword..."
             className="w-full mt-2 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
           </div>

<div className="bg-gray-900 border border-gray-700 space-y-5 rounded-xl p-5">
 <h3 className="text-white text-lg font-semibold mb-3">🧠 AI Suggestions</h3>
<ul className="space-y-6 text-sm text-gray-300">
  <li className="flex justify-between">
    <span>1. Improve Page Speed</span>
    <span className="text-red-500">High</span>
  </li>
  <li className="flex justify-between">
    <span>2. Optimize Title & Meta</span>
    <span className="text-yellow-400">High</span>
  </li>
  <li className="flex justify-between">
    <span>3. Fix Heading Structure</span>
    <span className="text-yellow-400">Medium</span>
  </li>
  <li className="flex justify-between">
    <span>4. Use Target Keywords</span>
    <span className="text-yellow-400">High</span>
  </li>
  <li className="flex justify-between">
    <span>5. Add Schema Markup</span>
    <span className="text-blue-400">Medium</span>
  </li>
  <li className="flex justify-between">
    <span>6. Add Canonical Tags</span>
    <span className="text-blue-400">Medium</span>
  </li>
  <li className="flex justify-between">
    <span>7. Improve Image ALT Text</span>
    <span className="text-blue-400">Low</span>
  </li>
  <li className="flex justify-between">
    <span>8. Fix Broken Links</span>
    <span className="text-red-500">High</span>
  </li>
  <li className="flex justify-between">
    <span>9. Submit Sitemap.xml</span>
    <span className="text-blue-400">Low</span>
  </li>
  <li className="flex justify-between">
    <span>10 Add Robots.txt</span>
    <span className="text-blue-400">Low</span>
  </li>
</ul>

</div>

          
        </div>
      </div>

      {/* 3. Middle Insights: Core Web Vitals, Traffic by Channel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Core Web Vitals</h3>
          <div className="flex justify-between text-sm text-white">
            <Metric title="LCP" value="76%" note="1.9s (Good)" />
            <Metric title="FID" value="90%" note="90ms (Good)" />
            <Metric title="CLS" value="80%" note="0.08 (Good)" />
          </div>
        </div>
        <DonutChart title="Traffic by Channel" />
      </div>

      {/* 4. Lower Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-700 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">📈 AI Predictions</h3>
          <p className="text-3xl font-bold">18,500 <span className="text-base">(+320 visitors)</span></p>
          <p className="mt-1">CTR Improvement: <span className="font-bold">+15%</span></p>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-3">Content Performance</h3>
          <p className="text-gray-400">Avg Word Count: <span className="text-white font-semibold">950</span></p>
          <p className="text-gray-400">Content Quality Score: <span className="text-white font-semibold">87/100</span></p>
        </div>
      </div>

      {/* 5. Bottom CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-gray-700 mt-6">
        <Button variant="outline">🔄 Run New Audit</Button>
        <Button variant="ghost">⬇ Download PDF</Button>
        <Button>✍️ Generate AI Blog</Button>
        <Button variant="secondary">📤 Share Report</Button>
      </div>
    </div>
  );
}

function KPI({ title, value, delta, down = false }: { title: string; value: string; delta: string; down?: boolean }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-white">
      <h4 className="text-sm text-gray-400 mb-1">{title}</h4>
      <div className="text-xl font-bold">{value}</div>
      <div className={`text-sm flex items-center ${down ? "text-red-400" : "text-green-400"}`}>
        {down ? <ArrowDown className="w-4 h-4 mr-1" /> : <ArrowUp className="w-4 h-4 mr-1" />} {delta}
      </div>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-xs text-gray-500">{note}</div>
    </div>
  )
}
       