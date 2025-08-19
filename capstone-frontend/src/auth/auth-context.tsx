"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("blog-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@blog.com" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        email: "admin@blog.com",
        name: "Admin User",
        role: "admin",
        avatar: "/admin-avatar.png",
      }
      setUser(adminUser)
      localStorage.setItem("blog-user", JSON.stringify(adminUser))
      setIsLoading(false)
      return true
    } else if (email === "user@blog.com" && password === "user123") {
      const regularUser: User = {
        id: "2",
        email: "user@blog.com",
        name: "John Doe",
        role: "user",
        avatar: "/diverse-user-avatars.png",
      }
      setUser(regularUser)
      localStorage.setItem("blog-user", JSON.stringify(regularUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock registration - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
      avatar: "/abstract-user-avatar.png",
    }

    setUser(newUser)
    localStorage.setItem("blog-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("blog-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
