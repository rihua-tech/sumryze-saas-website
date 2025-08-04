"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AiSeoAssistantCard() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleNavigate = (sectionId: string) => {
    if (!keyword.trim()) return;
    const encoded = encodeURIComponent(keyword.trim());
    router.push(`/ai-seo?keyword=${encoded}#${sectionId}`);
  };

  return (
    <div className="rounded-2xl border bg-muted/5 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-1 text-foreground">
          🧠 AI SEO Assistant
        </h3>
        <span className="text-muted-foreground text-sm">❔</span>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground mb-5">
       Generate SEO-optimized content instantly. Powered by AI.
      </p>

      {/* Action Buttons */}
      <div className="space-y-5 mb-5">
        <Button
          variant="default"
          className="w-full flex items-center text-base justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white"
          onClick={() => handleNavigate("generate-blog")}
        >
          📄 Generate Blog
        </Button>

        <Button
          variant="ghost"
          className="w-full flex items-center text-base justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-muted dark:hover:bg-muted/70 dark:text-gray-100"
          onClick={() => handleNavigate("fix-meta")}
        >
          ✍️ Fix Meta Descriptions
        </Button>

        <Button
          variant="ghost"
          className="w-full flex items-center text-base justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-muted dark:hover:bg-muted/70 dark:text-gray-100"
          onClick={() => handleNavigate("content-ideas")}
        >
          💡 Content Ideas
        </Button>
      </div>

      {/* Keyword Input */}
      <Input
        placeholder="Enter keyword..."
      
        className="w-full text-sm font-medium px-4 py-10 rounded-md bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}
