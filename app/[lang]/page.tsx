import { HeroSection } from "@/components/hero-section"
import { OngoingEvents } from "@/components/ongoing-events"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { TemporaryBanner } from "@/components/temporary-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quickLinks } from "@/lib/data"
// Ensure this path matches where you actually created the getDictionary helper
import { getDictionary } from "dictionaries"
import Link from "next/link"
import NoticeCarousel from "./app-components/notice-carousel"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  // Await params for Next.js 15+ support
  const { lang } = await params

  // Fetch the dictionary
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

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

        <RevealOnScroll>
          <NoticeCarousel dict={dict.home} />
        </RevealOnScroll>

        <RevealOnScroll>
          <OngoingEvents />
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((feature, index) => (
                <RevealOnScroll key={feature.title} delay={index * 0.1} className="h-full">
                  <Card className="group h-full transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="flex h-full flex-col items-center p-6 text-center">
                      <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                        <feature.icon className="text-primary h-6 w-6" />
                      </div>

                      {/* Note: Ideally, feature.title and description should also come from dict */}
                      <h3 className="text-foreground mb-2 font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1 text-sm">{feature.description}</p>

                      <Button asChild variant="outline" size="sm" className="mt-auto">
                        <Link href={feature.href}>
                          {dict.home.explore.action} {/* <--- Translated "Learn More" */}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
