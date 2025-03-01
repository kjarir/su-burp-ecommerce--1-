"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth"
import { AdminDashboard } from "@/components/admin/dashboard"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not admin
    if (user && !user.isAdmin) {
      router.push("/")
    } else if (!user) {
      router.push("/login?redirect=/admin")
    }
  }, [user, router])

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container px-4 py-8 md:px-6 md:py-12"
    >
      <AdminDashboard />
    </motion.div>
  )
}

