"use client"

import { MediaItem, StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { Card } from "@/components/ui/card"
import { Calendar, CalendarDays, MapPin, Users } from "lucide-react"
import { useState } from "react"
import smallGroup from "@/../assets/small-group.png"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function SmallGroupsPage() {
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
          <h1 className="text-4xl font-bold">Small Groups</h1>
          <p className="mt-3 text-lg"> Check out what some of our small groups have been up to!</p>
        </div>
      </section>

      {/* <!-- Added animated photo gallery section --> */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              TOGETHER WE GROW
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Small groups have always been a part of our Methodist heritage, for the nurturing and continual spiritual
              growth of the church. It is through Small Groups that we can reach the most people in the most meaningful
              way as well as to enable us to provide all the essential elements for caring, spiritual growth and
              witnessing. Through the Small Groups Ministry we make disciples, identify leaders and give people the
              relationship and accountability they need.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="https://trinitypj.com/wp-content/uploads/SG-Bkt-Damansara-1030x636.jpg"
                alt="MYF - 2023"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <p className="mb-16"></p>
      <Footer />
    </div>
  )
}
