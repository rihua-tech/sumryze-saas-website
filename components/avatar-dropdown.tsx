"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Settings, CreditCard, Bell, Crown, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvatarDropdownProps {
  username?: string
  plan?: "Free" | "Pro"
  avatarUrl?: string
}

export function AvatarDropdown({ username = "rihua", plan = "Free", avatarUrl }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    {
      icon: Settings,
      label: "Account Settings",
      href: "/settings",
      action: () => console.log("Navigate to settings"),
    },
    {
      icon: CreditCard,
      label: "Billing & Subscription",
      href: "/billing",
      action: () => console.log("Navigate to billing"),
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      action: () => console.log("Navigate to notifications"),
    },
  ]

  return (
    <div className="relative">
      {/* Avatar Button - Pill shaped with border */}
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden flex-shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl || "/placeholder.svg"} alt={username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-white">{getInitials(username)}</span>
          )}
        </div>

        {/* Username */}
        <span className="text-sm font-medium text-gray-900">{username}</span>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Signed in as</p>
                <p className="text-sm text-gray-600">{username}</p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  plan === "Pro"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-gray-50 text-gray-700 border-gray-200",
                )}
              >
                {plan}
              </Badge>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action()
                  setIsOpen(false)
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 focus:bg-gray-50 focus:text-gray-900 focus:outline-none"
              >
                <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-2" />

          {/* Upgrade Button - Only show for Free plan */}
          {plan === "Free" && (
            <>
              <div className="px-2 py-1">
                <button
                  onClick={() => {
                    console.log("Navigate to upgrade")
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-150 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </button>
              </div>
              <div className="border-t border-gray-100 my-2" />
            </>
          )}

          {/* Sign Out */}
          <div className="px-2 py-1">
            <button
              onClick={() => {
                console.log("Sign out")
                setIsOpen(false)
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-150 focus:bg-red-50 focus:text-red-700 focus:outline-none"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
