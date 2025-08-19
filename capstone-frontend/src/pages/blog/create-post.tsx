"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye } from "lucide-react"

interface CreatePostProps {
  onBack: () => void
}

export function CreatePost({ onBack }: CreatePostProps) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const categories = ["Technology", "Design", "Business", "Lifestyle", "Travel"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !excerpt || !content || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Success",
      description: "Your post has been published successfully!",
    })

    setIsLoading(false)
    onBack()
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Draft saved",
      description: "Your post has been saved as a draft",
    })

    setIsLoading(false)
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">You need to be signed in to create a post</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>

      {isPreview ? (
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">{category || "Category"}</span>
              </div>
              <h1 className="text-3xl font-bold">{title || "Your Post Title"}</h1>
              <p className="text-muted-foreground text-lg">{excerpt || "Your post excerpt will appear here..."}</p>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Write a brief description of your post"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="min-h-[80px]"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px]"
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  Tip: Use line breaks to separate paragraphs. Rich text editor coming soon!
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
