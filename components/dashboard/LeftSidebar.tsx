"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import InsightsIcon from "@mui/icons-material/Insights";
import LayersIcon from "@mui/icons-material/Layers";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const sidebarItems = [
  { name: "Overview", href: "/dashboard", icon: DashboardIcon },
  { name: "SEO", href: "/seo", icon: BarChartIcon },
  { name: "Content", href: "/content", icon: DescriptionIcon },
  { name: "Technical", href: "/technical", icon: InsightsIcon },
  { name: "Smart Reports", href: "/reports", icon: LayersIcon },
  { name: "Clients", href: "/clients", icon: GroupIcon },
];

const settingsItems = [
  { name: "Quick Setup", href: "/setup", icon: SettingsIcon },
  { name: "Integrations", href: "/integrations", icon: LinkIcon },
];

export default function LeftSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => setCollapsed(!collapsed);

  const renderNavItem = (item: any) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Tooltip key={item.name}>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
              ${collapsed ? "justify-center" : ""}
              ${
                isActive
                  ? "bg-gray-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <Icon style={{ fontSize: 22 }} />
            {!collapsed && <span className="text-sm">{item.name}</span>}
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
      </Tooltip>
    );
  };

  return (
    <aside
      className={`h-screen border-r bg-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <TooltipProvider delayDuration={150}>
        {/* Toggle Button */}
        <div className="flex justify-end px-7 pt-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-black"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <MenuIcon fontSize="small" />
            ) : (
              <CloseIcon fontSize="small" />
            )}
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex flex-col gap-1 mt-6 px-2">
          {sidebarItems.map(renderNavItem)}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200 mx-4" />

        {/* Settings Nav */}
        <nav className="flex flex-col gap-1 px-2">
          {settingsItems.map(renderNavItem)}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
