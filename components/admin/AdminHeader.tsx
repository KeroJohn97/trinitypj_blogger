"use client"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import React from "react"

interface AdminHeaderProps {
  title: string
  subtitle: string
  primaryAction: {
    label: string
    onClick: () => void
    icon: React.ReactNode
    disabled?: boolean
    loading?: boolean
    className?: string
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    icon: React.ReactNode
  }
}
export default function AdminHeader({ title, subtitle, primaryAction, secondaryAction }: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-30 -mx-4 bg-white/80 px-4 backdrop-blur-md transition-all md:-mx-8 md:px-8">
      <div className="flex flex-col gap-6 border-b border-slate-100 py-6 md:flex-row md:items-end md:justify-between md:py-8">
        {/* IDENTITY SECTION */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
          <p className="text-sm font-medium text-slate-500 md:text-base">{subtitle}</p>
        </div>

        {/* ACTION SECTION */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-[18px] bg-white px-5 py-3.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95 sm:flex-none md:py-4"
            >
              <span className="text-emerald-500">{secondaryAction.icon}</span>
              {secondaryAction.label}
            </button>
          )}

          <button
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            className={cn(
              "flex flex-1 items-center justify-center gap-3 rounded-[18px] px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-30 sm:flex-none md:py-4",
              /* Use provided className or default to the Slate/Emerald logic we had */
              primaryAction.className || "bg-slate-900 shadow-slate-200"
            )}
          >
            {primaryAction.loading ? <Loader2 className="animate-spin" size={18} /> : primaryAction.icon}
            {primaryAction.loading ? "Processing..." : primaryAction.label}
          </button>
        </div>
      </div>
    </div>
  )
}
