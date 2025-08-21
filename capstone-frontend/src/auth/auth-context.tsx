"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"
import { toast } from "sonner"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await authService.getCurrentUser()
          if (response.success && response.user) {
            setUser(response.user as User)
          } else {
            // Token is invalid or expired
            localStorage.removeItem("token")
            localStorage.removeItem("blog-user")
          }
        } catch (error) {
          console.error("Auth initialization error:", error)
          localStorage.removeItem("token")
          localStorage.removeItem("blog-user")
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      const response = await authService.login({ email, password })
      
      if (response.success && response.token && response.user) {
        setUser(response.user as User)
        localStorage.setItem("token", response.token)
        localStorage.setItem("blog-user", JSON.stringify(response.user))
        toast.success("Login successful!")
        return { success: true }
      } else {
        const errorMessage = response.message || "Login failed"
        toast.error(errorMessage)
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again."
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      
      const response = await authService.register({ name, email, password })
      
      if (response.success && response.token && response.user) {
        setUser(response.user as User)
        localStorage.setItem("token", response.token)
        localStorage.setItem("blog-user", JSON.stringify(response.user))
        toast.success("Registration successful!")
        return { success: true }
      } else {
        const errorMessage = response.message || "Registration failed"
        toast.error(errorMessage)
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again."
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("blog-user")
    toast.success("Logged out successfully")
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
