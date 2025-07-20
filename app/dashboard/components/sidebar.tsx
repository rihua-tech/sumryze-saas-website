"use client"

import { useState } from "react"
import { LayoutDashboard, BarChart3, FileText, Settings2, Layers, Users, Wrench, Link, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard", active: true },
  { name: "SEO", icon: BarChart3, href: "/dashboard/seo", active: false },
  { name: "Content", icon: FileText, href: "/dashboard/content", active: false },
  { name: "Technical", icon: Settings2, href: "/dashboard/technical", active: false },
  { name: "Smart Reports", icon: Layers, href: "/dashboard/reports", active: false },
  { name: "Clients", icon: Users, href: "/dashboard/clients", active: false },
  { name: "Quick Setup", icon: Wrench, href: "/dashboard/setup", active: false },
  { name: "Integrations", icon: Link, href: "/dashboard/integrations", active: false },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ease-in-out hidden lg:block ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="ml-3 transition-opacity duration-300">{item.name}</span>}
              </a>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
