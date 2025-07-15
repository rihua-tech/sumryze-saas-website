

"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <>
      {/* Only show Navigation if not on /dashboard */}
      {!isDashboard && <Navigation />}

      <main className="min-h-screen">{children}</main>

      {/* Always show Footer */}
      <Footer />
    </>
  )
}
