"use client";

import { usePathname } from "next/navigation";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import HubIcon from "@mui/icons-material/Hub";
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  SmartToy as SmartToyIcon,
  Group as GroupIcon,
  Menu,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  { name: "Reports", icon: DescriptionIcon, href: "/dashboard/reports" },
  { name: "Clients", icon: GroupIcon, href: "/dashboard/clients" },
  { name: "Quick Setup", icon: SettingsSuggestIcon, href: "/dashboard/setup" },
  { name: "Integrations", icon: HubIcon, href: "/dashboard/integrations" },
];

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-[#12141C] border-r border-gray-200 dark:border-[#2C2F36] transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Top bar: hamburger (always) + close (only when open) */}
        <div
          className={`flex items-center p-4 pb-2 ${
            isCollapsed ? "justify-start" : "justify-between"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
            className="rounded-lg p-2"
          >
            <Menu className="h-6 w-6 opacity-80" />
          </Button>

          {/* show Close on the right only when open */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              title="Close sidebar"
              className="rounded-lg p-2"
            >
              <CloseIcon className="h-6 w-6 opacity-80" />
            </Button>
          )}
        </div>

        {/* Nav */}
        <nav className="px-3 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <a
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                } px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-blue-500/15 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 dark:hover:bg-blue-500/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Mobile Sidebar (overlay) */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-[#12141C] border-r border-gray-200 dark:border-[#2C2F36] z-50 transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onMobileClose} aria-label="Close menu">
            <CloseIcon className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileClose} />
      )}
    </>
  );
}
