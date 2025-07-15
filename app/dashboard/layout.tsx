import "../globals.css";
import { Inter } from "next/font/google";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | Sumryze",
  description: "Your SEO reports dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider delayDuration={100}>
          <div className="bg-gray-50">
            {/* Header always on top */}
            <DashboardHeader />

            {/* Sidebar under header */}
            <div className="flex">
              <LeftSidebar />
              {/* Page content beside sidebar */}
              <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
