"use client"
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
  }
  secondaryAction: {
    label: string
    onClick: () => void
    icon: React.ReactNode
  }
}

export default function AdminHeader({ title, subtitle, primaryAction, secondaryAction }: AdminHeaderProps) {
  return (
    /* Higher Z-Index (z-50) ensures it stays on top of the list cards */
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl">
      <div className="w-full px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Title Section */}
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black tracking-tight text-gray-900 sm:text-2xl">{title}</h1>
            <p className="hidden text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase sm:block">{subtitle}</p>
          </div>

          {/* Action Section - Ensure icons are always visible */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={secondaryAction.onClick}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border-2 border-gray-100 bg-white px-3 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 active:scale-95 sm:h-12 sm:px-6"
            >
              {secondaryAction.icon}
              <span className="hidden md:inline">{secondaryAction.label}</span>
              <span className="md:hidden">Add</span> {/* Fallback text for mobile */}
            </button>

            <button
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled || primaryAction.loading}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 active:scale-95 disabled:bg-gray-200 sm:h-12 sm:px-8"
            >
              {primaryAction.loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                primaryAction.icon
              )}
              <span className="whitespace-nowrap">{primaryAction.loading ? "Saving..." : primaryAction.label}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
