"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PostModal } from "@/components/post-modal"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  MoreHorizontal,
  FileText,
  Calendar,
  TrendingUp,
  MessageCircle,
  Archive,
  CheckCircle,
  Clock,
} from "lucide-react"

interface Post {
  id: string
  title: string
  author: string
  date: string
  status: "published" | "draft" | "scheduled" | "archived"
  views: number
  comments: number
  category: string
  excerpt: string
  featured: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    author: "Sarah Johnson",
    date: "2024-01-15",
    status: "published",
    views: 2100,
    comments: 8,
    category: "Technology",
    excerpt: "Explore the latest trends shaping the future of web development...",
    featured: true,
  },
  {
    id: "2",
    title: "Designing for Accessibility: A Complete Guide",
    author: "Mike Chen",
    date: "2024-01-12",
    status: "published",
    views: 1800,
    comments: 12,
    category: "Design",
    excerpt: "Learn how to create inclusive designs that work for everyone...",
    featured: false,
  },
  {
    id: "3",
    title: "Building a Successful Remote Team Culture",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    status: "draft",
    views: 0,
    comments: 0,
    category: "Business",
    excerpt: "Discover strategies for fostering collaboration...",
    featured: false,
  },
  {
    id: "4",
    title: "Advanced TypeScript Patterns",
    author: "David Park",
    date: "2024-01-08",
    status: "scheduled",
    views: 0,
    comments: 0,
    category: "Technology",
    excerpt: "Deep dive into advanced TypeScript patterns and techniques...",
    featured: false,
  },
  {
    id: "5",
    title: "Minimalist Living: Finding Joy in Less",
    author: "Jane Smith",
    date: "2024-01-05",
    status: "archived",
    views: 1200,
    comments: 6,
    category: "Lifestyle",
    excerpt: "Explore how embracing minimalism can lead to fulfillment...",
    featured: false,
  },
  {
    id: "6",
    title: "State Management Best Practices",
    author: "John Doe",
    date: "2024-01-03",
    status: "published",
    views: 2500,
    comments: 15,
    category: "Technology",
    excerpt: "Learn the best practices for managing state in modern applications...",
    featured: true,
  },
]

export function PostsContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const categories = ["Technology", "Design", "Business", "Lifestyle"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleCreatePost = () => {
    setEditingPost(null)
    setModalOpen(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setModalOpen(true)
  }

  const handleDeletePost = (post: Post) => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const confirmDeletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter((p) => p.id !== postToDelete.id))
      toast({
        title: "Post deleted",
        description: `"${postToDelete.title}" has been successfully deleted.`,
        variant: "destructive",
      })
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const handlePostAction = (action: string, post: Post) => {
    switch (action) {
      case "publish":
        setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: "published" } : p)))
        toast({
          title: "Post published",
          description: `"${post.title}" has been published successfully.`,
        })
        break
      case "unpublish":
        setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: "draft" } : p)))
        toast({
          title: "Post unpublished",
          description: `"${post.title}" has been moved to drafts.`,
        })
        break
      case "archive":
        setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: "archived" } : p)))
        toast({
          title: "Post archived",
          description: `"${post.title}" has been archived.`,
        })
        break
      case "feature":
        setPosts(posts.map((p) => (p.id === post.id ? { ...p, featured: !p.featured } : p)))
        toast({
          title: post.featured ? "Post unfeatured" : "Post featured",
          description: `"${post.title}" has been ${post.featured ? "removed from" : "added to"} featured posts.`,
        })
        break
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedPosts.length === 0) return

    switch (action) {
      case "publish":
        setPosts(posts.map((p) => (selectedPosts.includes(p.id) ? { ...p, status: "published" } : p)))
        toast({
          title: "Posts published",
          description: `${selectedPosts.length} posts have been published.`,
        })
        break
      case "archive":
        setPosts(posts.map((p) => (selectedPosts.includes(p.id) ? { ...p, status: "archived" } : p)))
        toast({
          title: "Posts archived",
          description: `${selectedPosts.length} posts have been archived.`,
        })
        break
      case "delete":
        setPosts(posts.filter((p) => !selectedPosts.includes(p.id)))
        toast({
          title: "Posts deleted",
          description: `${selectedPosts.length} posts have been deleted.`,
          variant: "destructive",
        })
        break
    }
    setSelectedPosts([])
  }

  const handleSavePost = (postData: any) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === editingPost.id ? { ...p, ...postData } : p)))
      toast({
        title: "Post updated",
        description: "The post has been successfully updated.",
      })
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        ...postData,
        date: new Date().toISOString().split("T")[0],
        views: 0,
        comments: 0,
        featured: false,
      }
      setPosts([newPost, ...posts])
      toast({
        title: "Post created",
        description: "The post has been successfully created.",
      })
    }
    setModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-3 w-3" />
      case "draft":
        return <Edit className="h-3 w-3" />
      case "scheduled":
        return <Clock className="h-3 w-3" />
      case "archived":
        return <Archive className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(filteredPosts.map((post) => post.id))
    } else {
      setSelectedPosts([])
    }
  }

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId])
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId))
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const publishedPosts = posts.filter((p) => p.status === "published").length
  const draftPosts = posts.filter((p) => p.status === "draft").length
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">Manage your blog posts, drafts, and content strategy.</p>
        </div>
        <Button onClick={handleCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
            <p className="text-xs text-muted-foreground">{draftPosts} drafts remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Avg {Math.round(totalViews / publishedPosts || 0)} per post</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">Engagement rate: 8.3%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Posts ({filteredPosts.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPosts.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedPosts.length} posts selected</span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("publish")}>
                  Publish
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")}>
                  Archive
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium line-clamp-1">{post.title}</span>
                        {post.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(post.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(post.status)}
                        <span className="capitalize">{post.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleEditPost(post)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Post
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {post.status === "draft" && (
                          <DropdownMenuItem onClick={() => handlePostAction("publish", post)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}

                        {post.status === "published" && (
                          <DropdownMenuItem onClick={() => handlePostAction("unpublish", post)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Move to Draft
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem onClick={() => handlePostAction("feature", post)}>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          {post.featured ? "Remove from Featured" : "Add to Featured"}
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handlePostAction("archive", post)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeletePost(post)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <PostModal open={modalOpen} onOpenChange={setModalOpen} post={editingPost} onSave={handleSavePost} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone and will permanently
              remove the post and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePost} className="bg-red-600 hover:bg-red-700">
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
