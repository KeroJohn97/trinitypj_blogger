"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { MediaItem, StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { Card } from "@/components/ui/card"
import { Calendar, CalendarDays, MapPin, Users } from "lucide-react"
import { useState } from "react"

const youthVideos: MediaItem[] = [
  {
    id: "1",
    type: "video",
    youtubeId: "lBjoZrvYxc8",
  },
  {
    id: "2",
    type: "video",
    youtubeId: "NwTCgKpDJOE",
  },
  {
    id: "3",
    type: "video",
    youtubeId: "ogeHV4kQoZE",
  },
  {
    id: "4",
    type: "video",
    youtubeId: "rQkKwnUoyOY",
  },
  {
    id: "5",
    type: "video",
    youtubeId: "9OxjDOvh-iY",
  },
  {
    id: "6",
    type: "video",
    youtubeId: "W3z_DICxYqk",
  },
]

export default function MYFPage() {
  const [galleryVisible, setGalleryVisible] = useState(true)

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* <!-- Hero Section --> */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://trinitypj.com/wp-content/uploads/2019-Youth-Camp-high-res-file-min-scaled.jpg"
            alt="Trail runners"
            className="h-full w-full object-cover"
          />
          <div className="to-background absolute inset-0 bg-linear-to-b from-black/60 via-black/50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-emerald-500">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-balance sm:text-6xl md:text-8xl lg:text-9xl">
            METHODIST
            <br />
            YOUTH
            <br />
            FELLOWSHIP
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-pretty text-white md:text-2xl">
            Hi, there! Welcome to the Community of Young People!
          </p>
        </div>

        {/* <!-- Scroll indicator --> */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="border-muted-foreground/50 flex h-10 w-6 items-start justify-center rounded-full border-2 p-2">
            <div className="bg-muted-foreground/50 h-3 w-1 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* <!-- Event Details --> */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/30 border-muted hover:border-accent p-8 transition-colors">
              <Calendar className="text-accent mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Time</h3>
              <p className="text-muted-foreground text-lg">
                Every Sunday
                <br />
                11:00 AM - 12:30 PM
              </p>
            </Card>

            <Card className="bg-muted/30 border-muted hover:border-accent p-8 transition-colors">
              <MapPin className="text-accent mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Location</h3>
              <p className="text-muted-foreground text-lg">TLS Sanctuary Activity Room</p>
            </Card>

            <Card className="bg-muted/30 border-muted hover:border-accent p-8 transition-colors">
              <Users className="text-accent mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Weekly Participation</h3>
              <p className="text-muted-foreground text-lg">30+</p>
            </Card>

            <Card className="bg-muted/30 border-muted hover:border-accent p-8 transition-colors">
              <CalendarDays className="text-accent mb-4 h-12 w-12" />
              <h3 className="mb-2 text-2xl font-bold">Ages</h3>
              <p className="text-muted-foreground text-lg">13-18 Years Old</p>
            </Card>
          </div>
        </div>
      </section>

      {/* <!-- Added animated photo gallery section --> */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              EXPERIENCE THE JOURNEY
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              We welcome everyone who shares the faith and interested to come by and be part of community. Friends or
              Friends of Friends, there is nothing like growing and building faith together as Young People, so why not
              come by this weekend?!
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="https://trinitypj.com/wp-content/uploads/MYF-2023-min-scaled.jpg"
                alt="MYF - 2023"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-screen items-center justify-center overflow-hidden">
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-xl">
          <a
            href="https://linktr.ee/myf_trinitypj"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-2xl font-medium text-emerald-600 transition duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-emerald-600 after:transition-transform after:duration-300 hover:text-emerald-800 hover:after:origin-left hover:after:scale-x-100"
          >
            → You are never too far, never too lost, never too forgotten, never too sinful and never too disconnected.
            God’s love for you through community, begins today! ←
          </a>
        </p>
        <div className="flex items-center justify-center">
          <a href="https://linktr.ee/myf_trinitypj" target="_blank" rel="noopener noreferrer">
            <img src="https://trinitypj.com/wp-content/uploads/MYF-2023-1-min.jpg" alt="MYF Logo 2023"></img>
          </a>
        </div>
      </section>

      {/* <!-- Race Highlights Section --> */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              REAL ON REELS
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              A place where we share around real stories and real moments of our encounters with Christ for you to be
              inspired and encouraged by, through your continuous faith in Jesus Christ
            </p>
          </div>

          <StaggeredMediaGallery items={youthVideos} />
        </div>
      </section>
      <p className="mb-16"></p>
      <Footer />
    </div>
  )
}
