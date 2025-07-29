"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UrlSearchBarProps {
  isFreeUser: boolean;
}

export default function UrlSearchBar({ isFreeUser }: UrlSearchBarProps) {
  const [url, setUrl] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isFreeUser) return;

    const today = new Date().toDateString();
    const storedData = localStorage.getItem("urlSearchUsage");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed.date === today) {
        setSearchCount(parsed.count);
      } else {
        // reset if a new day
        localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: 0 }));
        setSearchCount(0);
      }
    } else {
      localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: 0 }));
    }
  }, [isFreeUser]);

  const handleSearch = () => {
    if (isFreeUser && searchCount >= 3) {
      setMessage("You've reached your daily limit. Upgrade to unlock unlimited searches.");
      return;
    }

    if (!url.trim()) return;

    // TODO: Run your search logic here
    console.log("Searching:", url);

    // Update localStorage
    if (isFreeUser) {
      const today = new Date().toDateString();
      const newCount = searchCount + 1;
      localStorage.setItem("urlSearchUsage", JSON.stringify({ date: today, count: newCount }));
      setSearchCount(newCount);
    }

    setUrl("");
  };

  const getUsageMessage = () => {
    if (!isFreeUser || searchCount === 0) return "";
    if (searchCount === 1) return "2 left today";
    if (searchCount === 2) return "1 left today";
    if (searchCount >= 3) return "You've reached your daily limit. Upgrade to unlock more.";
    return "";
  };

  return (
    
      <div className="flex items-center bg-gray-800 rounded-md px-3 py-1.5 space-x-2 w-full max-w-xl">
      <input
        type="text"
        placeholder="Enter website URL (https://...)"
        className="bg-transparent flex-1 text-sm text-white placeholder-gray-400 outline-none"
      />
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1 rounded-md transition-all">
        🔍 Search
      </button>
      
      {getUsageMessage() && (
        <span className="text-sm text-gray-400">
          {getUsageMessage()}
        </span>
      )}
    </div>
  );
}
