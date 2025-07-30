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
      className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all duration-300 ${
        active
          ? "bg-blue-500/15 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400"
          : "text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
      }`}
      title={label}
    >
      <Icon sx={{ fontSize: 14 }} />
      <span className="tracking-tight">{label}</span>
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
    <div className="flex flex-wrap items-center justify-start gap-2">
  {/* ✅ Client Selector */}
  <div className="relative" ref={dropdownRef}>

    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium text-gray-800 bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#2A2F3A] transition-all duration-200"
    >
      <GroupIcon sx={{ fontSize: 14 }} className="text-gray-500" />
      <span>{selectedClient}</span>
      <ExpandMore
        sx={{ fontSize: 14 }}
        className={`text-gray-400 transition-transform ${
          isDropdownOpen ? "rotate-180" : "rotate-0"
        }`}
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
  <div className="flex gap-2 flex-wrap">
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
