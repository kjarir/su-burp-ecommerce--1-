"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ phone: "", password: "" })
  const [signupData, setSignupData] = useState({ name: "", phone: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "login" | "signup") => {
    const { name, value } = e.target
    if (type === "login") setLoginData((prev) => ({ ...prev, [name]: value }))
    else setSignupData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, type: "login" | "signup") => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (type === "login") await signIn(loginData.phone, loginData.password)
      else await signUp(signupData.name, signupData.phone, signupData.password)
      router.push(redirect)
    } catch (error) {
      toast({
        title: `${type === "login" ? "Login" : "Signup"} failed`,
        description: `There was an error. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your phone number to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "login")}> 
                  <div className="space-y-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" value={loginData.phone} onChange={(e) => handleChange(e, "login")} required />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Enter your password" value={loginData.password} onChange={(e) => handleChange(e, "login")} required />
                    <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, "signup")}> 
                  <div className="space-y-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" type="text" placeholder="John Doe" value={signupData.name} onChange={(e) => handleChange(e, "signup")} required />
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" value={signupData.phone} onChange={(e) => handleChange(e, "signup")} required />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Enter your password" value={signupData.password} onChange={(e) => handleChange(e, "signup")} required />
                    <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" disabled={isLoading}>{isLoading ? "Signing Up..." : "Sign Up"}</button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
