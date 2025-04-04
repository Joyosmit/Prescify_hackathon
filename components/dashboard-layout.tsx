"use client"

import { type ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "./sidebar"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  LogOut, 
  Menu, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  HelpCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
  role: "Doctor" | "Patient" | "Pharmacist" | "Verifier"
  username?: string
}

export function DashboardLayout({ children, role, username = "User" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const roleColors = {
    Doctor: "from-blue-500 to-blue-700",
    Patient: "from-emerald-500 to-emerald-700",
    Pharmacist: "from-amber-500 to-amber-700",
    Verifier: "from-purple-500 to-purple-700"
  }

  const roleIcons = {
    Doctor: <path d="M8 9h8m-4-4v8m-8 0h2a2 2 0 002-2v-4a2 2 0 00-2-2H4" />,
    Patient: <path d="M16 4h2a2 2 0 012 2v5a2 2 0 01-2 2h-2m-4 0H8a2 2 0 01-2-2V6a2 2 0 012-2h4m0 16s1.5-1 3-1 3 1 3 1" />,
    Pharmacist: <path d="M7 10h10m-5-5v10M6 3v18m12-18v18" />,
    Verifier: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <Sidebar role={role} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={cn(
          "flex justify-between items-center px-4 py-3 sticky top-0 backdrop-blur transition-shadow z-30",
          scrolled && "shadow-md border-b"
        )}>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex items-center gap-2">
              <div className={cn("h-9 w-9 rounded-md flex items-center justify-center text-white bg-gradient-to-br", roleColors[role])}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {roleIcons[role]}
                </svg>
              </div>
              <span className="text-lg font-semibold">Prescify</span>
            </Link>

            <span className={cn(
              "hidden md:inline-block px-3 py-1 text-sm font-medium rounded-lg",
              `bg-${role.toLowerCase()}-100 dark:bg-${role.toLowerCase()}-900/30 text-${role.toLowerCase()}-700 dark:text-${role.toLowerCase()}-400`
            )}>
              {role} Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <ModeToggle />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Resources</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 h-9">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="" />
                    <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block text-sm font-medium">{username}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}