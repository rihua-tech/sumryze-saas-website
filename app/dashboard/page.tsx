"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Sparkles, } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner"; // or your preferred toast lib
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import SegmentedMenu from "./components/SegmentedMenu";
import UrlSearchBar from "./components/UrlSearchBar";
import AISummaryCard from "./components/overview/AISummaryCard";
import KPICards from "./components/overview/KPICards";
import CoreWebVitalsCard from "./components/overview/CoreWebVitalsCard";
import TrafficOverviewCard from "./components/overview/TrafficOverviewCard";
import KeywordGrowthCard from "./components/overview/KeywordGrowthCard";
import TrafficByChannelCard from "./components/overview/TrafficByChannelCard";
import AIPredictionsCard from "./components/overview/AIPredictionsCard";
import ContentPerformanceCard from "./components/overview/ContentPerformanceCard";
import AiSeoAssistantCard from "./components/overview/AiSeoAssistantCard";
import AISuggestions from "./components/overview/AISuggestions";
import { useUrlContext } from "@/app/context/UrlContext";

export default function Dashboard() {
  const { isFreeUser } = useUserContext();
  const pathname = usePathname();

  const { setUrl } = useUrlContext();

  // Add the missing handler
  function handleRefreshSummary() {
    // TODO: Implement refresh logic here
    // For now, just log to console
    console.log("Refresh summary clicked");
  }

  useEffect(() => {
    setUrl("https://example.com"); // ← set to the URL you want to audit
  }, []);

  


  return (
    <div className="max-w-7xl mx-auto px-5 pb-8 space-y-8">
      <SegmentedMenu />

      {/* Mobile CTA */}
      <div className="flex md:hidden justify-center">
        <Link href="/pricing">
          <Button className="h-8 px-4 py-1.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow-sm ml-4 transition-colors duration-200 ease-in-out">
            Start Free Trial
          </Button>
        </Link>
      </div>

      {/* Header & Search */}
      <div className="w-full px-4 pt-0">
        <div className="max-w-screen-xl mx-auto w-full space-y-4">
          <div className="text-center mt-2 md:pt-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              Analyze Any Website for SEO Insights
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <UrlSearchBar isFreeUser={isFreeUser} />
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
       <AISummaryCard/>

      {/* Main 2-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 space-y-6">
          <KPICards />
          <TrafficOverviewCard />
          <KeywordGrowthCard />
          <CoreWebVitalsCard />
          <TrafficByChannelCard />
        </div>

        {/* Right Column: AI Optimization Hub */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Assistant */}
          <div className="space-y-6">           
            <AiSeoAssistantCard/>
            <AISuggestions />                      
            {/* AI Predictions  */}
           <AIPredictionsCard />                        
            {/* AI Content Performance + */}
             <ContentPerformanceCard/>        
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-gray-700 mt-6">
        <Button variant="outline">🔄 Run New Audit</Button>
        <Button variant="ghost">⬇ Download PDF</Button>
        <Button>✍️ Generate AI Blog</Button>
        <Button variant="secondary">📤 Share Report</Button>
      </div>
    </div>
  );
}
