import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/layout/ClientLayout"

import { ThemeProvider } from "next-themes"; // ✅ Add this

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sumryze - White-Label AI Reporting Platform",
  description: "Automated SEO + AI-powered analytics reports for agencies, consultants, and SaaS businesses",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>

        {/* ✅ Wrap entire app in ThemeProvider */}
        
          <ClientLayout>{children}</ClientLayout>
       

      </body>
    </html>
  )
}