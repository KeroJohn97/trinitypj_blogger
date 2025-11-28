import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Bus, Car, Clock, Mail, MapPin, Phone, Users } from "lucide-react"

export default function LocationServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Location & Services"
        subtitle="Find us in the heart of Petaling Jaya and discover all the ways we serve our community"
        backgroundType="gradient"
        colorScheme="cool"
      />

      {/* Location Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-6 text-3xl font-bold lg:text-4xl">Visit Us</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">Address</h3>
                    <a
                      href="https://maps.app.goo.gl/EHhX5cWQHERFD4AR6"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      <p>
                        6 Jalan 5/37
                        <br />
                        46000 Petaling Jaya, Selangor
                        <br />
                        Malaysia
                      </p>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">Phone</h3>
                    <p className="text-muted-foreground">(+60)3-7956 5986, (+60)3-7956 5872</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">Email</h3>
                    <p className="text-muted-foreground">admin@trinitypj.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 font-semibold">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed (Worship Services Only)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-foreground mb-6 text-2xl font-bold">Getting Here</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Car className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-2 font-semibold">By Car</h4>
                    <p className="text-muted-foreground text-sm">
                      Free parking available on-site. Enter via Jalan Methodist. Additional street parking available on
                      weekends.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Bus className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-2 font-semibold">Public Transport</h4>
                    <p className="text-muted-foreground text-sm">
                      Nearest LRT station: Taman Jaya (5 minutes walk)
                      <br />
                      Bus routes: T623, T624, T625
                      <br />
                      Grab/taxi drop-off point at main entrance
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border-primary/20 mt-6 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">
                  <strong>First-time visitors:</strong> Look for our welcome team in green shirts at the main entrance.
                  They'll be happy to help you find parking and show you around!
                </p>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Service Times</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Join us for worship every Sunday with services in both English and Chinese
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 font-bold">English Service</h3>
                  <p className="text-primary mb-2 text-2xl font-bold">9:00 AM</p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Traditional worship with hymns and contemporary songs
                  </p>
                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>~150 attendees</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 font-bold">Chinese Service</h3>
                  <p className="text-primary mb-2 text-2xl font-bold">9:00 AM</p>
                  <p className="text-muted-foreground mb-4 text-sm">Contemporary worship in Mandarin and Cantonese</p>
                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>~100 attendees</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border-primary/20 bg-primary/5 transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/20 group-hover:bg-primary/30 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 font-bold">Youth Fellowship</h3>
                  <p className="text-primary mb-2 text-2xl font-bold">11:00 AM</p>
                  <p className="text-muted-foreground mb-4 text-sm">Methodist Youth Fellowship (MYF) for ages 13-25</p>
                  <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>~40 attendees</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ministries & Services */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Our Ministries</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Discover the various ways we serve our community and help people grow in their faith
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Children's Ministry",
                  description: "Sunday School, VBS, and special programs for kids ages 3-12",
                  icon: Users,
                },
                {
                  title: "Youth Ministry",
                  description: "MYF programs, camps, and activities for teenagers and young adults",
                  icon: Users,
                },
                {
                  title: "Adult Bible Study",
                  description: "Weekly small groups studying God's Word together",
                  icon: Users,
                },
                {
                  title: "Worship Ministry",
                  description: "Choir, praise team, and instrumental music ministry",
                  icon: Users,
                },
                {
                  title: "Community Outreach",
                  description: "Food bank, elderly care, and neighborhood service projects",
                  icon: Users,
                },
                {
                  title: "Prayer Ministry",
                  description: "Prayer groups, healing ministry, and spiritual counseling",
                  icon: Users,
                },
              ].map((ministry, index) => (
                <Card key={index} className="group transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                      <ministry.icon className="text-primary h-5 w-5" />
                    </div>
                    <h3 className="text-foreground mb-2 font-bold">{ministry.title}</h3>
                    <p className="text-muted-foreground text-sm">{ministry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-foreground mb-4 text-2xl font-bold">Have Questions?</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                We'd love to hear from you! Whether you're planning a visit, looking for more information about our
                ministries, or need prayer support, don't hesitate to reach out.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-semibold transition-colors">
                  Contact Us
                </button>
                <button className="border-primary text-primary hover:bg-primary/10 rounded-lg border px-6 py-3 font-semibold transition-colors">
                  Plan Your Visit
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
