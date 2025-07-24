

"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <>
      {/* Only show Navigation if not on /dashboard */}
      {!isDashboard && <Navigation />}

      <main className="min-h-screen">{children}</main>

        {/* Show Footer only if NOT dashboard */}
      {!isDashboard && <Footer/>}

     
      
    </>
  )
}
