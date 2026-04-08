"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

interface EventBannerProps {
  title: string
  subtitle?: string
  date: string
  time?: string
  location: string
  description?: string
  backgroundType?: "gradient" | "image" | "pattern"
  backgroundImage?: string
  colorScheme?: "primary" | "festive" | "warm" | "cool"
  ctaText?: string
  ctaLink?: string
}

export function EventBanner({
  title,
  subtitle,
  date,
  time,
  location,
  description,
  backgroundType = "gradient",
  backgroundImage,
  colorScheme = "primary",
  ctaText = "Learn More",
  ctaLink = "#",
}: EventBannerProps) {
  const getBackgroundClasses = () => {
    if (backgroundType === "image" && backgroundImage) {
      return `bg-cover bg-center bg-no-repeat`
    }

    switch (colorScheme) {
      case "festive":
        return "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
      case "warm":
        return "bg-gradient-to-r from-orange-500 to-pink-500"
      case "cool":
        return "bg-gradient-to-r from-emerald-500 to-purple-500"
      default:
        return "bg-gradient-to-r from-primary to-accent"
    }
  }

  const getPatternOverlay = () => {
    if (backgroundType === "pattern") {
      return (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="celebration" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="80" cy="40" r="2" fill="currentColor" />
                <circle cx="40" cy="80" r="4" fill="currentColor" />
                <circle cx="60" cy="10" r="2" fill="currentColor" />
                <circle cx="10" cy="60" r="3" fill="currentColor" />
                <circle cx="90" cy="80" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#celebration)" />
          </svg>
        </div>
      )
    }
    return null
  }

  return (
    <section
      className={`relative overflow-hidden py-16 lg:py-24 ${getBackgroundClasses()}`}
      style={backgroundType === "image" && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Pattern overlay */}
      {getPatternOverlay()}

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />
      <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
      <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-white/5 blur-lg" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          {subtitle && <p className="mb-4 text-lg font-medium opacity-90 lg:text-xl">{subtitle}</p>}

          <h2 className="mb-6 text-4xl font-bold text-balance lg:text-6xl">{title}</h2>

          {description && (
            <p className="mx-auto mb-8 max-w-3xl text-xl text-pretty opacity-90 lg:text-2xl">{description}</p>
          )}

          {/* Event Details */}
          <div className="mb-8 flex flex-col items-center justify-center gap-6 text-lg sm:flex-row lg:gap-8 lg:text-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="font-medium">{date}</span>
            </div>

            {time && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="font-medium">{time}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="font-medium">{location}</span>
            </div>
          </div>

          <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold" asChild>
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
