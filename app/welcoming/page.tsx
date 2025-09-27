import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { StaggeredGallery } from "@/components/staggered-gallery"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Coffee, Handshake } from "lucide-react"

const welcomingImages = [
  {
    id: "1",
    src: "/images/welcome-team.png",
    alt: "Welcome team greeting visitors",
    title: "Warm Greetings",
    description: "Our welcome team is always ready to greet you with a smile",
  },
  {
    id: "2",
    src: "/church-fellowship-hall-coffee-time.jpg",
    alt: "Fellowship time with coffee",
    title: "Fellowship Time",
    description: "Enjoy coffee and conversation after service",
  },
  {
    id: "3",
    src: "/diverse-church-congregation-worship.jpg",
    alt: "Diverse congregation in worship",
    title: "Inclusive Community",
    description: "People from all walks of life worship together",
  },
  {
    id: "4",
    src: "/church-newcomer-orientation-session.jpg",
    alt: "Newcomer orientation",
    title: "Newcomer Orientation",
    description: "Special sessions to help new members feel at home",
  },
  {
    id: "5",
    src: "/church-small-group-bible-study.jpg",
    alt: "Small group Bible study",
    title: "Small Groups",
    description: "Connect with others through small group studies",
  },
  {
    id: "6",
    src: "/church-community-meal-sharing.jpg",
    alt: "Community meal",
    title: "Community Meals",
    description: "Regular meals that bring our church family together",
  },
]

export default function WelcomingPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="A Welcoming Community"
        subtitle="Experience the warmth and love of our church family from the moment you walk through our doors"
        backgroundType="gradient"
        colorScheme="warm"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Everyone Belongs Here</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  At Trinity PJ Methodist Church, we believe that every person who walks through our doors is a gift
                  from God. Whether you're visiting for the first time or have been part of our community for years, you
                  will find a place where you belong.
                </p>
                <p className="mb-4">
                  Our welcoming ministry is dedicated to ensuring that everyone feels valued, loved, and included. From
                  our friendly greeters at the door to our newcomer orientation programs, we're committed to helping you
                  find your place in our church family.
                </p>
                <p>
                  We celebrate diversity and welcome people from all backgrounds, cultures, and walks of life. Together,
                  we create a community where authentic relationships flourish and everyone can grow in their faith
                  journey.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/5 rounded-2xl p-8">
                <h3 className="text-foreground mb-6 text-2xl font-bold">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Heart className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 font-semibold">Warm Welcome</h4>
                      <p className="text-muted-foreground text-sm">
                        Our welcome team will greet you with genuine smiles and help you feel at home
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Coffee className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 font-semibold">Fellowship Time</h4>
                      <p className="text-muted-foreground text-sm">
                        Join us for coffee and light refreshments after service to meet new friends
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 font-semibold">Connection Opportunities</h4>
                      <p className="text-muted-foreground text-sm">
                        Discover small groups, ministries, and volunteer opportunities that match your interests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                      <Handshake className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 font-semibold">Personal Support</h4>
                      <p className="text-muted-foreground text-sm">
                        Our pastoral team and volunteers are here to support you in your spiritual journey
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">See Our Welcoming Spirit</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Experience the warmth and joy of our community through these moments of fellowship and connection
              </p>
            </div>
            <StaggeredGallery images={welcomingImages} />
          </div>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-foreground mb-4 text-2xl font-bold">Ready to Visit?</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                We would love to meet you and welcome you into our church family. Come as you are – you'll find a place
                where you belong.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-semibold transition-colors">
                  Plan Your Visit
                </button>
                <button className="border-primary text-primary hover:bg-primary/10 rounded-lg border px-6 py-3 font-semibold transition-colors">
                  Contact Us
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
