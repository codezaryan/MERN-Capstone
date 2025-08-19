"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useToast } from "@/hooks/use-toast"
import {
  MoreHorizontal,
  Mail,
  Shield,
  Search,
  UserCheck,
  UserX,
  Trash2,
  Edit,
  Ban,
  CheckCircle,
  UsersIcon,
  UserPlus,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "user"
  status: "active" | "blocked" | "inactive"
  joinDate: string
  posts: number
  lastActive: string
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
    posts: 12,
    lastActive: "2024-01-18",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    status: "active",
    joinDate: "2023-02-20",
    posts: 8,
    lastActive: "2024-01-17",
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-03-10",
    posts: 3,
    lastActive: "2024-01-16",
    avatar: "/abstract-user-avatar.png",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "editor",
    status: "blocked",
    joinDate: "2023-01-05",
    posts: 15,
    lastActive: "2024-01-10",
  },
  {
    id: "5",
    name: "David Park",
    email: "david@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2023-04-12",
    posts: 1,
    lastActive: "2023-12-20",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "user",
    status: "active",
    joinDate: "2023-05-18",
    posts: 7,
    lastActive: "2024-01-15",
  },
]

export function UsersContent() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "user":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "blocked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-3 w-3" />
      case "editor":
        return <Edit className="h-3 w-3" />
      case "user":
        return <UsersIcon className="h-3 w-3" />
      default:
        return <UsersIcon className="h-3 w-3" />
    }
  }

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case "block":
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "blocked" } : u)))
        toast({
          title: "User blocked",
          description: `${user.name} has been blocked successfully.`,
        })
        break
      case "unblock":
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "active" } : u)))
        toast({
          title: "User unblocked",
          description: `${user.name} has been unblocked successfully.`,
        })
        break
      case "promote":
        const newRole = user.role === "user" ? "editor" : "admin"
        setUsers(users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)))
        toast({
          title: "User promoted",
          description: `${user.name} has been promoted to ${newRole}.`,
        })
        break
      case "demote":
        const demotedRole = user.role === "admin" ? "editor" : "user"
        setUsers(users.map((u) => (u.id === user.id ? { ...u, role: demotedRole } : u)))
        toast({
          title: "User demoted",
          description: `${user.name} has been demoted to ${demotedRole}.`,
        })
        break
      case "delete":
        setSelectedUser(user)
        setDeleteDialogOpen(true)
        break
    }
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id))
      toast({
        title: "User deleted",
        description: `${selectedUser.name} has been deleted successfully.`,
        variant: "destructive",
      })
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
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
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activeUsers = users.filter((u) => u.status === "active").length
  const blockedUsers = users.filter((u) => u.status === "blocked").length
  const adminUsers = users.filter((u) => u.role === "admin").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions.</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <UsersIcon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeUsers / users.length) * 100)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <Ban className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockedUsers}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">System administrators</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      <span className="capitalize">{user.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium">{user.posts}</span>
                      <span className="text-muted-foreground ml-1">posts</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {user.role !== "admin" && (
                          <DropdownMenuItem onClick={() => handleUserAction("promote", user)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Promote User
                          </DropdownMenuItem>
                        )}

                        {user.role !== "user" && (
                          <DropdownMenuItem onClick={() => handleUserAction("demote", user)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Demote User
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleUserAction("block", user)} className="text-orange-600">
                            <Ban className="mr-2 h-4 w-4" />
                            Block User
                          </DropdownMenuItem>
                        ) : user.status === "blocked" ? (
                          <DropdownMenuItem
                            onClick={() => handleUserAction("unblock", user)}
                            className="text-green-600"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Unblock User
                          </DropdownMenuItem>
                        ) : null}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleUserAction("delete", user)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone and will permanently
              remove their account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
