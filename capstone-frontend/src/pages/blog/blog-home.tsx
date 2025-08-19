"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MessageCircle, Heart, Search, TrendingUp } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  category: string
  likes: number
  comments: number
  image: string
}

interface BlogHomeProps {
  onViewPost: (postId: string) => void
}

export function BlogHome({ onViewPost }: BlogHomeProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const categories = ["Technology", "Design", "Business", "Lifestyle", "Travel"]

  useEffect(() => {
    // Mock data loading
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "The Future of Web Development: Trends to Watch in 2024",
        excerpt:
          "Explore the latest trends shaping the future of web development, from AI integration to new frameworks.",
        content: "Full content here...",
        author: {
          name: "Sarah Johnson",
          avatar: "/diverse-user-avatars.png",
        },
        publishedAt: "2024-01-15",
        category: "Technology",
        likes: 42,
        comments: 8,
        image: "/modern-web-dev-workspace.png",
      },
      {
        id: "2",
        title: "Designing for Accessibility: A Complete Guide",
        excerpt: "Learn how to create inclusive designs that work for everyone, with practical tips and real examples.",
        content: "Full content here...",
        author: {
          name: "Mike Chen",
          avatar: "/abstract-user-avatar.png",
        },
        publishedAt: "2024-01-12",
        category: "Design",
        likes: 38,
        comments: 12,
        image: "/accessibility-design-interface.png",
      },
      {
        id: "3",
        title: "Building a Successful Remote Team Culture",
        excerpt:
          "Discover strategies for fostering collaboration and maintaining team spirit in a distributed workforce.",
        content: "Full content here...",
        author: {
          name: "Emily Rodriguez",
          avatar: "/admin-avatar.png",
        },
        publishedAt: "2024-01-10",
        category: "Business",
        likes: 56,
        comments: 15,
        image: "/remote-team-collaboration.png",
      },
      {
        id: "4",
        title: "Minimalist Living: Finding Joy in Less",
        excerpt: "Explore how embracing minimalism can lead to a more fulfilling and intentional lifestyle.",
        content: "Full content here...",
        author: {
          name: "David Park",
          avatar: "/diverse-user-avatars.png",
        },
        publishedAt: "2024-01-08",
        category: "Lifestyle",
        likes: 29,
        comments: 6,
        image: "/minimalist-home-interior.png",
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Welcome to BlogSpace</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing stories, insights, and ideas from our community of writers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Posts
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <Card
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onViewPost(filteredPosts[0].id)}
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={filteredPosts[0].image || "/placeholder.svg"}
                alt={filteredPosts[0].title}
                className="h-64 w-full object-cover md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
                <Badge variant="outline">{filteredPosts[0].category}</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-3">{filteredPosts[0].title}</h2>
              <p className="text-muted-foreground mb-4">{filteredPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={filteredPosts[0].author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{filteredPosts[0].author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{filteredPosts[0].author.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(filteredPosts[0].publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {filteredPosts[0].likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {filteredPosts[0].comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.slice(1).map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onViewPost(post.id)}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {post.comments}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
