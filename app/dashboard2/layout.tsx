import "../globals.css";
import { Inter } from "next/font/google";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | Sumryze",
  description: "Your SEO reports dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* ✅ Header */}
        <DashboardHeader />

        <div className="flex flex-1">
          {/* ✅ Sidebar */}
          <LeftSidebar />

          {/* ✅ Main content beside sidebar */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>

        {/* ✅ Footer */}
        <DashboardFooter />
      </div>
    </TooltipProvider>
  );
}

