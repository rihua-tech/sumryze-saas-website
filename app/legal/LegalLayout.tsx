"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/app/dashboard/components/Header";
import Footer from "@/app/dashboard/components/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0F1117] transition-colors duration-300">
        <Header userName="" userEmail="" />
        <main className="flex-1 container mx-auto p-6">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
