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
  AlertDialogMedia,
} from "@/components/ui/alert-dialog"
import { AlertCircle, Info } from "lucide-react"

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
        <AlertDialogContent className="border-emerald-500/20 shadow-emerald-500/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl">
          <AlertDialogHeader>
            <AlertDialogMedia 
              className={
                options?.destructive 
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                  : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              }
            >
              {options?.destructive ? <AlertCircle /> : <Info />}
            </AlertDialogMedia>
            <AlertDialogTitle className="text-xl">{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>{options?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {options?.type === "confirm" && (
              <AlertDialogCancel onClick={handleCancel} className="hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                {options.cancelText || "Cancel"}
              </AlertDialogCancel>
            )}
            <AlertDialogAction 
              onClick={handleConfirm}
              className={
                options?.destructive 
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white" 
                  : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
              }
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
