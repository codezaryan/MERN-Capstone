"use client"

import { useState } from "react"
import { BlogHeader } from "./blog-header"
import { BlogHome } from "./blog-home"
import { BlogPost } from "./blog-post"
import { CreatePost } from "./create-post"
import { UserProfile } from "./user-profile"
import Footer from "@/components/Footer"

interface BlogLayoutProps {
  onShowAuth: () => void
}

export function BlogLayout({ onShowAuth }: BlogLayoutProps) {
  const [currentView, setCurrentView] = useState<"home" | "post" | "create" | "profile">("home")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  const handleViewPost = (postId: string) => {
    setSelectedPostId(postId)
    setCurrentView("post")
  }

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <BlogHome onViewPost={handleViewPost} />
      case "post":
        return <BlogPost postId={selectedPostId} onBack={() => setCurrentView("home")} />
      case "create":
        return <CreatePost onBack={() => setCurrentView("home")} />
      case "profile":
        return <UserProfile onBack={() => setCurrentView("home")} />
      default:
        return <BlogHome onViewPost={handleViewPost} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BlogHeader currentView={currentView} onNavigate={setCurrentView} onShowAuth={onShowAuth} />
      <main className="container mx-auto px-4 py-8 flex-1">{renderContent()}</main>
      <Footer />
    </div>
  )
}
