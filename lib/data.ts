import { supabase } from "./supabase"
import type { Product, Order, User } from "./types"

export async function getFeaturedProducts() {
  return [
    { id: 1, name: "Samosa", price: 5 },
    { id: 2, name: "Kebab", price: 10 },
  ]
}


// ✅ Get User by Phone
export async function getUserByPhone(phone: string): Promise<User | null> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("phone", phone).single()
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

// ✅ Create User
export async function createUser(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User | null> {
  try {
    const { data, error } = await supabase.from("profiles").insert([user]).select().single()
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

// ✅ Get Products
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase.from("products").select("*")
    if (category) query = query.eq("category", category.toLowerCase())
    const { data, error } = await query
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// ✅ Get Orders
export async function getOrders(userId?: string): Promise<Order[]> {
  try {
    let query = supabase.from("orders").select("*")
    if (userId) query = query.eq("user_id", userId)
    const { data, error } = await query.order("created_at", { ascending: false })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

// ✅ Create Order
export async function createOrder(order: Omit<Order, "id" | "created_at">): Promise<Order | null> {
  try {
    const { data, error } = await supabase.from("orders").insert([order]).select().single()
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

// ✅ Update Order Status
export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order | null> {
  try {
    const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select().single()
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}
