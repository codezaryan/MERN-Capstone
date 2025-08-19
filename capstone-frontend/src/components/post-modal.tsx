"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Post {
  id: string
  title: string
  author: string
  date: string
  status: "published" | "draft" | "archived"
  views: number
}

interface PostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  onSave: (postData: any) => void
}

export function PostModal({ open, onOpenChange, post, onSave }: PostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "draft" as const,
    content: "",
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        author: post.author,
        status: post.status,
        content: "Sample content for the post...",
      })
    } else {
      setFormData({
        title: "",
        author: "",
        status: "draft",
        content: "",
      })
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "published" | "draft" | "archived") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your post content here..."
              className="min-h-[200px]"
              required
            />
            <p className="text-sm text-muted-foreground">
              Rich text editor would be integrated here in a real application.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{post ? "Update Post" : "Create Post"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
