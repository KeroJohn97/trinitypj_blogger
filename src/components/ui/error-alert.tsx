"use client"

import React from "react"
import { AlertCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ErrorAlertProps {
  error: string | null
  onClear?: () => void
  title?: string
  className?: string
}

export function ErrorAlert({ error, onClear, title = "Security Alert", className }: ErrorAlertProps) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "relative overflow-hidden rounded-xl border border-red-100 bg-white p-4 shadow-xl shadow-red-500/5 dark:border-red-900/30 dark:bg-slate-900/50",
            className
          )}
        >
          {/* Unified Handlebar - the accent bar that gives it a standard "error" look */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500" />
          
          <div className="flex gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle size={18} strokeWidth={2.5} />
            </div>
            
            <div className="flex-1 space-y-0.5 pt-0.5">
              <h4 className="text-[10px] font-black tracking-[0.15em] text-red-600 uppercase">
                {title}
              </h4>
              <p className="text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                {error}
              </p>
            </div>

            {onClear && (
              <button
                onClick={onClear}
                className="group flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-all hover:bg-slate-50 hover:text-slate-500 dark:hover:bg-slate-800"
                aria-label="Dismiss"
              >
                <X size={14} className="transition-transform group-hover:rotate-90" />
              </button>
            )}
          </div>

          {/* Subtle background pulse for active errors */}
          <div className="absolute inset-0 pointer-events-none bg-red-500/5 animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
