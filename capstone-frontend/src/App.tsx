"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "./auth/auth-context"
import { AuthPage } from "@/auth/auth-page"
import { BlogLayout } from "./pages/blog/blog-layout"
import { AdminLayout } from "@/admin/admin-layout"
import { Toaster } from "@/components/ui/toaster"

function AppContent() {
  const { user, isLoading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user && showAuth) {
    return <AuthPage onSuccess={() => setShowAuth(false)} />
  }

  if (user?.role === "admin") {
    return <AdminLayout />
  }

  return <BlogLayout onShowAuth={() => setShowAuth(true)} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  )
}






{/* <AppRoutes/> */}