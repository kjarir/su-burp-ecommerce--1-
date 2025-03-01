"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs" // ✅ Hash passwords for security
import { User } from "lucide-react"

interface User {
  id: string
  name: string
  phone_number: string
  is_admin: boolean
  password: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (phone_number: string, password: string) => Promise<void>
  signUp: (name: string, phone_number: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  // ✅ Sign Up Function
  const signUp = async (name: string, phone_number: string, password: string) => {
    try {
      console.log("🔍 Checking if user exists:", phone_number)

      // ✅ Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("profiles")  
        .select("id")
        .eq("phone_number", phone_number)
        .maybeSingle() // ✅ Avoids crashing if user doesn't exist

      if (checkError) throw checkError
      if (existingUser) throw new Error("❌ Phone number already registered")

      console.log("✅ User does not exist. Creating new profile...")

      // ✅ Hash password before storing it
      const hashedPassword = await bcrypt.hash(password, 10)

      // ✅ Insert new user into "profiles"
      const { data, error } = await supabase
        .from("profiles")
        .insert([{ name, phone_number, password: hashedPassword, is_admin: false }])
        .select()
        .single()

      if (error) throw error

      console.log("🎉 Profile created successfully:", data)

      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      router.push("/")
    } catch (error) {
      console.error("🚨 Signup error:", error)
      throw error
    }
  }

  // ✅ Sign In Function
  const signIn = async (phone: string, password: string) => {
    try {
      console.log("🔍 Checking user:", phone)

      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, phone_number, password, is_admin") // ✅ Fetch password
        .eq("phone_number", phone)
        .single()

      if (!data) throw new Error("❌ User not found")

      // ✅ Compare hashed password
      const isValidPassword = await bcrypt.compare(password, data.password)
      if (!isValidPassword) throw new Error("❌ Invalid password")

      console.log("✅ User found! Logging in...")

      // ✅ Remove password from user data before storing
      const { password: _, ...userData } = data

      setUser(userData as User)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/")
    } catch (error) {
      console.error("🚨 Login error:", error)
      throw error
    }
  }

  // ✅ Sign Out Function
  const signOut = () => {
    console.log("👋 Signing out user...")
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
