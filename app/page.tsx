import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import NewsGrid from "@/components/news-grid"
import { OngoingEvents } from "@/components/ongoing-events"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Heart, MapPin, Users } from "lucide-react"
import Link from "next/link"
import HomeCarousel from "./app-components/home-carousel"
import YoutubeButton from "./app-components/youtube-button"

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="from-primary/10 to-accent/5 relative bg-linear-to-br py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-foreground mb-6 text-4xl font-bold text-balance lg:text-6xl">
                Welcome to Trinity Methodist Church PJ
              </h1>
              <p className="text-muted-foreground mb-4 text-xl text-pretty">
                Everyone a disciple, rooted and built up in Jesus Christ
              </p>
              <p className="text-muted-foreground mb-4 text-xl text-pretty">Every family discipled for Jesus Christ</p>
              <p className="text-muted-foreground mb-4 text-xl text-pretty">
                Everyone united in ministry for Jesus Christ
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="font-semibold"
                  href="https://maps.app.goo.gl/EHhX5cWQHERFD4AR6"
                  target="_blank"
                >
                  Join Us This Sunday
                </Button>
                <YoutubeButton />
              </div>
            </div>
            <HomeCarousel />
          </div>
        </div>
      </section>

      {/* <EventBanner
        title="Christmas Celebration 2025"
        subtitle="Join Us for a Special Holiday Service"
        date="December 25, 2025"
        time="10:00 AM"
        location="Trinity Methodist Church PJ Main Sanctuary"
        description="Celebrate the birth of our Savior with carols, special music, and a message of hope and joy for all families."
        backgroundType="pattern"
        colorScheme="festive"
        ctaText="Register Now"
        ctaLink="/events/christmas-2025"
      /> */}

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Latest Updates
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            Stay informed with our latest announcements, events, and ministry highlights
          </p>
        </div>
        <NewsGrid />
      </div>

      <OngoingEvents />

      {/* Quick Links */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Explore Our Church</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Discover the various ways you can connect, grow, and serve with us
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <Heart className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Small Groups</h3>
                <p className="text-muted-foreground mb-4 text-sm">Experience our warm and inclusive community</p>
                <Link href="/welcoming">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Vision & Mission</h3>
                <p className="text-muted-foreground mb-4 text-sm">Discover our purpose and calling</p>
                <Link href="/vision-mission">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Connect With Us</h3>
                <p className="text-muted-foreground mb-4 text-sm">Find us and explore our church ministries</p>
                <Link href="/location-services">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <Calendar className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Alpha Course</h3>
                <p className="text-muted-foreground mb-4 text-sm">Join our restoration initiative</p>
                <Link href="/alpha-course">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
