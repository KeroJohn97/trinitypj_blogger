import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { StaggeredGallery } from "@/components/staggered-gallery"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Building, Heart, Users, Target, Calendar, DollarSign } from "lucide-react"

const projectImages = [
  {
    id: "1",
    src: "/church-sanctuary-renovation-before.jpg",
    alt: "Sanctuary before renovation",
    title: "Before Renovation",
    description: "Our beloved sanctuary before the restoration project",
  },
  {
    id: "2",
    src: "/church-sanctuary-construction-progress.jpg",
    alt: "Construction in progress",
    title: "Work in Progress",
    description: "Restoration work currently underway",
  },
  {
    id: "3",
    src: "/church-sanctuary-architectural-plans.jpg",
    alt: "Architectural plans",
    title: "Design Plans",
    description: "Architectural drawings for the new sanctuary",
  },
  {
    id: "4",
    src: "/church-volunteers-construction-work.jpg",
    alt: "Volunteers helping",
    title: "Community Effort",
    description: "Church members volunteering their time and skills",
  },
  {
    id: "5",
    src: "/church-sanctuary-new-features.jpg",
    alt: "New sanctuary features",
    title: "Modern Features",
    description: "Updated lighting and sound systems",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Worship space vision",
    title: "Vision Realized",
    description: "The completed sanctuary ready for worship",
  },
]

export default function SanctuaryProjectPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Sanctuary Restoration Project"
        subtitle="Renewing our sacred space for worship, fellowship, and community gathering for generations to come"
        backgroundType="gradient"
        colorScheme="warm"
      />

      {/* Project Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Restoring Our Sacred Space</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  After 50 years of faithful service, our beloved sanctuary is undergoing a comprehensive restoration to
                  ensure it continues to serve our community for generations to come. This project represents more than
                  just building improvements – it's an investment in our shared future.
                </p>
                <p className="mb-4">
                  The restoration includes structural reinforcement, updated electrical and sound systems, improved
                  accessibility features, and enhanced lighting to create a more welcoming and functional worship space.
                </p>
                <p>
                  Every aspect of this project has been carefully planned to preserve the sacred character of our
                  sanctuary while incorporating modern amenities that will serve our growing congregation.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-foreground mb-6 text-2xl font-bold">Project Progress</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-foreground font-semibold">Overall Progress</span>
                        <span className="text-primary font-bold">65%</span>
                      </div>
                      <Progress value={65} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="rounded-lg bg-white p-4">
                        <div className="text-primary mb-1 text-2xl font-bold">RM 450K</div>
                        <div className="text-muted-foreground text-sm">Raised</div>
                      </div>
                      <div className="rounded-lg bg-white p-4">
                        <div className="text-primary mb-1 text-2xl font-bold">RM 700K</div>
                        <div className="text-muted-foreground text-sm">Goal</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Structural Work</span>
                        <span className="text-primary font-semibold">Completed</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Electrical Systems</span>
                        <span className="text-primary font-semibold">In Progress</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Interior Finishing</span>
                        <span className="text-muted-foreground">Ongoing</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project Features */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Project Features</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Discover the improvements that will enhance our worship experience and community gatherings
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Building className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Structural Reinforcement</h3>
                  <p className="text-muted-foreground text-sm">
                    Strengthening the foundation and framework to ensure safety and longevity for decades to come
                  </p>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Accessibility Improvements</h3>
                  <p className="text-muted-foreground text-sm">
                    Installing ramps, accessible restrooms, and seating areas to welcome everyone in our community
                  </p>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Target className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Modern Sound System</h3>
                  <p className="text-muted-foreground text-sm">
                    State-of-the-art audio equipment to ensure clear hearing for all worship services and events
                  </p>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Enhanced Lighting</h3>
                  <p className="text-muted-foreground text-sm">
                    Energy-efficient LED lighting system creating a warm, welcoming atmosphere for worship
                  </p>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Climate Control</h3>
                  <p className="text-muted-foreground text-sm">
                    Improved HVAC system for year-round comfort during services and community events
                  </p>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Building className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-3 font-bold">Flexible Seating</h3>
                  <p className="text-muted-foreground text-sm">
                    Modular seating arrangements to accommodate different types of services and community gatherings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Project Timeline</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Track our progress through each phase of the restoration project
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  phase: "Phase 1: Planning & Design",
                  period: "Jan - Mar 2024",
                  status: "completed",
                  description: "Architectural planning, permits, and community input sessions",
                },
                {
                  phase: "Phase 2: Structural Work",
                  period: "Apr - Aug 2024",
                  status: "completed",
                  description: "Foundation reinforcement and structural improvements",
                },
                {
                  phase: "Phase 3: Systems Installation",
                  period: "Sep 2024 - Feb 2025",
                  status: "current",
                  description: "Electrical, sound, lighting, and HVAC system installation",
                },
                {
                  phase: "Phase 4: Interior Finishing",
                  period: "Mar - Jun 2025",
                  status: "upcoming",
                  description: "Flooring, seating, painting, and final interior work",
                },
                {
                  phase: "Phase 5: Final Touches",
                  period: "Jul - Aug 2025",
                  status: "upcoming",
                  description: "Final inspections, testing, and preparation for reopening",
                },
              ].map((phase, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-4 w-4 rounded-full ${
                        phase.status === "completed"
                          ? "bg-primary"
                          : phase.status === "current"
                          ? "bg-primary animate-pulse"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    {index < 4 && <div className="bg-muted-foreground/20 mt-2 h-16 w-0.5" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-foreground font-bold">{phase.phase}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          phase.status === "completed"
                            ? "bg-primary/10 text-primary"
                            : phase.status === "current"
                            ? "bg-primary/20 text-primary font-semibold"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {phase.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Project Gallery</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Follow our restoration journey through these progress photos and architectural renderings
              </p>
            </div>
            <StaggeredGallery images={projectImages} />
          </div>

          {/* Support CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <DollarSign className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Support Our Project</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                Your generous contribution helps us create a beautiful, accessible worship space that will serve our
                community for generations. Every gift, large or small, makes a difference.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 font-semibold transition-colors">
                  Make a Donation
                </button>
                <button className="border-primary text-primary hover:bg-primary/10 rounded-lg border px-8 py-3 font-semibold transition-colors">
                  Volunteer to Help
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
