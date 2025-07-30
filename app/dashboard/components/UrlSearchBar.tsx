"use client";

import { useState, useEffect } from "react";

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
             <div 
                className="flex items-center rounded-md px-4 py-1 space-x-2 w-full max-w-full sm:max-w-2xl md:max-w-4xl 
               bg-white dark:bg-gray-900
               border border-gray-200 dark:border-gray-700 
                shadow-sm dark:shadow-none transition-colors mx-auto"

                >



               <input
             type="text"
             value={url}
             onChange={(e) => setUrl(e.target.value)}
             placeholder="Enter website URL (https://...)"
               className="bg-transparent flex-1 text-xs text-gray-900 dark:text-white 
               placeholder-gray-400 outline-none"
               />

               

               <button
              onClick={handleSearch}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-2 py-1.5 rounded-md transition-all whitespace-nowrap"
                    >
              🔍 Search
             </button>

             {getUsageMessage() && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
          {getUsageMessage()}
       </span>
      )}
   </div>
    
  );
}

