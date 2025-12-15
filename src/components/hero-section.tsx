import church from "@/../assets/church.jpg"
import { Button } from "@/components/ui/button"
import HomeCarousel from "app/app-components/home-carousel"
import YoutubeButton from "app/app-components/youtube-button"

// make sure to import YoutubeButton and HomeCarousel here

// Example image import - REPLACE THIS with your actual image path:
// import heroBg from "@/../assets/church-hero.jpg"
// For this demo, I will use a placeholder variable:

export function HeroSection() {
  return (
    <section
      // 1. Remove old gradient classes. Add bg-cover, bg-center.
      // Added bg-gray-900 as a fallback color while image loads.
      className="relative bg-gray-900 bg-cover bg-center bg-no-repeat py-20 lg:py-32"
      // 2. Set the background image inline
      style={{
        // if using an import, use: `url(${heroBg.src})`
        backgroundImage: `url(${church.src})`,
      }}
    >
      {/* 3. THE OVERLAY: A dark semi-transparent layer */}
      {/* Adjust 'bg-black/60' to /50 or /70 to make it lighter or darker */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>

      {/* 4. THE CONTENT CONTAINER: Needs relative and z-10 to sit ON TOP of the overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            {/* 5. TEXT COLORS: Changed from text-foreground to text-white */}
            <h1 className="mb-6 text-4xl font-bold text-balance text-white lg:text-6xl">
              Welcome to Trinity Methodist Church PJ
            </h1>
            {/* 6. SUBTEXT COLORS: Changed from text-muted-foreground to text-gray-200 (off-white) */}
            <div className="space-y-4 text-xl text-pretty text-gray-200">
              <p>Everyone a disciple, rooted and built up in Jesus Christ</p>
              <p>Every family discipled for Jesus Christ</p>
              <p>Everyone united in ministry for Jesus Christ</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="px-8 text-base font-semibold" // Added a bit more heft to the button
                href="https://maps.app.goo.gl/EHhX5cWQHERFD4AR6"
                target="_blank"
                asChild // Assuming you are using shadcn/ui Button with Next.js Link, use asChild
              >
                {/* Use Next/Link for internal links, standard a tag for external is fine though */}
                <a href="https://maps.app.goo.gl/EHhX5cWQHERFD4AR6" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
              {/* Ensure YoutubeButton handles dark backgrounds well (e.g. white outline or light color fill) */}
              <YoutubeButton />
            </div>
          </div>
          {/* The carousel will sit on top of the dark overlay, making it pop */}
          <HomeCarousel />
        </div>
      </div>
    </section>
  )
}
