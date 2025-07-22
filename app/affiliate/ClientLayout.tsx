"use client"

import { useState } from "react"
import type React from "react"

import Header from "@/app/dashboard/components/Header1";
import Sidebar from "@/app/dashboard/components/Sidebar";
import Footer from "@/app/dashboard/components/Footer";



export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0F1117] transition-colors duration-300">
      

      <Header
        onMobileMenuToggle={toggleMobileSidebar}
        userName="Your User Name"
        userEmail="user@example.com"
      />

        
        {/* Sidebar */}
        <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
        

      
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />

      <main className="lg:ml-64 transition-all duration-300 flex-1">{children}</main>
      
      <Footer />

    </div>
  )
}
