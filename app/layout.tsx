import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"



import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });



export const metadata: Metadata = {
  title: "Sumryze | SEO Reports & AI Content Automation",
  description:
    "Automate SEO reports, track performance, and create AI-powered content with Sumryze. Optimize strategies effortlessly.",
  other: {
    keywords:
      "SEO automation, AI SEO tools, automated SEO reports, SEO analytics dashboard, AI content optimization, SEO reporting platform"
  },
  openGraph: {
    title: "Sumryze | Automated SEO Reports & AI-Powered Content",
    description:
      "Boost your SEO strategy with Sumryze. Automate reports and generate AI-optimized content—all in one powerful platform.",
    url: "https://sumryze.com",
    siteName: "Sumryze",
    images: [
      {
        url: "https://sumryze.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sumryze SEO Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumryze | SEO Reports & AI Content Automation",
    description:
      "The ultimate SEO platform for agencies and businesses. Automate reports and create AI-powered content in seconds.",
    images: ["https://sumryze.com/images/og-image.png"]
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
   <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  )
}
