import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { StaggeredGallery } from "@/components/staggered-gallery"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Globe, BookOpen, Users } from "lucide-react"

const visionImages = [
  {
    id: "1",
    src: "/church-outreach.png",
    alt: "Community service outreach",
    title: "Serving Others",
    description: "Reaching out to our community with love and service",
  },
  {
    id: "2",
    src: "/church-worship-praise-hands-raised.jpg",
    alt: "Worship and praise",
    title: "Worship Together",
    description: "United in praise and worship of our Lord",
  },
  {
    id: "3",
    src: "/church-bible-study-group-learning.jpg",
    alt: "Bible study group",
    title: "Growing in Faith",
    description: "Deepening our understanding through God's Word",
  },
  {
    id: "4",
    src: "/placeholder-xw86r.png",
    alt: "Youth ministry",
    title: "Next Generation",
    description: "Nurturing young hearts for Christ",
  },
  {
    id: "5",
    src: "/church-missions-global-outreach.jpg",
    alt: "Global missions",
    title: "Global Impact",
    description: "Spreading God's love around the world",
  },
  {
    id: "6",
    src: "/church-family-fellowship-gathering.jpg",
    alt: "Family fellowship",
    title: "Church Family",
    description: "Building lasting relationships in Christ",
  },
]

export default function VisionMissionPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Our Vision & Mission"
        subtitle="Guided by God's love, we strive to make disciples, serve others, and transform our community"
        backgroundType="gradient"
        colorScheme="primary"
      />

      {/* Vision Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <Target className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Our Vision</h2>
            <div className="mx-auto max-w-4xl">
              <p className="text-muted-foreground mb-8 text-xl text-pretty lg:text-2xl">
                "To be a vibrant, Christ-centered community that transforms lives and impacts our world through God's
                love, grace, and truth."
              </p>
              <div className="prose prose-lg text-muted-foreground mx-auto">
                <p>
                  We envision Trinity Methodist Church PJ as a beacon of hope in Petaling Jaya and
                  beyond. Our vision is to create a community where people from all walks of life can encounter the
                  transforming power of Jesus Christ, grow in their faith, and discover their God-given purpose.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Heart className="text-primary h-8 w-8" />
              </div>
              <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Our Mission</h2>
              <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl">
                We are called to make disciples of Jesus Christ for the transformation of the world through worship,
                fellowship, discipleship, and service.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="group text-center transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Worship</h3>
                  <p className="text-muted-foreground text-sm">
                    Gathering together to praise God, hear His Word, and experience His presence in our lives
                  </p>
                </CardContent>
              </Card>

              <Card className="group text-center transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Fellowship</h3>
                  <p className="text-muted-foreground text-sm">
                    Building authentic relationships and supporting one another as we journey together in faith
                  </p>
                </CardContent>
              </Card>

              <Card className="group text-center transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <BookOpen className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Discipleship</h3>
                  <p className="text-muted-foreground text-sm">
                    Growing in spiritual maturity through Bible study, prayer, and mentoring relationships
                  </p>
                </CardContent>
              </Card>

              <Card className="group text-center transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Globe className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Service</h3>
                  <p className="text-muted-foreground text-sm">
                    Serving our community and world with compassion, meeting needs and sharing God's love
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Our Core Values</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                These values guide everything we do as a church community
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Grace-Centered</h3>
                    <p className="text-muted-foreground">
                      We believe in God's unconditional love and extend grace to all people, recognizing that we are all
                      saved by grace through faith.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Biblically Grounded</h3>
                    <p className="text-muted-foreground">
                      Scripture is our foundation for faith and practice, guiding our decisions and shaping our
                      understanding of God's will.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Relationally Focused</h3>
                    <p className="text-muted-foreground">
                      We prioritize authentic relationships with God and one another, creating a community where people
                      can belong and grow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Missionally Minded</h3>
                    <p className="text-muted-foreground">
                      We are called to share the Gospel and serve others, both locally and globally, as we participate
                      in God's mission.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Culturally Relevant</h3>
                    <p className="text-muted-foreground">
                      We embrace our diverse community and seek to communicate God's timeless truth in ways that connect
                      with contemporary culture.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary-foreground text-sm font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 font-bold">Excellence Driven</h3>
                    <p className="text-muted-foreground">
                      We strive for excellence in all we do, honoring God with our best efforts in worship, ministry,
                      and service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Living Our Mission</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                See how our vision and mission come to life through the ministries and activities of our church
              </p>
            </div>
            <StaggeredGallery images={visionImages} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
