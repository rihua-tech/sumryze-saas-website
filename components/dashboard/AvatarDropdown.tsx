"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const menuItems = [
    { emoji: "⚙️", label: "Account Settings", href: "/settings" },
    { emoji: "💳", label: "Billing & Subscription", href: "/billing" },
    { emoji: "🔔", label: "Notifications", href: "/notifications" },
    { emoji: "👥", label: "Team Settings", href: "/team" },
    { emoji: "🔄", label: "Switch Client", href: "/switch-client" },
  ]

  return (
    <div className="relative z-50">
      <Button
        ref={buttonRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 h-10 rounded-full border bg-white hover:bg-gray-50 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-600 flex items-center justify-center text-white text-sm font-semibold">
          {avatarUrl ? (
            <img src={avatarUrl} alt={username} className="w-full h-full object-cover rounded-full" />
          ) : (
            getInitials(username)
          )}
        </div>
        <span className="text-sm font-medium text-gray-900">{username}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-180")}
        />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 flex items-center">
              🧍 Signed in as
            </p>
            <p className="text-sm text-gray-700 mt-0.5">
              {username} <span className="text-gray-400">({plan})</span>
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="py-2">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                >
                  <span className="mr-3 text-xl">{item.emoji}</span>
                  {item.label}
                </a>
              ))}
            </div>

            {plan === "Free" && (
              <div className="py-2">
                <a
                  href="/upgrade"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  <span className="mr-3 text-xl">👑</span>
                  Upgrade to Pro
                </a>
              </div>
            )}

            <div className="py-2">
              <button
                onClick={() => {
                  console.log("Sign out")
                  setIsOpen(false)
                }}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <span className="mr-3 text-xl">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
