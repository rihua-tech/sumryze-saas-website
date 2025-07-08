"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

type Props = {
  user: {
    name?: string
    isAffiliate: boolean
    isSubscriber: boolean
  }
}

export function AffiliateDropdownMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:shadow-sm">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-purple-600 text-white uppercase">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-800">{user.name || "User"}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Affiliate Panel</DropdownMenuLabel>

        {user?.isSubscriber && (
          <DropdownMenuItem asChild>
            <Link href="/subscriber/dashboard">📊 Subscriber Dashboard</Link>
          </DropdownMenuItem>
        )}

        {user?.isAffiliate && (
          <DropdownMenuItem asChild>
            <Link href="/affiliate/dashboard">💸 Affiliate Panel</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/affiliate/settings">⚙️ Account Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => alert("TODO: logout logic")}>
          🚪 Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
