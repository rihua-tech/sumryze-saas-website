"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";                         // ✅ NEW: navigate with query
import { useUrlContext } from "@/app/context/UrlContext";
import { normalizeUrl } from "@/lib/normalizeUrl";                    // ✅ NEW: accept example.com etc.

interface UrlSearchBarProps {
  isFreeUser: boolean;
}

export default function UrlSearchBar({ isFreeUser }: UrlSearchBarProps) {
  const router = useRouter();                                         // ✅ NEW
  const { setUrl: setUrlContext } = useUrlContext();
  const [url, setUrl] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [message, setMessage] = useState("");                         // will show errors / limit text

  // ✅ Clear message when user types again
  useEffect(() => {
    if (message) setMessage("");
  }, [url]);

  // free user daily usage counter (unchanged)
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
    // ✅ Limit check first
    if (isFreeUser && searchCount >= 3) {
      setMessage("You've reached your daily limit. Upgrade to unlock unlimited searches.");
      return;
    }

    // ✅ Normalize the input so example.com / www.example.com work
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setMessage("Please enter a valid website address (e.g., example.com or https://example.com).");
      return;
    }

    // ✅ Update global URL context (other widgets depend on it)
    setUrlContext(normalized);

    // ✅ Navigate so server components (KPIs) receive ?site=... and render instantly
    router.push(`/dashboard?site=${encodeURIComponent(normalized)}`);

    // Optional: clear input
    setUrl("");

    // ✅ Update usage counter
    if (isFreeUser) {
      const today = new Date().toDateString();
      const newCount = searchCount + 1;
      localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: newCount }));
      setSearchCount(newCount);
    }
  };

  // ✅ Submit on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const getUsageMessage = () => {
    if (!isFreeUser || searchCount === 0) return "";
    if (searchCount === 1) return "2 left today";
    if (searchCount === 2) return "1 left today";
    if (searchCount >= 3) return "You've reached your daily limit. Upgrade to unlock more.";
    return "";
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
        onKeyDown={handleKeyDown}                                     // ✅ NEW
        placeholder="Enter website URL (example.com or https://...)"
        className="bg-transparent flex-1 text-xs text-gray-900 dark:text-white 
        placeholder-gray-400 outline-none"
        aria-label="Website URL"
      />

      <button
        onClick={handleSearch}
        className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-2 py-1.5 rounded-md transition-all whitespace-nowrap"
      >
        🔍 Search
      </button>

      {/* usage note (free tier) */}
      {getUsageMessage() && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {getUsageMessage()}
        </span>
      )}

      {/* ✅ error / info message */}
      {message && (
        <span className="ml-2 text-sm text-rose-500 dark:text-rose-400">
          {message}
        </span>
      )}
    </div>
  );
}
