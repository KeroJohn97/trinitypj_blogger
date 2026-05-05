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
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import UpcomingActivitiesCarousel from "./app-components/upcoming-activities-carousel"
import { LandingNoticeService } from "@/services/landing-notice-service"
import { LandingNoticeModal } from "@/components/landing-notice-modal"
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

        <LandingNoticeModal notices={notices} />

        <RevealOnScroll>
          <WhatsNewSection />
        </RevealOnScroll>

        <RevealOnScroll>
          <UpcomingActivitiesCarousel dict={dict.home} />
        </RevealOnScroll>

        <RevealOnScroll>
          <OngoingEvents dict={dict.ongoingEvents} />
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((feature, index) => {
                const key = feature.id as keyof typeof dict.home.quickLinks
                const content = dict.home.quickLinks[key]

                if (!content) return null

                return (
                  <RevealOnScroll key={feature.id} delay={index * 0.1}>
                    <Link href={feature.href} className="group block h-full">
                      <Card className="h-full border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
                        <CardContent className="flex h-full flex-col p-8">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                            <feature.icon className="h-7 w-7" />
                          </div>

                          <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {content.title}
                          </h3>
                          
                          <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500">
                            {content.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                            {dict.home.explore.action}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
