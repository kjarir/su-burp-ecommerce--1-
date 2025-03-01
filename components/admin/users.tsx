"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import type { User as UserType } from "@/lib/types"

export function AdminUsers() {
  const { toast } = useToast()
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUsers = async () => {
      try {
        // Mock data
        const mockUsers = [
          { id: "1", name: "Admin User", email: "admin@suBurp.com", phone: "9876543210", isAdmin: true },
          { id: "2", name: "John Doe", email: "john@example.com", phone: "9876543211", isAdmin: false },
          { id: "3", name: "Jane Smith", email: "jane@example.com", phone: "9876543212", isAdmin: false },
          { id: "4", name: "Robert Johnson", email: "robert@example.com", phone: "9876543213", isAdmin: false },
        ]

        setUsers(mockUsers)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  const handleMakeAdmin = (userId: string) => {
    // In a real app, this would be an API call
    setUsers(users.map((user) => (user.id === userId ? { ...user, isAdmin: true } : user)))

    toast({
      title: "User Updated",
      description: "User has been made an admin",
    })
  }

  const handleRemoveAdmin = (userId: string) => {
    // In a real app, this would be an API call
    setUsers(users.map((user) => (user.id === userId ? { ...user, isAdmin: false } : user)))

    toast({
      title: "User Updated",
      description: "Admin privileges have been removed",
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users Management</h2>
      </div>

      <Card>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 text-sm">
                <th className="p-4 text-left font-medium">User</th>
                <th className="p-4 text-left font-medium">Phone</th>
                <th className="p-4 text-left font-medium">Role</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.isAdmin ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "Customer"}
                      </span>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {user.isAdmin ? (
                            <DropdownMenuItem onClick={() => handleRemoveAdmin(user.id)}>Remove Admin</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleMakeAdmin(user.id)}>Make Admin</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}

