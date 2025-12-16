import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { OngoingEvents } from "@/components/ongoing-events"
import { RevealOnScroll } from "@/components/reveal-on-scroll" // Import the new component
import { TemporaryBanner } from "@/components/temporary-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quickLinks } from "@/lib/data"
import { getDictionary } from "dictionaries"
import Link from "next/link"
import NoticeCarousel from "./app-components/notice-carousel"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const { lang } = await params

  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Banner - No animation needed (it's at the top) */}
        <TemporaryBanner
          startDate="2025-11-01"
          endDate="2025-12-31"
          message="MW Connect | May – Sep 2025 Issue"
          link="https://drive.google.com/file/d/11NuJQ4bgEUmJs_rJEbJlzyqVt1aVqtN_/view?usp=drive_link"
        />

        {/* Hero Section - Usually loads instantly, but we can add a subtle fade if desired */}
        <RevealOnScroll priority={true}>
          <HeroSection />
        </RevealOnScroll>

        {/* Carousel Section - Fades up as user scrolls down */}
        <RevealOnScroll>
          <NoticeCarousel />
        </RevealOnScroll>

        {/* Events Section */}
        <RevealOnScroll>
          <OngoingEvents />
        </RevealOnScroll>

        {/* Quick Links / Explore Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Animation */}
            <RevealOnScroll>
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Explore Our Church</h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  Discover the various ways you can connect, grow, and serve with us
                </p>
              </div>
            </RevealOnScroll>

            {/* Grid Animation */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((feature, index) => (
                // We add a 'delay' based on the index to create a "waterfall" effect
                <RevealOnScroll key={feature.title} delay={index * 0.1} className="h-full">
                  <Card className="group h-full transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col items-center p-6 text-center">
                      <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                        <feature.icon className="text-primary h-6 w-6" />
                      </div>
                      <h3 className="text-foreground mb-2 font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm">{feature.description}</p>
                      <Button asChild variant="outline" size="sm" className="mt-auto">
                        <Link href={feature.href}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
