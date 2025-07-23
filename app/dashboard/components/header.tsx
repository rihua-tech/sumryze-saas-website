"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DescriptionIcon from "@mui/icons-material/Description";  // For Reports
import SmartToyIcon from "@mui/icons-material/SmartToy";        // For AI SEO
import GroupIcon from "@mui/icons-material/Group";              // For Clients
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react"; // For theme toggle

import {
  ExpandMore,
 
  Settings,
  CreditCard,
  Notifications,
  Group,
  SwapHoriz,
  Star,
  Logout,

  Menu,
  Person,
} from "@mui/icons-material";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  userName: string;
  userEmail: string;

}


// ✅ FIX: Wrap everything inside function

  export default function Header({ onMobileMenuToggle,userName = "John Doe",
  userEmail = "john@example.com", }: HeaderProps) {

  // ✅ FIX: Move hooks inside function
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // ✅ FIX: Move state inside function

  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("Reports");
  const [mounted, setMounted] = useState(false);

  const clientDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  const clientOptions = ["All Clients", "Client A", "Client B", "Client C", "Enterprise Corp"];

  // ✅ FIX: Move modes inside component
  

  const modes = [
  { name: "Reports", icon: DescriptionIcon, href: "/dashboard/reports" },
  { name: "AI SEO", icon: SmartToyIcon, href: "/dashboard/ai-seo" },
];


  useEffect(() => setMounted(true), []);
 

  // ✅ FIX: Keep useEffect inside function
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target as Node)) {
        setIsClientDropdownOpen(false);
      }
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
        setIsAvatarDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

   if (!mounted) return null; // Prevents SSR hydration mismatch


  // ✅ FIX: Now return is valid
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#12141C] border-b border-gray-200 dark:border-[#2C2F36] shadow-sm dark:shadow-xl backdrop-blur-sm transition-colors duration-300">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between w-full">

          {/* Left Section (Unchanged) */}
          <div className="flex items-center gap-2 px-4">
            
                        <Button variant="ghost" size="icon" className="lg:hidden"   onClick={onMobileMenuToggle}>

                            <Menu className="h-5 w-5" />
                      </Button>



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
              <span className="text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                Sumryze
              </span>
            </Link>
          </div>

          {/* Center Section */}
          <div className="hidden lg:flex justify-center items-center gap-4">
            
            {/* Mode Switch */}
            <div className="flex items-center gap-3">
              {modes.map((mode) => (
                <button
                  key={mode.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMode(mode.name);
                    router.push(mode.href);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
                    activeMode === mode.name
                      ? "border-transparent bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                      : "border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <mode.icon className="h-3 w-3" />
                  {mode.name}
                </button>
              ))}
            </div>

            
           {/* Client Dropdown */}
<div className="relative" ref={clientDropdownRef}>
  <button
    onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
    aria-haspopup="true"
    aria-expanded={isClientDropdownOpen}
    aria-controls="client-menu"
    className="flex items-center space-x-2 px-3 py-1.5 dark:bg-[#1C1F27] border border-gray-200 dark:border-[#2C2F36] rounded-full text-sm hover:bg-gray-100 dark:hover:bg-[#2C2F36] focus:outline-none"
  >
    <GroupIcon sx={{ fontSize: 18 }} className="text-gray-400" />
    <span className="text-gray-700 dark:text-gray-200">{selectedClient}</span>
    <ExpandMore
      sx={{ fontSize: 20 }}
      className={`text-gray-400 transition-transform duration-300 ${isClientDropdownOpen ? "rotate-180" : ""}`}
    />
  </button>

  {isClientDropdownOpen && (
    <div
      id="client-menu"
      role="menu"
      aria-label="Client Selection"
      className="absolute top-full mt-2 w-48 bg-white dark:bg-[#1C1F27] border border-gray-200 dark:border-[#2C2F36] rounded-lg shadow-lg dark:shadow-xl z-10"
    >
      {clientOptions.map((option) => (
        <button
          key={option}
          role="menuitem"
          tabIndex={0} // ✅ Allows keyboard navigation
          onClick={() => {
            setSelectedClient(option);
            setIsClientDropdownOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSelectedClient(option);
              setIsClientDropdownOpen(false);
            }
            if (e.key === "Escape") {
              setIsClientDropdownOpen(false);
            }
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors focus:outline-none"
        >
          {option}
        </button>
      ))}
    </div>
  )}
</div>


 </div>

        
                     {/* Right Section: Theme Toggle + Avatar */}
                  <div className="flex items-center space-x-4">

                    
          
             <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Toggle theme"
               >
              {theme === "dark" ? (
             <Sun className="h-5 w-5 transition-transform duration-300 rotate-180" />
             ) : (
             <Moon className="h-5 w-5 transition-transform duration-300 rotate-0" />
               )}
            </button>

                     
        
                    {/* Avatar with Dropdown */}
                    <div className="relative" ref={avatarDropdownRef}>
                      <button
                        onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                        className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-[#1C1F27] rounded-full px-3 py-2 transition-colors duration-300"
                      >
                        
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                        <Person className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                     </div>
                        
                        <ExpandMore
                          sx={{ fontSize: 20 }}
                          className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isAvatarDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
        
                      {isAvatarDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1C1F27] border border-gray-200 dark:border-[#2C2F36] rounded-lg shadow-lg dark:shadow-xl z-10 transition-colors duration-300">
                          <div className="py-2">

                             {/* ✅ User Info Section */}
                          <div className="p-4 border-b border-gray-200 dark:border-[#2C2F36]">
                          
                           <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{userName}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>

                          </div>

                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300">
                              <Settings sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                              <span>Account Settings</span>
                            </button>

                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300">
                              <CreditCard sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                              <span>Billing & Subscription</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300">
                              <Notifications sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                              <span>Notifications</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300">
                              <Group sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                              <span>Team Settings</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36] hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300">
                              <SwapHoriz sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                              <span>Switch Client</span>
                            </button>
        
                            <div className="border-t border-gray-200 dark:border-[#2C2F36] my-2"></div>
        
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300">
                              <Star sx={{ fontSize: 20 }} className="text-purple-600 dark:text-purple-400" />
                              <span className="font-medium">Upgrade to Pro</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 mb-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300">
                              <Logout sx={{ fontSize: 20 }} className="text-red-600 dark:text-red-400" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                   </div>
      </div>
      </div>
    </header>
  );
}
