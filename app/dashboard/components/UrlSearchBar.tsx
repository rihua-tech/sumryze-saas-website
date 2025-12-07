"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUrlContext } from "@/app/context/UrlContext";
import { normalizeUrl } from "@/lib/normalizeUrl";

interface UrlSearchBarProps {
  isFreeUser: boolean;
}

export default function UrlSearchBar({ isFreeUser }: UrlSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUrl: setUrlContext } = useUrlContext();

  // ⭐ Load ?site= from URL
  const initialUrl = searchParams.get("site") || "";
  const [url, setUrl] = useState(initialUrl);

  const [searchCount, setSearchCount] = useState(0);
  const [message, setMessage] = useState("");

  // ⭐ Keep input updated when user navigates
  useEffect(() => {
    const current = searchParams.get("site");
    if (current) setUrl(current);
  }, [searchParams]);

  // Clear message when typing
  useEffect(() => {
    if (message) setMessage("");
  }, [url]);

  // Free-tier usage counter
  useEffect(() => {
    if (!isFreeUser) return;

    const today = new Date().toDateString();
    const storedData = localStorage.getItem("urlSearchUsage");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed.date === today) {
        setSearchCount(parsed.count);
      } else {
        localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: 0 }));
        setSearchCount(0);
      }
    } else {
      localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: 0 }));
    }
  }, [isFreeUser]);

  const handleSearch = () => {
    if (isFreeUser && searchCount >= 5) {
      setMessage("You've reached your daily limit. Upgrade to unlock unlimited searches.");
      return;
    }

    const normalized = normalizeUrl(url);
    if (!normalized) {
      setMessage("Please enter a valid website address (e.g., example.com or https://example.com).");
      return;
    }

    setUrlContext(normalized);

    // ⭐ KEEP URL IN THE SEARCH BAR
    router.push(`/dashboard?site=${encodeURIComponent(normalized)}`);

    if (isFreeUser) {
      const today = new Date().toDateString();
      const newCount = searchCount + 1;
      localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: newCount }));
      setSearchCount(newCount);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      className="flex items-center rounded-md px-4 py-1 space-x-2 w-full max-w-full sm:max-w-2xl md:max-w-4xl 
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
      shadow-sm dark:shadow-none transition-colors mx-auto"
    >
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter website URL (example.com or https://...)"
        className="bg-transparent flex-1 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-2 py-1.5 rounded-md transition-all whitespace-nowrap"
      >
        🔍 Search
      </button>
    </div>
  );
}
