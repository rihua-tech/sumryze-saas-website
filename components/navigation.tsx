"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AffiliateDropdownMenu } from "@/components/ui/AffiliateDropdownMenu";
import { ChevronDown } from "lucide-react";





export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const user = {
  role: "Rihua", // temporary mock; replace with real auth data later
  isAffiliate: false, // or false depending on actual logic
  isSubscriber: false, // or false depending on actual logic
}



  const navItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    
    { href: "/blog", label: "Blog" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <div className="flex items-center ">
           
            <Link href="/" className=" flex items-center space-x-2 group ">
            <img
            src="/images/logo-icon.svg"
            alt="Sumryze Logo"
            className="w-9 h-9 sm:w-10 sm:h-9 transition-transform duration-200 group-hover:scale-105 align-middle"
             />
              <span className="text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 ">
               Sumryze
             </span>

             </Link>
            
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs font-medium transition-colors duration-200 px-2 py-1",
                    isActive(item.href) ? "text-indigo-600 font-bold" : "text-gray-700 hover:text-indigo-600",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>       

   <div className="hidden md:flex items-center space-x-3">

  {user?.isAffiliate ? (
    <AffiliateDropdownMenu user={{ ...user, name: user.role }} />
  ) : (
    <>
      <Link href="/login">
        <Button variant="outline" className="bg-white border border-gray-300 text-gray-900 font-medium">
          Login
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium">
          Sign Up
        </Button>
      </Link>
    </>
  )}

</div>

         

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="h-10 w-10 p-0">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-sm font-semibold transition-colors duration-200",
                  isActive(item.href) ? "text-indigo-600 font-bold" : "text-gray-700 hover:text-indigo-600",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4">
              <Link href="/login" onClick={() => setIsOpen(false)}>
               <Button
              
              variant="outline"
              className="w-full justify-center bg-white border border-gray-300 text-gray-900 font-medium text-sm py-3 mb-3"
              >
             Login
            </Button>
             </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
            <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm py-3 rounded-md shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
             >
            Sign Up
          </Button>
        </Link>
      </div>

          </div>
        </div>
      )}
    </nav>
  )
}
