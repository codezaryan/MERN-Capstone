"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { PenSquare, Home, User, LogOut, LogIn } from "lucide-react"

interface BlogHeaderProps {
  currentView: string
  onNavigate: (view: "home" | "post" | "create" | "profile") => void
  onShowAuth: () => void
}

export function BlogHeader({ currentView, onNavigate, onShowAuth }: BlogHeaderProps) {
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-primary cursor-pointer border-gray-50" onClick={() => onNavigate("home")}>
            BlogSpace
          </h1>
          
          {/* Mobile Write Post button - only show if user is logged in */}
          {user && (
            <Button
              variant={currentView === "create" ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate("create")}
              className="md:hidden flex items-center text-white"
            >
              <PenSquare className="h-6 w-6" />
            </Button>
          )}

          <nav className="hidden md:flex items-center space-x-4">
            <Button variant={currentView === "home" ? "default" : "ghost"} size="sm" onClick={() => onNavigate("home")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>

            {user && (
              <Button
                variant={currentView === "create" ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate("create")}
                className="flex items-center"
              >
                <PenSquare className="h-4 w-4 mr-2" />
                Write Post
              </Button>
            )}
          </nav>
        </div>
       
        <div className="flex items-center space-x-4">
          <div className="rounded-lg text-black dark:text-white">
            <ThemeToggle />
          </div>
           
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate("profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {/* Write Post option in dropdown for mobile view */}
                  <DropdownMenuItem onClick={() => onNavigate("create")} className="md:hidden">
                    <PenSquare className="mr-2 h-4 w-4" />
                    Write Post
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={onShowAuth}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}