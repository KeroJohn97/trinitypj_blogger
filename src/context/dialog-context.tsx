"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DialogType = "alert" | "confirm"

interface DialogOptions {
  title?: string
  description: ReactNode
  type?: DialogType
  confirmText?: string
  cancelText?: string
  destructive?: boolean
}

interface DialogContextValue {
  showDialog: (options: DialogOptions) => Promise<boolean>
  alert: (message: string, title?: string) => Promise<boolean>
  confirm: (message: string, title?: string, destructive?: boolean) => Promise<boolean>
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<DialogOptions | null>(null)
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null)

  const showDialog = useCallback((opts: DialogOptions) => {
    setOptions(opts)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve)
    })
  }, [])

  const alert = useCallback((message: string, title: string = "Alert") => {
    return showDialog({ description: message, title, type: "alert" })
  }, [showDialog])

  const confirm = useCallback((message: string, title: string = "Confirm", destructive: boolean = false) => {
    return showDialog({ description: message, title, type: "confirm", destructive })
  }, [showDialog])

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      if (resolver) resolver(false)
      setOpen(false)
    }
  }

  const handleConfirm = () => {
    if (resolver) resolver(true)
    setOpen(false)
  }

  const handleCancel = () => {
    if (resolver) resolver(false)
    setOpen(false)
  }

  return (
    <DialogContext.Provider value={{ showDialog, alert, confirm }}>
      {children}
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>{options?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {options?.type === "confirm" && (
              <AlertDialogCancel onClick={handleCancel}>
                {options.cancelText || "Cancel"}
              </AlertDialogCancel>
            )}
            <AlertDialogAction 
              onClick={handleConfirm}
              className={options?.destructive ? "bg-red-600 hover:bg-red-700 focus:ring-red-600" : ""}
            >
              {options?.confirmText || "OK"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
