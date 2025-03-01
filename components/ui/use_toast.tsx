"use client"

import { atom, useAtom } from "jotai"

const toastAtom = atom<
  | {
      title: string
      description?: string
      variant?: "default" | "destructive"
    }
  | undefined
>(undefined)

export function useToast() {
  const [toast, setToast] = useAtom(toastAtom)

  return {
    toast,
    setToast,
  }
}

