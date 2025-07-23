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
  X, // 'X' icon for close button
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the props interface for the Sidebar component
interface SidebarProps {
  isCollapsed: boolean; // State for desktop sidebar collapse/expand
  toggleSidebar: () => void; // Function to toggle desktop sidebar
  isMobileOpen: boolean; // State for mobile sidebar open/close
  onMobileClose: () => void; // Function to close mobile sidebar
}

// Array of menu items with their names, icons, and hrefs
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
  onMobileClose, // Destructure the onMobileClose function from props
}: SidebarProps) {
  const pathname = usePathname(); // Get current pathname for active link highlighting

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      {/* This sidebar is visible on large screens (lg) and hides on smaller screens */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 hidden lg:flex flex-col ${
          isCollapsed ? "w-16" : "w-64" // Adjust width based on isCollapsed state
        }`}
      >
        {/* Collapse Button for Desktop Sidebar */}
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar} // Calls toggleSidebar to collapse/expand desktop sidebar
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation links for Desktop Sidebar */}
        <nav className="px-3 space-y-3 overflow-y-auto scrollbar-thin">
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
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Mobile Sidebar */}
      {/* This sidebar is hidden on large screens (lg) and visible on smaller screens */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full" // Controls visibility based on isMobileOpen
        }`}
      >
        {/* Header for Mobile Sidebar with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose} // This is the close button for the mobile sidebar
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation links for Mobile Sidebar */}
        <nav className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={onMobileClose} // Closes the mobile sidebar when a navigation item is clicked
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

      {/* ✅ Mobile Overlay */}
      {/* This overlay appears when the mobile sidebar is open, providing a backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose} // Clicking the overlay also closes the mobile sidebar
        />
      )}
    </>
  );
}
