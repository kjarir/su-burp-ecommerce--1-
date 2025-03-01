"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"

export default function CheckoutSuccessPage() {
  const { items } = useCart()
  const router = useRouter()

  useEffect(() => {
    // If there are items in the cart, redirect to cart page
    // This prevents accessing the success page directly
    if (items.length > 0) {
      router.push("/cart")
    }
  }, [items, router])

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Order Successful!</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>
        <div className="mt-4 flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button size="lg" variant="outline">
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

