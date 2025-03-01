"use client"

import { useEffect, useState } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  onClose?: () => void
}

const TOAST_TIMEOUT = 5000

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))
      }, TOAST_TIMEOUT)

      return { id: toast.id, timer }
    })

    return () => {
      timers.forEach(({ timer }) => clearTimeout(timer))
    }
  }, [toasts])

  function toast({ title, description, variant = "default" }: Omit<ToastProps, "id" | "onClose">) {
    const id = Math.random().toString(36).substring(2, 9)
    const onClose = () => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))

    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, onClose }])

    return { id, onClose }
  }

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId))
      } else {
        setToasts([])
      }
    },
  }
}

