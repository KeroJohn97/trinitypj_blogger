"use client"

import { Footer } from "@/components/footer"
import { Gallery } from "@/components/gallery"

export default function GalleryPage() {
  return (
    <div>
      <div className="min-h-screen py-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                Our
                <span className="block text-emerald-600">Gallery</span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Explore moments of joy, connection, and community through our collection of photos capturing the heart
                of Trinity Methodist Church PJ.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Gallery />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
