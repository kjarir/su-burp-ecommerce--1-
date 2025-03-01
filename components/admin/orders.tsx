"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, MoreHorizontal, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Order } from "@/lib/types"
import { getOrders, updateOrderStatus, sendWhatsAppNotification } from "@/lib/data"

export function AdminOrders() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch orders",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [toast])

  const handleStatusChange = async (orderId: string, status: Order["status"]) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status)
      setOrders(orders.map((order) => (order.id === orderId ? updatedOrder : order)))

      toast({
        title: "Status Updated",
        description: `Order #${orderId} status changed to ${status}`,
      })

      // If the order is the selected one, update it
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updatedOrder)
      }

      // Send WhatsApp notification
      const message = `Your order #${orderId} has been ${status}. Thank you for shopping with SuBurp!`
      await sendWhatsAppNotification(updatedOrder.shipping_address.phone, message)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const handleSendNotification = async (order: Order) => {
    try {
      const message = `Hello ${order.shipping_address.full_name}, your order #${order.id} is ${order.status}. Thank you for shopping with SuBurp!`
      await sendWhatsAppNotification(order.shipping_address.phone, message)

      toast({
        title: "Notification Sent",
        description: "WhatsApp notification has been sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send WhatsApp notification",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Orders Management</h2>
      </div>

      <Card>
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 text-sm">
                <th className="p-4 text-left font-medium">Order ID</th>
                <th className="p-4 text-left font-medium">Customer</th>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Total</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-4 font-medium">#{order.id}</td>
                    <td className="p-4">{order.shippingAddress.fullName}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">₹{order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <Select
                        value={order.status}
                        onValueChange={(value: Order["status"]) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendNotification(order)}>
                            <Truck className="mr-2 h-4 w-4" />
                            Send Notification
                          </DropdownMenuItem>
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

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View the complete details of this order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                  <p>
                    <span className="font-medium">Order ID:</span> #{selectedOrder.id}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {selectedOrder.status}
                  </p>
                  <p>
                    <span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">Total:</span> ₹{selectedOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                  <p>
                    <span className="font-medium">Name:</span> {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {selectedOrder.shippingAddress.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {selectedOrder.shippingAddress.streetAddress},{" "}
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state},{" "}
                    {selectedOrder.shippingAddress.postalCode}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span> {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 text-sm">
                        <th className="p-2 text-left font-medium">Product</th>
                        <th className="p-2 text-left font-medium">Price</th>
                        <th className="p-2 text-left font-medium">Quantity</th>
                        <th className="p-2 text-left font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.productId} className="border-b">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">₹{item.price.toFixed(2)}</td>
                          <td className="p-2">{item.quantity}</td>
                          <td className="p-2">₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-medium">
                        <td colSpan={3} className="p-2 text-right">
                          Total:
                        </td>
                        <td className="p-2">₹{selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleSendNotification(selectedOrder)}>Send WhatsApp Notification</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

