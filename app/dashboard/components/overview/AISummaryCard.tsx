// components/AISummaryCard.tsx
"use client";

import { Sparkles, Copy, Share2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import DOMPurify from 'dompurify';
import { useEffect, useState } from "react";
import { useUrlContext } from "@/app/context/UrlContext";
import applyColorHighlighting from "@/app/utils/applyColorHighlighting";



// Inside the component



type AISummaryCardProps = {
 
  showActions?: boolean;
};


export default function AISummaryCard({ showActions = true }: AISummaryCardProps) {


    const { url: currentUrl } = useUrlContext();

    const [summary, setSummary] = useState("Loading summary...");

  useEffect(() => {
    
  if (!currentUrl) {
    setSummary("Please enter a website URL to get AI summary.");
    return;
  }

  const fetchAISummary = async () => {
    try {
      const res = await fetch(`/api/ai-summary?url=${encodeURIComponent(currentUrl)}`);
      const data = await res.json();
      setSummary(data.summary || "No summary available.");
    } catch (err) {
      console.error(err);
      setSummary("Error generating summary.");
    }
  };

  fetchAISummary();
}, [currentUrl]);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SEO Summary",
          text: summary,
          url: window.location.href,
        });
      } catch {
        toast.error("Share canceled or failed.");
      }
    } else {
      await navigator.clipboard.writeText(summary);
      toast.success("Copied to clipboard (share unsupported on this device).");
    }
  };

  return (
  <TooltipProvider>
    <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-2xl p-6 shadow-md w-full">
 

     <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
  {/* Left Side */}
  <div className="w-full md:w-3/4">
    <div className="flex items-center mb-2 text-base font-semibold">
      <Sparkles className="w-5 h-5 mr-2" />
      AI Summary
    </div>

     
<div
  className="text-base leading-relaxed"
 
dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(applyColorHighlighting(summary)),
}}

></div>



  </div>

  {/* Right Side: Icons + Note */}
  <div className="w-full md:w-1/4 flex md:flex-col md:items-end items-start justify-between md:justify-between gap-3">
    {showActions && (
  <div className="flex gap-5">
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={handleCopy} className="text-white/90 hover:text-white transition p-2 rounded-md hover:bg-white/10">
          <Copy className="w-6 h-6" />
        </button>
      </TooltipTrigger>
      <TooltipContent>Copy Summary</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={handleShare} className="text-white/90 hover:text-white transition p-2 rounded-md hover:bg-white/10">
          <Share2 className="w-6 h-6" />
        </button>
      </TooltipTrigger>
      <TooltipContent>Share Summary</TooltipContent>
    </Tooltip>
  </div>
)}

     <p className="text-[10px] text-white/80 italic mt-1 md:mt-3 text-right">
    Paste a new URL to refresh insights.
     </p>
   </div>
 </div>
 
    </div>
  </TooltipProvider>
);
}
