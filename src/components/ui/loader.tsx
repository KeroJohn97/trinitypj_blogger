"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoaderProps {
  loading: boolean
  overlay?: boolean
  text?: string
  className?: string
}

export function Loader({ loading, overlay = true, text, className }: LoaderProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            overlay && "fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md dark:bg-slate-900/60",
            className
          )}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center">
              {/* Outer Ring: Slow Spin */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 rounded-full border-4 border-emerald-500/10 border-t-emerald-500 border-r-emerald-500"
              />

              {/* Middle Ring: Fast Spin Reverse */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute h-10 w-10 rounded-full border-4 border-emerald-500/5 border-t-emerald-500"
              />

              {/* Inner Dot: Pulse */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
              />
            </div>
            
            {text && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-black tracking-[0.2em] text-emerald-600 uppercase"
              >
                {text}
              </motion.p>
            )}
            
            <span className="sr-only">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
