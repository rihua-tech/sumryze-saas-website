"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AvatarDropdown } from "@/components/dashboard/AvatarDropdown";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function DashboardHeader() {
  const [client, setClient] = useState("Client A");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500)); // Simulated delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-white py-4 shadow-sm border-b">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/images/logo-icon.svg"
                alt="Sumryze Logo"
                className="w-8 h-8 sm:w-10 sm:h-9 transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                Sumryze
              </span>
            </Link>
          </div>

          {/* Center: Search + Filters + Ask AI */}
          <div className="flex-1 flex flex-wrap justify-center md:justify-center items-center gap-3 md:gap-4 px-2 md:px-0">
            {/* Search */}
            <div className="relative w-full max-w-[280px] sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-300 transition"
              />
            </div>

            {/* Filters */}
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-[140px] sm:w-auto"
            >
              <option>Client A</option>
              <option>Client B</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-[140px] sm:w-auto"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>

            
          </div>

          {/* Right: Avatar Only */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
