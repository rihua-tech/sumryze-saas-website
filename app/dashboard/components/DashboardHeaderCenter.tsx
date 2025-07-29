"use client";

// ✅ React and Next.js hooks
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// ✅ Icons
import GroupIcon from "@mui/icons-material/Group";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BarChart3 from "@mui/icons-material/BarChart"; // ✅ this is BarChart, not BarChart3 in MUI

// ✅ Inline SectionTab component
function SectionTab({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
        active
        ? "bg-blue-500/15 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
      }`}
      title={label}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}


// ✅ Main Header Center
export default function DashboardHeaderCenter() {
 
  const router = useRouter();
  const pathname = usePathname();

  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const clientOptions = ["All Clients", "Client A", "Client B", "Enterprise"];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* ✅ Client Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-full dark:bg-[#1C1F27] border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#2C2F36]"
        >
          <GroupIcon sx={{ fontSize: 18 }} className="text-gray-400" />
          <span className="text-gray-700 dark:text-gray-200">{selectedClient}</span>
          <ExpandMore
            sx={{ fontSize: 20 }}
            className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-48 bg-white dark:bg-[#1C1F27] border border-gray-300 dark:border-[#2C2F36] rounded-lg shadow z-10">
            {clientOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedClient(option);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

     {/* ✅ Section Tabs */}
<div className="flex flex-wrap gap-2">
  <SectionTab
    href="/dashboard/reports"
    label="Reports"
    icon={DescriptionIcon}
    active={pathname.startsWith("/dashboard/reports")}
  />
  <SectionTab
    href="/dashboard/analytics"
    label="Analytics"
    icon={BarChart3}
    active={pathname.startsWith("/dashboard/analytics")}
  />
  <SectionTab
    href="/dashboard/ai-seo"
    label="AI SEO"
    icon={SmartToyIcon}
    active={pathname.startsWith("/dashboard/ai-seo")}
  />
</div>

    </div>
  );
}
