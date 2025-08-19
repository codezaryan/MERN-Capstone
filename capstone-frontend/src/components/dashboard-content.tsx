"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Users, Eye, TrendingUp, MessageCircle, Calendar, Activity, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"

const stats = [
  {
    title: "Total Posts",
    value: "1,234",
    change: "+12%",
    icon: FileText,
    color: "text-primary",
    trend: "up",
  },
  {
    title: "Total Users",
    value: "5,678",
    change: "+8%",
    icon: Users,
    color: "text-primary",
    trend: "up",
  },
  {
    title: "Page Views",
    value: "89,012",
    change: "+23%",
    icon: Eye,
    color: "text-primary",
    trend: "up",
  },
  {
    title: "Comments",
    value: "2,456",
    change: "+15%",
    icon: MessageCircle,
    color: "text-primary",
    trend: "up",
  },
]

const recentPosts = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    author: "Sarah Johnson",
    status: "published",
    views: 2100,
    comments: 8,
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Designing for Accessibility: A Complete Guide",
    author: "Mike Chen",
    status: "published",
    views: 1800,
    comments: 12,
    publishedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Building a Successful Remote Team Culture",
    author: "Emily Rodriguez",
    status: "draft",
    views: 0,
    comments: 0,
    publishedAt: "2024-01-10",
  },
]

const topCategories = [
  { name: "Technology", posts: 45, percentage: 35 },
  { name: "Design", posts: 32, percentage: 25 },
  { name: "Business", posts: 28, percentage: 22 },
  { name: "Lifestyle", posts: 23, percentage: 18 },
]

export function DashboardContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your blog's performance and recent activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600 font-medium">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Posts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Posts
            </CardTitle>
            <Badge variant="secondary">{recentPosts.length} posts</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-3 rounded-lg border">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium line-clamp-1">{post.title}</h4>
                      <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">by {post.author}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      {post.status === "published" && (
                        <>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {post.comments}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">{category.posts} posts</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New post published", time: "2 minutes ago", user: "Sarah Johnson", type: "post" },
                { action: "User registered", time: "5 minutes ago", user: "Jane Smith", type: "user" },
                { action: "Comment posted", time: "10 minutes ago", user: "Mike Johnson", type: "comment" },
                { action: "Post updated", time: "15 minutes ago", user: "Emily Rodriguez", type: "post" },
                { action: "User profile updated", time: "20 minutes ago", user: "David Park", type: "user" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "post"
                        ? "bg-primary"
                        : activity.type === "user"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published Posts</span>
                <span className="text-sm font-medium">1,156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Draft Posts</span>
                <span className="text-sm font-medium">78</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="text-sm font-medium">4,892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Views/Post</span>
                <span className="text-sm font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                <span className="text-sm font-medium">8.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
