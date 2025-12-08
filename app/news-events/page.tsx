"use client"

import { MediaItem, StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { Card } from "@/components/ui/card"
import { Calendar, CalendarDays, MapPin, Users } from "lucide-react"
import { useState } from "react"
import smallGroup from "@/../assets/small-group.png"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import NewsGrid from "@/components/news-grid"

export default function NewsEventsPage() {
  const [galleryVisible, setGalleryVisible] = useState(true)

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${smallGroup.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">News & Events</h1>
          <p className="mt-3 text-lg"> Join us for a dedicated time of prayer for our church, community, and nation</p>
        </div>
      </section>
      <p className="mb-16"></p>

      <NewsGrid />

      <p className="mb-16"></p>
      <Footer />
    </div>
  )
}
