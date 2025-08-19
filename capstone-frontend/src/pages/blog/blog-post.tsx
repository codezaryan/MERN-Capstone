"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Calendar, Heart, MessageCircle, Send } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  category: string
  likes: number
  comments: Comment[]
  image: string
  isLiked: boolean
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
}

interface BlogPostProps {
  postId: string | null
  onBack: () => void
}

export function BlogPost({ postId, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!postId) return

    // Mock data loading
    const mockPost: BlogPost = {
      id: postId,
      title: "The Future of Web Development: Trends to Watch in 2024",
      content: `
        <h2>Introduction</h2>
        <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will shape how we build and interact with web applications.</p>
        
        <h2>Key Trends to Watch</h2>
        
        <h3>1. AI-Powered Development Tools</h3>
        <p>Artificial Intelligence is revolutionizing how developers write code. From intelligent code completion to automated testing, AI tools are becoming indispensable in modern development workflows.</p>
        
        <h3>2. WebAssembly (WASM) Adoption</h3>
        <p>WebAssembly continues to gain traction, enabling high-performance applications in the browser. We're seeing more languages compile to WASM, opening up new possibilities for web applications.</p>
        
        <h3>3. Edge Computing Integration</h3>
        <p>With the rise of edge computing, developers are building applications that run closer to users, reducing latency and improving performance globally.</p>
        
        <h3>4. Progressive Web Apps (PWAs) Evolution</h3>
        <p>PWAs are becoming more sophisticated, offering native-like experiences while maintaining the accessibility and reach of web applications.</p>
        
        <h2>Conclusion</h2>
        <p>As we move through 2024, these trends will continue to shape the future of web development. Staying informed and adapting to these changes will be crucial for developers looking to build cutting-edge applications.</p>
      `,
      author: {
        name: "Sarah Johnson",
        avatar: "/diverse-user-avatars.png",
      },
      publishedAt: "2024-01-15",
      category: "Technology",
      likes: 42,
      isLiked: false,
      image: "/modern-web-dev-workspace.png",
      comments: [
        {
          id: "1",
          author: {
            name: "Mike Chen",
            avatar: "/abstract-user-avatar.png",
          },
          content: "Great insights! I'm particularly excited about the AI-powered development tools.",
          createdAt: "2024-01-16",
        },
        {
          id: "2",
          author: {
            name: "Emily Rodriguez",
            avatar: "/admin-avatar.png",
          },
          content: "WebAssembly is definitely a game-changer. Thanks for the comprehensive overview!",
          createdAt: "2024-01-16",
        },
      ],
    }

    setTimeout(() => {
      setPost(mockPost)
      setIsLoading(false)
    }, 1000)
  }, [postId])

  const handleLike = () => {
    if (!post || !user) return

    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    })

    toast({
      title: post.isLiked ? "Removed like" : "Liked post",
      description: post.isLiked ? "You unliked this post" : "You liked this post",
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !user || !post) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: user.avatar || "/placeholder.svg",
      },
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setPost({
      ...post,
      comments: [...post.comments, comment],
    })

    setNewComment("")
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Post not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <article className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Badge variant="outline">{post.category}</Badge>
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant={post.isLiked ? "default" : "outline"} size="sm" onClick={handleLike} disabled={!user}>
                <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments.length}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video overflow-hidden rounded-lg">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Comments ({post.comments.length})</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          {user ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Sign in to leave a comment</p>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-sm">{comment.author.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
