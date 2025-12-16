import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Bus, Car, Clock, Mail, MapPin, Phone, Users } from "lucide-react"
import Link from "next/link"

export default function LocationServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Location & Services" subtitle="Join us this Sunday in the heart of Petaling Jaya" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* PRIORITY 1: Service Times (The "When") */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Weekly Services</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              We gather every Sunday for worship, teaching, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* English Services - Combined Card */}
            <Card className="group border-primary/50 relative overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-primary absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-bold text-white">
                ENGLISH
              </div>
              <CardContent className="flex h-full flex-col justify-between p-8 text-center">
                <div>
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                    <Clock className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="text-foreground mb-6 text-xl font-bold">English Services</h3>

                  {/* 9:00 AM Slot */}
                  <div className="border-border/50 mb-6 border-b pb-6">
                    <p className="text-primary mb-1 text-3xl font-extrabold tracking-tight">9:00 AM</p>
                    <p className="text-muted-foreground text-sm font-medium">Main Service</p>
                    <p className="text-muted-foreground mt-1 text-xs">Hymns & Contemporary Songs</p>
                  </div>

                  {/* 5:00 PM Slot */}
                  <div className="mb-2">
                    <p className="text-primary mb-1 text-2xl font-bold tracking-tight">5:00 PM</p>
                    <p className="text-muted-foreground text-sm font-medium">Traditional Service</p>
                    <p className="text-muted-foreground mt-1 text-xs">Hymns Only</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chinese Service */}
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex h-full flex-col justify-between p-8 text-center">
                <div>
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                    <Users className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="text-foreground mb-1 text-xl font-bold">Chinese Service</h3>
                  <p className="text-primary mb-3 text-3xl font-bold">9:00 AM</p>
                  <p className="text-muted-foreground mb-6 text-sm">Service conducted in Mandarin.</p>
                </div>
                <div className="text-muted-foreground mt-auto flex items-center justify-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>~100 attendees</span>
                </div>
              </CardContent>
            </Card>

            {/* Youth Service */}
            <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex h-full flex-col justify-between p-8 text-center">
                <div>
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                    <Users className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="text-foreground mb-1 text-xl font-bold">Youth Fellowship</h3>
                  <p className="text-primary mb-3 text-3xl font-bold">11:00 AM</p>
                  <p className="text-muted-foreground mb-6 text-sm">Methodist Youth Fellowship (MYF) for ages 13-18.</p>
                </div>
                <div className="text-muted-foreground mt-auto flex items-center justify-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>~40 attendees</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PRIORITY 2: Location & Logistics (The "Where") */}
        <section className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Address & Contact */}
          <div>
            <h2 className="text-foreground mb-6 text-3xl font-bold">Find Us</h2>

            {/* Main Address Card */}
            <div className="bg-muted/30 border-border/50 mb-8 rounded-xl border p-6">
              <div className="mb-6 flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-bold">Trinity Methodist Church PJ</h3>
                  <a
                    href="https://goo.gl/maps/YOUR_LINK_HERE"
                    target="_blank"
                    className="text-muted-foreground hover:text-primary mb-4 block transition-colors"
                  >
                    6 Jalan 5/37
                    <br />
                    46000 Petaling Jaya, Selangor
                    <br />
                    Malaysia
                  </a>
                  <a
                    href="https://goo.gl/maps/YOUR_LINK_HERE"
                    target="_blank"
                    className="text-primary inline-flex items-center text-sm font-semibold hover:underline"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="border-border/10 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">Phone</p>
                    <p className="text-sm">(+60)3-7956 5986</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">Email</p>
                    <p className="text-sm">admin@trinitypj.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 px-2">
              <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Clock className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-foreground mb-1 font-semibold">Office Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  <span className="text-primary font-medium">Sunday: Closed (Worship Services Only)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Getting Here Logistics */}
          <div className="flex flex-col justify-center">
            <div className="bg-card rounded-2xl border p-8 shadow-sm">
              <h3 className="text-foreground mb-6 text-2xl font-bold">Getting Here</h3>

              <div className="space-y-8">
                {/* Car */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Car className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">By Car</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Free parking available within the church compound.
                      <br />
                      <span className="text-xs italic">
                        Tip: Additional street parking is available along Jalan 5/37 on weekends.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Public Transport */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Bus className="text-primary h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">Public Transport</h4>
                    <div className="mt-2 space-y-4">
                      {/* LRT */}
                      <div>
                        <p className="text-sm font-medium">LRT: Taman Jaya Station</p>
                        <p className="text-muted-foreground text-xs">6 mins drive / Grab ride from station</p>
                      </div>

                      {/* Bus Option 1 */}
                      <div>
                        <p className="text-sm font-medium">Bus Stop: PJ Church (PJ472)</p>
                        <p className="text-muted-foreground mb-0.5 text-xs">8 mins walk</p>
                        <div className="bg-muted text-foreground border-border inline-block rounded border px-1.5 py-0.5 font-mono text-[10px]">
                          PJ01
                        </div>
                      </div>

                      {/* Bus Option 2 - NEW */}
                      <div>
                        <p className="text-sm font-medium">Bus Stop: KWSP Petaling Jaya</p>
                        <p className="text-muted-foreground mb-0.5 text-xs">8 mins walk</p>
                        <div className="flex flex-wrap gap-1">
                          {["750", "751", "770", "772"].map((bus) => (
                            <span
                              key={bus}
                              className="bg-muted text-foreground border-border inline-block rounded border px-1.5 py-0.5 font-mono text-[10px]"
                            >
                              {bus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* First Time Visitor Note */}
                <div className="bg-primary/5 border-primary/20 mt-2 rounded-lg border p-4">
                  <p className="text-foreground text-sm">
                    <strong className="text-primary mb-1 block">First-time visitor?</strong>
                    Look for our welcome team in <strong>green vest</strong> at the main entrance. They will help you
                    find a seat!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIORITY 3: Ministries (Tertiary Info) */}
        <section className="border-border/40 mb-16 border-t pt-16">
          <div className="mb-10 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold">Other Ways to Connect</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Beyond Sunday services, we have ministries for every age group.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Children's Ministry", desc: "Ages 3-12 • Sundays" },
              { title: "Adult Bible Study", desc: "Weekly Small Groups" },
              { title: "Community Outreach", desc: "Serving our neighbors" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-muted/20 hover:border-border flex items-center gap-4 rounded-lg border border-transparent p-4 transition-colors"
              >
                <div className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center md:p-12">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">Still have questions?</h3>
            <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-lg">
              We'd love to help you plan your first visit or answer any questions you have about our community.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSd7s_661yVduVKlqypiHtpYdHQnc6curIPWYfTB_C3HRprK6w/viewform"
                className="text-primary cursor-pointer rounded-lg bg-white px-8 py-3 font-bold shadow-lg transition-colors hover:bg-gray-100"
              >
                Plan Your Visit
              </Link>
              <Link
                href="mailto:admin@trinitypj.com"
                className="cursor-pointer rounded-lg border-2 border-white px-8 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                Email Us
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
