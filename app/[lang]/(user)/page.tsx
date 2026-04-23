import { HeroSection } from "@/components/hero-section"
import { OngoingEvents } from "@/components/ongoing-events"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { TemporaryBanner } from "@/components/temporary-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quickLinks } from "@/lib/data"
// Ensure this path matches where you actually created the getDictionary helper
import { getWebsiteSettings } from "@/lib/db/website"
import { getDictionary } from "dictionaries"
import Link from "next/link"
import UpcomingActivitiesCarousel from "./app-components/upcoming-activities-carousel"
import { LandingNoticeService } from "@/services/landing-notice-service"
import { LandingNoticesSection } from "@/components/landing-notices-section"
import WhatsNewSection from "components/WhatsNewSection"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  const siteSettings = await getWebsiteSettings()
  const notices = await LandingNoticeService.getAll()

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Banner Section */}
        <TemporaryBanner
          startDate="2025-11-01"
          endDate="2025-12-31"
          // Revert this to hardcoded string OR handle it differently
          message="MW Connect | May – Sep 2025 Issue"
          link="https://drive.google.com/file/d/11NuJQ4bgEUmJs_rJEbJlzyqVt1aVqtN_/view?usp=drive_link"
        />

        <RevealOnScroll priority={true}>
          <HeroSection dict={dict.hero} />
        </RevealOnScroll>

        {/* Dynamic Landing Spotlight Notices */}
        <LandingNoticesSection notices={notices} />

        <RevealOnScroll>
          <UpcomingActivitiesCarousel dict={dict.home} />
        </RevealOnScroll>

        <RevealOnScroll>
          <OngoingEvents dict={dict.ongoingEvents} />
        </RevealOnScroll>

        {/* Dynamic What's New Feed */}
        <RevealOnScroll>
          <WhatsNewSection />
        </RevealOnScroll>

        {/* Explore Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                  {dict.home.explore.title} {/* <--- Translated */}
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  {dict.home.explore.description} {/* <--- Translated */}
                </p>
              </div>
            </RevealOnScroll>

            <div className="flex flex-wrap justify-center gap-6">
              {quickLinks.map((feature, index) => {
                // LOOKUP TRANSLATION HERE
                // We cast 'feature.id' to specific keys to satisfy TypeScript
                const key = feature.id as keyof typeof dict.home.quickLinks
                const content = dict.home.quickLinks[key]

                if (!content) return null

                return (
                  <RevealOnScroll key={feature.id} delay={index * 0.1} className="h-full w-full md:w-[280px]">
                    <Card className="group h-full transition-shadow duration-300">
                      <CardContent className="flex h-full flex-col items-center p-6 text-center">
                        <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                          <feature.icon className="text-primary h-6 w-6" />
                        </div>

                        {/* Use Translated Content */}
                        <h3 className="text-foreground mb-2 font-semibold">{content.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-1 text-sm">{content.description}</p>

                        <Button asChild variant="outline" size="sm" className="mt-auto">
                          <Link href={feature.href}>
                            {dict.home.explore.action} {/* "Learn More" */}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </RevealOnScroll>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
