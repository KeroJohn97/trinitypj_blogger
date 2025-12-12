"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface TemporaryBannerProps {
  startDate: string // ISO date string (e.g., "2024-12-01")
  endDate: string // ISO date string (e.g., "2025-02-01")
  message: string
  link?: string
}

export const TemporaryBanner = ({ startDate, endDate, message, link }: TemporaryBannerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Check Local Storage to see if user dismissed it previously
    const isDismissed = false

    // Logic: Is it within the date range AND not dismissed?
    if (now >= start && now <= end && !isDismissed) {
      setIsVisible(true)
    }
  }, [startDate, endDate])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("temp-banner-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="bg-primary relative px-4 py-3 text-white transition-all duration-300 sm:px-6 lg:px-8">
      <div className="pr-8 text-center text-sm font-medium sm:text-base">
        {message}{" "}
        {link && (
          <a href={link} className="underline decoration-2 underline-offset-2 hover:text-indigo-100">
            Learn more &rarr;
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-0 right-0 block p-3 transition-colors hover:bg-indigo-500/50"
        aria-label="Dismiss"
      >
        <X className="h-5 w-5 text-white" />
      </button>
    </div>
  )
}
