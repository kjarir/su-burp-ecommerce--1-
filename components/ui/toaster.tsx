"use client"

import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 p-4 max-w-[420px] w-full right-0">
      {toasts.map(({ id, title, description, variant, onClose }) => (
        <Toast key={id} variant={variant} className="w-full">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
          <ToastClose onClick={() => onClose?.()} />
        </Toast>
      ))}
    </div>
  )
}

