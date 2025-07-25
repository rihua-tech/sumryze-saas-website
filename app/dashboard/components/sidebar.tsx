"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Settings2,
  Users,
  Wrench,
  Link as LinkIcon,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "AI SEO", icon: Bot, href: "/dashboard/ai-seo" },
  { name: "Technical", icon: Settings2, href: "/dashboard/technical" },
  { name: "Clients", icon: Users, href: "/dashboard/clients" },
  { name: "Quick Setup", icon: Wrench, href: "/dashboard/setup" },
  { name: "Integrations", icon: LinkIcon, href: "/dashboard/integrations" },
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
      {/* ✅ Desktop Sidebar - NOT fixed */}
      <aside
      className={`hidden lg:flex flex-col bg-white dark:bg-[#12141C] border-r border-gray-200 dark:border-[#2C2F36] transition-all duration-300 ${

       
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                  isActive
                          
                 ? "bg-blue-500/15 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 dark:hover:bg-blue-500/25"
                 : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"

        
                }`}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
              
            );
          })}
        </nav>
      </aside>

      {/* ✅ Mobile Sidebar - still overlay */}
      <aside
        
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-[#12141C] border-r border-gray-200 dark:border-[#2C2F36] z-50 transition-transform duration-300 lg:hidden ${

          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onMobileClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
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

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onMobileClose} />
      )}
    </>
  );
}
