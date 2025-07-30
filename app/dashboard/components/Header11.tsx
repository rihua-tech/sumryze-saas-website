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
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import BarChartIcon from "@mui/icons-material/BarChart";
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
  const pathname = usePathname();

  // ✅ Dropdown state
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("Reports");
  const [mounted, setMounted] = useState(false);

  // ✅ DOM refs for closing dropdowns
  const clientDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Client list
  const clientOptions = ["All Clients", "Client A", "Client B", "Client C", "Enterprise Corp"];

  // ✅ Top center tabs
  const modes = [
    { name: "Reports", icon: DescriptionIcon, href: "/dashboard/reports" },
    { name: "Analytics", icon: BarChartIcon, href: "/dashboard/analytics" },
    { name: "AI SEO", icon: SmartToyIcon, href: "/dashboard/ai-seo" },
  ];

  // ✅ Mock user data
  const user = {
    name: "rihua",
    email: "user@example.com",
    plan: "free",
  };

  // ✅ User plan label & styles
  const planLabelMap: Record<string, string> = {
    free: "Free Plan",
    pro: "Pro Plan",
    enterprise: "Enterprise Plan",
  };

  const userPlan = planLabelMap[user?.plan] || "Free Plan";

  const planStyleMap: Record<string, string> = {
    free: "bg-gray-700 text-white",
    pro: "bg-purple-600 text-white",
    enterprise: "bg-green-600 text-white",
  };

  const userPlanStyle = planStyleMap[user?.plan] || planStyleMap["free"];

  const { isFreeUser } = useUserContext();
  <UrlSearchBar isFreeUser={isFreeUser} />


  

  // ✅ Mount check for hydration
  useEffect(() => setMounted(true), []);

  // ✅ Close dropdowns when clicking outside
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

  // ✅ Highlight active tab based on pathname
  useEffect(() => {
    const current = modes.find((mode) => pathname.includes(mode.href));
    if (current) setActiveMode(current.name);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#12141C] border-b border-gray-200 dark:border-[#2C2F36] shadow-sm dark:shadow-xl backdrop-blur-sm transition-colors duration-300">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between w-full">
          {/* ✅ Left side: Logo and mobile menu */}
          <div className="flex items-center gap-2 px-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMobileMenuToggle}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
                <Image src="/images/Logo/Sumryze-Logo.svg" alt="Sumryze Logo" width={28} height={28} />
              </div>
              <span className="text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                Sumryze
              </span>
            </Link>
          </div>

        
        
          <UrlSearchBar isFreeUser={user.plan === "free"} />

          {/* ✅ Right section: Theme toggle and user menu */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-gray-600 hover:scale-110 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Avatar dropdown */}
            <div className="relative" ref={avatarDropdownRef}>
              <button
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-[#1C1F27] rounded-full px-3 py-2"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-900">
                    <Person className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <ExpandMore
                  sx={{ fontSize: 20 }}
                  className={`text-gray-500 dark:text-gray-400 transition-transform ${isAvatarDropdownOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {/* ✅ Avatar dropdown content */}
              {isAvatarDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1C1F27] border border-gray-200 dark:border-[#2C2F36] rounded-lg shadow-2xl dark:shadow-purple-500/10 z-10">
                  {/* Profile section */}
                  <div className="p-4 border-b border-gray-200 dark:border-[#2C2F36] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2C2F36]" onClick={() => router.push("/dashboard/profile")}>  
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                  </div>

                  {/* Dashboard link */}
                  <Link href="/dashboard" className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2C2F36]">
                    <DashboardIcon sx={{ fontSize: 20 }} className="text-gray-500 dark:text-gray-400" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Settings links */}
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

                  {/* Plan info */}
                  <div className="border-t border-gray-200 dark:border-[#2C2F36] my-2 px-4 pt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    You are on:
                    <span
                      title="Your current subscription plan"
                      className={`px-2 py-0.5 rounded text-xs font-medium ${userPlanStyle} hover:opacity-90 transition-opacity duration-200`}
                    >
                      {userPlan}
                    </span>
                  </div>

                  {/* Upgrade & logout */}
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
