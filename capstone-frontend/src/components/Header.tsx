"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Menu, User, LogOut, Settings } from "lucide-react"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const getInitials = (name?: string): string => {
    if (!name || typeof name !== 'string') return "U"
    return name.charAt(0).toUpperCase()
  }

  const getDisplayName = (): string => {
    return user?.name || "User"
  }

  const getDisplayEmail = (): string => {
    return user?.email || "user@example.com"
  }

  const getAvatarUrl = (): string => {
    return user?.avatar || "/admin-avatar.png"
  }

  const getAvatarAlt = (): string => {
    return user?.name || "User"
  }

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
      <Button 
        variant="ghost" 
        size="sm" 
        className="lg:hidden" 
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-4 ml-auto">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={getAvatarUrl()} 
                  alt={getAvatarAlt()} 
                  onError={(e) => {
                    e.currentTarget.src = "/admin-avatar.png"
                  }}
                />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{getDisplayName()}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {getDisplayEmail()}
                </p>
              </div>
            </div>
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
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
