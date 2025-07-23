"use client";

import { useState } from "react";
import Header from "@/app/dashboard/components/Header";
import Sidebar from "@/app/dashboard/components/Sidebar";
import Footer from "@/app/dashboard/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop collapse
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile drawer

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F1117] transition-colors duration-300">
      {/* ✅ Header */}
      <Header
        onMobileMenuToggle={toggleMobileSidebar}
        userName="Your User Name"
        userEmail="user@example.com"
      />

      {/* ✅ Responsive Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />

        {/* ✅ Main Content + Footer */}
        <div className="w-full lg:flex-1 flex flex-col transition-all duration-300">
          <main className="flex-1 p-2">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
