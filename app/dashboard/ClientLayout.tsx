"use client";

import { useState } from "react";


import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import { usePathname } from "next/navigation";
import { UserProvider } from "@/app/context/UserContext"; // ✅ Import your provider

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  // Hide sidebar only for special pages
  const hideSidebar = ["/dashboard/privacy", "/dashboard/terms"].includes(pathname);

  return (
    <UserProvider> {/* ✅ Wrap everything inside */} 
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0F1117] transition-colors duration-300">
      {/* ✅ Header */}
      <Header
        onMobileMenuToggle={toggleMobileSidebar}
        userName="Your User Name"
        userEmail="user@example.com"
      />

      {/* ✅ Responsive Layout */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-[calc(100vh-4rem)]">
        {/* ✅ Sidebar (hidden for Privacy/Terms) */}
        {!hideSidebar && (
          <Sidebar
            isCollapsed={!sidebarOpen}
            toggleSidebar={toggleSidebar}
            isMobileOpen={isMobileSidebarOpen}
            onMobileClose={closeMobileSidebar}
          />
        )}

        {/* ✅ Main Content + Footer */}
      
          <div className="w-full lg:flex-1 flex flex-col transition-all duration-300">
          <main className={`flex-1  ${hideSidebar ? "p-0" : "p-0"}`}>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
    </UserProvider>
  );
}
