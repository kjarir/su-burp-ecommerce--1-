"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAnalytics } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"

interface Analytics {
  totalRevenue: number
  salesByCategory: Record<string, number>
  recentOrders: any[]
  topSellingProducts: Array<{
    product: any
    quantity: number
    revenue: number
  }>
  totalOrders: number
  totalProducts: number
  totalCustomers: number
}

export function AdminAnalytics() {
  const { toast } = useToast()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics()
        setAnalytics(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch analytics data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [toast])

  if (isLoading) {
    return <div>Loading analytics...</div>
  }

  if (!analytics) {
    return <div>No data available</div>
  }

  // Calculate percentages for category sales
  const totalSales = Object.values(analytics.salesByCategory).reduce((a, b) => a + b, 0)
  const categoryPercentages = Object.entries(analytics.salesByCategory).map(([category, sales]) => ({
    category,
    percentage: totalSales > 0 ? (sales / totalSales) * 100 : 0,
  }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{analytics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {analytics.totalOrders} orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryPercentages.map(({ category, percentage }) => (
                <div key={category} className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-sm">₹{order.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.topSellingProducts.map(({ product, quantity, revenue }) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{quantity} units</p>
                  </div>
                  <div className="text-sm">₹{revenue.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

