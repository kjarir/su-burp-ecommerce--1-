"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }

    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted">
                        <img
                          src={item.imageUrl || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{(total + total * 0.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

