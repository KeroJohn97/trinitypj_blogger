"use client"

import { Footer } from "@/components/footer"
import NewsGrid from "@/components/news-grid"
import { PageHeader } from "@/components/page-header"
import { useState } from "react"

export default function NewsEventsPage() {
  const [galleryVisible, setGalleryVisible] = useState(true)

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title={"News & Events"}
        subtitle="Stay connected with our latest updates, upcoming gatherings, and opportunities to grow together"
      />
      <p className="mb-16"></p>

      <div className="mx-12">
        <NewsGrid />
      </div>

      <p className="mb-16"></p>
      <Footer />
    </div>
  )
}
