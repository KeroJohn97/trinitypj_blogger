import church from "@/../assets/church.jpg"
import { Button } from "@/components/ui/button"
import HomeCarousel from "app/[lang]/app-components/home-carousel"
import YoutubeButton from "app/[lang]/app-components/youtube-button"

// Define the structure of the dictionary required by this component
interface HeroSectionProps {
  dict: {
    title: string
    vision: {
      line1: string
      line2: string
      line3: string
    }
    getDirections: string
    // Add these 3 new lines:
    watchLive: string
    videoTitle: string
    videoDesc: string
  }
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      className="relative bg-gray-900 bg-cover bg-center bg-no-repeat py-20 lg:py-32"
      style={{
        backgroundImage: `url(${church.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            {/* Translated Title */}
            <h1 className="mb-6 text-4xl font-bold text-balance text-white lg:text-6xl">{dict.title}</h1>

            {/* Translated Vision Statements */}
            <div className="space-y-4 text-xl text-pretty text-gray-200">
              <p>{dict.vision.line1}</p>
              <p>{dict.vision.line2}</p>
              <p>{dict.vision.line3}</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="px-8 text-base font-semibold" asChild>
                <a href="https://maps.app.goo.gl/EHhX5cWQHERFD4AR6" target="_blank" rel="noopener noreferrer">
                  {dict.getDirections}
                </a>
              </Button>

              <YoutubeButton dict={dict} />
            </div>
          </div>

          <HomeCarousel />
        </div>
      </div>
    </section>
  )
}
