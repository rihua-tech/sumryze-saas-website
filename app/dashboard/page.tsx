"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";

import UrlSearchBar from "./components/UrlSearchBar";
import AISummaryCard from "./components/overview/AISummaryCard";
import KPICardsContainer from "./components/overview/KPICardsContainer";
import CoreWebVitalsCard from "./components/overview/CoreWebVitalsCard";
import TrafficOverviewCard from "./components/overview/TrafficOverviewCard";
import KeywordGrowthCard from "./components/overview/KeywordGrowthCard";
import TrafficByChannelCard from "./components/overview/TrafficByChannelCard";
import AIPredictionsCard from "./components/overview/AIPredictionsCard";
import ContentPerformanceCard from "./components/overview/ContentPerformanceCard";
import AiSeoAssistantCard from "./components/overview/AiSeoAssistantCard";
import AISuggestions from "./components/overview/AISuggestions";
import DashboardActions from "./components/DashboardActions";

import { useUrlContext } from "@/app/context/UrlContext";
import type { CoreVital } from "./components/overview/CoreWebVitalsChart";

export default function Dashboard() {
  const { isFreeUser } = useUserContext();
  const searchParams = useSearchParams();

  const site = searchParams.get("site") || ""; // current URL being analyzed
  const { url, setUrl } = useUrlContext();

  const [webVitals, setWebVitals] = useState<CoreVital[] | null>(null);
  const [loadingVitals, setLoadingVitals] = useState(false);
  const [vitalsError, setVitalsError] = useState<string | null>(null);

  // Keep context synchronized with ?site= in the URL on initial loads or navigation events.
  useEffect(() => {
    if (site && site !== url) {
      setUrl(site);
    }
  }, [site, url, setUrl]);

  // Fetch Core Web Vitals whenever the selected URL changes.
  useEffect(() => {
    if (!url) {
      setWebVitals(null);
      setVitalsError(null);
      setLoadingVitals(false);
      return;
    }

    let isCancelled = false;

    async function fetchVitals(currentUrl: string) {
      try {
        setLoadingVitals(true);
        setVitalsError(null);

        const response = await fetch(`/api/web-vitals?url=${encodeURIComponent(currentUrl)}`, {
          cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const message = typeof data?.error === "string" ? data.error : "No Core Web Vitals available for this site.";
          throw new Error(message);
        }

        if (!isCancelled) {
          setWebVitals(Array.isArray(data?.vitals) ? data.vitals : null);
        }
      } catch (error) {
        if (isCancelled) return;
        const message = error instanceof Error && error.message ? error.message : "Failed to load Core Web Vitals.";
        setVitalsError(message);
        setWebVitals(null);
      } finally {
        if (!isCancelled) {
          setLoadingVitals(false);
        }
      }
    }

    fetchVitals(url);

    return () => {
      isCancelled = true;
    };
  }, [url]);

  // ----------------------------------------------------
  //  CTA button states
  // ----------------------------------------------------
  const [isLoading, setIsLoading] = useState({
    audit: false,
    download: false,
    blog: false,
    share: false,
  });

  const handleAudit = async () => {
    setIsLoading(prev => ({ ...prev, audit: true }));
    await runAuditAPI();
    setIsLoading(prev => ({ ...prev, audit: false }));
  };

  const handleDownload = async () => {
    setIsLoading(prev => ({ ...prev, download: true }));
    await exportPDF();
    setIsLoading(prev => ({ ...prev, download: false }));
  };

  const handleGenerateBlog = async () => {
    setIsLoading(prev => ({ ...prev, blog: true }));
    await generateBlogAPI();
    setIsLoading(prev => ({ ...prev, blog: false }));
  };

  const handleShareReport = async () => {
    setIsLoading(prev => ({ ...prev, share: true }));
    await shareReportAPI();
    setIsLoading(prev => ({ ...prev, share: false }));
  };

  // ----------------------------------------------------
  //  RENDER
  // ----------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto px-5 pb-8 space-y-8">

      {/* Mobile CTA */}
      <div className="flex md:hidden justify-center">
        <Link href="/pricing">
          <Button className="h-8 px-4 py-1.5 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow-sm ml-4">
            Start Free Trial
          </Button>
        </Link>
      </div>

      {/* Header & Search */}
      <div className="w-full px-4">
        <div className="max-w-screen-xl mx-auto space-y-16">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mt-12">
            Analyze Any Website for SEO Insights
          </h1>

          <div className="flex justify-center">
            <UrlSearchBar isFreeUser={isFreeUser} />
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <AISummaryCard />

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-6">
          <KPICardsContainer />
          <KeywordGrowthCard />
          

          <CoreWebVitalsCard
            vitals={webVitals}
            loading={loadingVitals}
            error={vitalsError}
          />

          <TrafficOverviewCard />

          
          <TrafficByChannelCard />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-6">
          <AiSeoAssistantCard />
          <ContentPerformanceCard />
          <AISuggestions />
          <AIPredictionsCard />
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <DashboardActions
        isLoading={isLoading}
        onAudit={handleAudit}
        onDownload={handleDownload}
        onGenerateBlog={handleGenerateBlog}
        onShare={handleShareReport}
      />
    </div>
  );
}
