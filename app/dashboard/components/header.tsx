"use client";

// ✅ React and Next.js hooks
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import UrlSearchBar from "./UrlSearchBar";
import { useUserContext } from "@/app/context/UserContext";

// ✅ UI components
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  ExpandMore,
  Settings,
  CreditCard,
  Notifications,
  Star,
  Logout,
  Menu,
  Person,
} from "@mui/icons-material";

// ✅ Component props
interface HeaderProps {
  onMobileMenuToggle?: () => void;
  userName: string;
  userEmail: string;
}

export default function Header({
  onMobileMenuToggle,
  userName = "John Doe",
  userEmail = "john@example.com",
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isFreeUser } = useUserContext();

  const [mounted, setMounted] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  // ✅ User plan styling
  const user = { name: userName, email: userEmail, plan: isFreeUser ? "free" : "pro" };
  const planLabelMap: Record<string, string> = {
    free: "Free Plan",
    pro: "Pro Plan",
    enterprise: "Enterprise Plan",
  };
  const planStyleMap: Record<string, string> = {
    free: "bg-gray-700 text-white",
    pro: "bg-purple-600 text-white",
    enterprise: "bg-green-600 text-white",
  };
  const userPlan = planLabelMap[user.plan];
  const userPlanStyle = planStyleMap[user.plan];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
        setIsAvatarDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#12141C] border-b border-gray-200 dark:border-[#2C2F36] shadow-sm dark:shadow-xl backdrop-blur-sm transition-colors duration-300">

      <div className="w-full px-0 py-3">

        <div className="flex items-center justify-between w-full">

          {/* ✅ Left: Logo and Mobile Menu */}
        

            <div className="flex items-center gap-2 px-2 sm:px-3 md:px-4 lg:px-4 xl:px-5">

            <Button variant="ghost" size="icon" className="lg:hidden p-0" onClick={onMobileMenuToggle}>     

               <Menu className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11" strokeWidth={2.5} />
           </Button>

              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">

               <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12"> 
                    <Image
                      src="/images/Logo/Sumryze-Logo.svg"
                      alt="Sumryze Logo"

                       width={45}
                       height={45}
                  
                       className="object-contain"
                        />
                      </div>

                   <span className="hidden sm:inline text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                    Sumryze
                  </span>
              </Link>


          </div>

    

          {/* ✅ Center: Search Bar */}
         

       

          {/* ✅ Right: Theme + User Menu */}
          <div className=" flex items-center space-x-3">

         <div className="hidden  md:block ">
    
            <Link href="/pricing" passHref>
              <Button
                 className="h-8 px-4 py-1.5 text-sm font-medium 
               bg-indigo-500 hover:bg-indigo-600 
               text-white 
               rounded-md shadow-sm ml-4 
               transition-colors duration-200 ease-in-out"
              >
              Start Free Trial
             </Button>
            </Link>

            </div>

           
            {/* ✅ Right: Theme + User Menu 
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-gray-600 hover:scale-110 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
           */}
           
            <div className="relative" ref={avatarDropdownRef}>
              <button
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-[#1C1F27] rounded-full px-3 py-2"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                    <Person className="h-2 w-2 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <ExpandMore
                  sx={{ fontSize: 18 }}
                  className={`text-gray-500 dark:text-gray-400 transition-transform ${isAvatarDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {isAvatarDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1C1F27] border border-gray-200 dark:border-[#2C2F36] rounded-lg shadow-2xl dark:shadow-purple-500/10 z-10">
                  <div className="p-4 border-b border-gray-200 dark:border-[#2C2F36] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2C2F36]" onClick={() => router.push("/dashboard/profile")}>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                  </div>

                  <Link href="/dashboard" className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36]">
                    <DashboardIcon sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                    <span>Dashboard</span>
                  </Link>

                  {[{ icon: Settings, label: "Account Settings" }, { icon: CreditCard, label: "Billing & Subscription" }, { icon: Notifications, label: "Notifications" }].map((item, i) => (
                    <button
                      key={i}
                      role="menuitem"
                      tabIndex={0}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36]"
                    >
                      <item.icon sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}

                  <div className="border-t border-gray-200 dark:border-[#2C2F36] my-2 px-4 pt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    You are on:
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${userPlanStyle}`}>{userPlan}</span>
                  </div>

                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10">
                    <Star sx={{ fontSize: 20 }} />
                    <span className="font-medium">Upgrade to Pro</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                    <Logout sx={{ fontSize: 20 }} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
