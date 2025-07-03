import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

import { Footer } from "@/components/footer"




const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sumryze - White-Label AI Reporting Platform",
  description: "Automated SEO + AI-powered analytics reports for agencies, consultants, and SaaS businesses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
