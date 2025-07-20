"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, ChevronDown, Calendar, Moon, Sun, Settings, CreditCard, Bell, Users, RefreshCw, Crown, LogOut, TrendingUp, BarChart3 } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [dateRange, setDateRange] = useState("Last 30 days");

  const clients = ["All Clients", "Client A", "Client B", "Client C"];
  const dateRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 transition-colors">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side */}
        <div className="flex items-center gap-2 px-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          
           <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">

           
           <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/25">
             
            <Image
                 src="/images/Logo/Sumryze-Logo.svg"

                 alt="Sumryze Logo"
                 width={28}
                 height={28}
                 className="object-contain"
                 />
            </div>
           <span
              className="
               text-base sm:text-xl md:text-2xl font-black
               bg-gradient-to-r from-indigo-600 to-purple-600
               dark:from-purple-500 dark:to-blue-500
                bg-clip-text text-transparent
               hover:from-indigo-700 hover:to-purple-700
               dark:hover:from-purple-400 dark:hover:to-blue-400
               transition-all duration-200">
                   Sumryze
            </span>
          </Link>
        </div>

        {/* Center - Desktop Search + Filters */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-[280px] h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg"
            />
          </div>

          {/* Client Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-200">
                {selectedClient}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {clients.map((client) => (
                <DropdownMenuItem key={client} onClick={() => setSelectedClient(client)}>
                  {client}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Range */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 px-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 dark:text-gray-200">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {dateRanges.map((range) => (
                <DropdownMenuItem key={range} onClick={() => setDateRange(range)}>
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex items-center justify-center"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Sun className="h-4 w-4 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Avatar Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  R
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">rihua</span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Account Settings</DropdownMenuItem>
              <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /> Billing & Subscription</DropdownMenuItem>
              <DropdownMenuItem><Bell className="mr-2 h-4 w-4" /> Notifications</DropdownMenuItem>
              <DropdownMenuItem><Users className="mr-2 h-4 w-4" /> Team Settings</DropdownMenuItem>
              <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" /> Switch Client</DropdownMenuItem>
              <DropdownMenuItem><Crown className="mr-2 h-4 w-4 text-purple-600" /> Upgrade to Pro</DropdownMenuItem>
              <DropdownMenuItem><LogOut className="mr-2 h-4 w-4 text-red-600" /> Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
