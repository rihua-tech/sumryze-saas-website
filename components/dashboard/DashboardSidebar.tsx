"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  FileText,
  Users,
  LineChart,
  Layers,
  Settings,
  DollarSign,
  UserCog,
  Link as LinkIcon,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Templates", href: "/dashboard/templates", icon: Layers },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "Integrations", href: "/dashboard/integrations", icon: LinkIcon },
  { name: "Billing", href: "/dashboard/billing", icon: DollarSign },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Team Settings", href: "/dashboard/team", icon: UserCog },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 hidden md:block">
  

      {/* Nav Menu */}
      <nav className="space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
