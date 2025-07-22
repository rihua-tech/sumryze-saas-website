"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // ✅ For dynamic active state
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
import { Button } from "@/components/ui/button"; // ✅ ShadCN UI

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ease-in-out hidden lg:flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        aria-label="Main Sidebar Navigation"
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* ✅ Navigation */}
        <nav
          className="px-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
          role="menu"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 transition-opacity duration-300">{item.name}</span>
                )}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Sidebar Navigation"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4 space-y-2" role="menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                role="menuitem"
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
