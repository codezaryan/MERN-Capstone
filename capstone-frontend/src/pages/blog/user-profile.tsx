"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/auth/auth-context"
import { ArrowLeft, Calendar, Heart, MessageCircle, Edit, Trash2 } from "lucide-react"

interface UserPost {
  id: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  likes: number
  comments: number
  status: "published" | "draft"
}

interface UserProfileProps {
  onBack: () => void
}

export function UserProfile({ onBack }: UserProfileProps) {
  const [posts, setPosts] = useState<UserPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Mock data loading
    const mockPosts: UserPost[] = [
      {
        id: "1",
        title: "Getting Started with React Hooks",
        excerpt: "A comprehensive guide to understanding and using React Hooks in your applications.",
        category: "Technology",
        publishedAt: "2024-01-10",
        likes: 24,
        comments: 5,
        status: "published",
      },
      {
        id: "2",
        title: "Design Systems Best Practices",
        excerpt: "How to build and maintain scalable design systems for modern web applications.",
        category: "Design",
        publishedAt: "2024-01-05",
        likes: 18,
        comments: 3,
        status: "published",
      },
      {
        id: "3",
        title: "The Future of Web Development",
        excerpt: "Exploring upcoming trends and technologies that will shape web development.",
        category: "Technology",
        publishedAt: "2024-01-01",
        likes: 0,
        comments: 0,
        status: "draft",
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">You need to be signed in to view your profile</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    )
  }

  const publishedPosts = posts.filter((post) => post.status === "published")
  const draftPosts = posts.filter((post) => post.status === "draft")
  const totalLikes = publishedPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = publishedPosts.reduce((sum, post) => sum + post.comments, 0)

  const PostCard = ({ post }: { post: UserPost }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          {post.status === "published" && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                {post.likes}
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <span className="font-medium">{publishedPosts.length}</span>
                  <span className="text-muted-foreground ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-medium">{totalLikes}</span>
                  <span className="text-muted-foreground ml-1">Likes</span>
                </div>
                <div>
                  <span className="font-medium">{totalComments}</span>
                  <span className="text-muted-foreground ml-1">Comments</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Tabs */}
      <Tabs defaultValue="published" className="space-y-6">
        <TabsList>
          <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : publishedPosts.length > 0 ? (
            <div className="space-y-4">
              {publishedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">You haven't published any posts yet.</p>
                <Button className="mt-4">Write Your First Post</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : draftPosts.length > 0 ? (
            <div className="space-y-4">
              {draftPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No drafts found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
