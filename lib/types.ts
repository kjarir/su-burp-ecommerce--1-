export interface User {
  id: string
  name: string
  phone_number: string
  password: string
  is_admin: boolean
  created_at: string
  updated_at: string
}


export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  category: string
  stock: number
  created_at?: string
}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: Address
  payment_method: string
  created_at: string
}

export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
}

export interface Address {
  full_name: string
  street_address: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, "id" | "created_at">
        Update: Partial<Omit<User, "id" | "created_at">>
      }
      products: {
        Row: Product
        Insert: Omit<Product, "id" | "created_at">
        Update: Partial<Omit<Product, "id" | "created_at">>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, "id" | "created_at">
        Update: Partial<Omit<Order, "id" | "created_at">>
      }
    }
  }
}

