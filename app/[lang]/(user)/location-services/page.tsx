import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { getDictionary } from "dictionaries"
import { Bus, Car, Clock, Mail, MapPin, Phone, Users } from "lucide-react"
import Link from "next/link"

interface LocationServicesProps {
  dict: {
    header: { title: string; subtitle: string }
    services: {
      title: string
      subtitle: string
      english: { tag: string; title: string; morning: any; evening: any }
      chinese: { title: string; time: string; desc: string; attendees: string }
      youth: { title: string; time: string; desc: string; attendees: string }
    }
    findUs: {
      title: string
      churchName: string
      address: string
      openMaps: string
      phoneLabel: string
      emailLabel: string
      officeHours: { title: string; weekdays: string; saturday: string; sunday: string }
    }
    transport: {
      title: string
      car: { title: string; desc: string; tip: string }
      public: { title: string; lrt: any; bus1: any; bus2: any }
      visitor: { title: string; desc: string }
    }
    ministries: {
      title: string
      subtitle: string
      items: {
        kids: { title: string; desc: string }
        adults: { title: string; desc: string }
        outreach: { title: string; desc: string }
      }
    }
    cta: { title: string; desc: string; planVisit: string; emailUs: string }
  }
}

export default async function LocationServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = (await getDictionary(lang as "en-US" | "zh-CN")).locationServices

  const renderVisitorText = (text: string) => {
    const parts = text.split(/<bold>|<\/bold>/)
    return (
      <>
        {parts[0]}
        {parts[1] && <strong>{parts[1]}</strong>}
        {parts[2]}
      </>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={dict.header.title} subtitle={dict.header.subtitle} />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* PRIORITY 1: Service Times */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{dict.services.title}</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{dict.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* English Services */}
            <Card className="group border-primary/50 relative overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-primary absolute top-0 right-0 rounded-bl-lg px-3 py-1 text-xs font-bold text-white">
                {dict.services.english.tag}
              </div>
              <CardContent className="flex h-full flex-col justify-between p-8 text-center">
                <div>
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                    <Clock className="text-primary h-7 w-7" />
                  </div>
                  <h3 className="text-foreground mb-6 text-xl font-bold">{dict.services.english.title}</h3>

                  {/* 9:00 AM Slot */}
                  <div className="border-border/50 mb-6 border-b pb-6">
                    <p className="text-primary mb-1 text-3xl font-extrabold tracking-tight">
                      {dict.services.english.morning.time}
                    </p>
                    <p className="text-muted-foreground text-sm font-medium">{dict.services.english.morning.label}</p>
                    <p className="text-muted-foreground mt-1 text-xs">{dict.services.english.morning.desc}</p>
                  </div>

                  {/* 5:00 PM Slot */}
                  <div className="mb-2">
                    <p className="text-primary mb-1 text-2xl font-bold tracking-tight">
                      {dict.services.english.evening.time}
                    </p>
                    <p className="text-muted-foreground text-sm font-medium">{dict.services.english.evening.label}</p>
                    <p className="text-muted-foreground mt-1 text-xs">{dict.services.english.evening.desc}</p>
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
                  <h3 className="text-foreground mb-1 text-xl font-bold">{dict.services.chinese.title}</h3>
                  <p className="text-primary mb-3 text-3xl font-bold">{dict.services.chinese.time}</p>
                  <p className="text-muted-foreground mb-6 text-sm">{dict.services.chinese.desc}</p>
                </div>
                <div className="text-muted-foreground mt-auto flex items-center justify-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{dict.services.chinese.attendees}</span>
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
                  <h3 className="text-foreground mb-1 text-xl font-bold">{dict.services.youth.title}</h3>
                  <p className="text-primary mb-3 text-3xl font-bold">{dict.services.youth.time}</p>
                  <p className="text-muted-foreground mb-6 text-sm">{dict.services.youth.desc}</p>
                </div>
                <div className="text-muted-foreground mt-auto flex items-center justify-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{dict.services.youth.attendees}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* PRIORITY 2: Location & Logistics */}
        <section className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Address & Contact */}
          <div>
            <h2 className="text-foreground mb-6 text-3xl font-bold">{dict.findUs.title}</h2>

            <div className="bg-muted/30 border-border/50 mb-8 rounded-xl border p-6">
              <div className="mb-6 flex items-start gap-4">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-lg font-bold">{dict.findUs.churchName}</h3>
                  <a
                    href="https://goo.gl/maps/YOUR_LINK_HERE"
                    target="_blank"
                    className="text-muted-foreground hover:text-primary mb-4 block transition-colors"
                  >
                    {dict.findUs.address}
                  </a>
                  <a
                    href="https://goo.gl/maps/YOUR_LINK_HERE"
                    target="_blank"
                    className="text-primary inline-flex items-center text-sm font-semibold hover:underline"
                  >
                    {dict.findUs.openMaps} &rarr;
                  </a>
                </div>
              </div>

              <div className="border-border/10 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">{dict.findUs.phoneLabel}</p>
                    <p className="text-sm">(+60)3-7956 5986</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">{dict.findUs.emailLabel}</p>
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
                <h3 className="text-foreground mb-1 font-semibold">{dict.findUs.officeHours.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {dict.findUs.officeHours.weekdays}
                  <br />
                  {dict.findUs.officeHours.saturday}
                  <br />
                  <span className="text-primary font-medium">{dict.findUs.officeHours.sunday}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Getting Here Logistics */}
          <div className="flex flex-col justify-center">
            <div className="bg-card rounded-2xl border p-8 shadow-sm">
              <h3 className="text-foreground mb-6 text-2xl font-bold">{dict.transport.title}</h3>

              <div className="space-y-8">
                {/* Car */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Car className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">{dict.transport.car.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {dict.transport.car.desc}
                      <br />
                      <span className="text-xs italic">{dict.transport.car.tip}</span>
                    </p>
                  </div>
                </div>

                {/* Public Transport */}
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Bus className="text-primary h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold">{dict.transport.public.title}</h4>
                    <div className="mt-2 space-y-4">
                      {/* LRT */}
                      <div>
                        <p className="text-sm font-medium">{dict.transport.public.lrt.label}</p>
                        <p className="text-muted-foreground text-xs">{dict.transport.public.lrt.desc}</p>
                      </div>

                      {/* Bus Option 1 */}
                      <div>
                        <p className="text-sm font-medium">{dict.transport.public.bus1.label}</p>
                        <p className="text-muted-foreground mb-0.5 text-xs">{dict.transport.public.bus1.walk}</p>
                        <div className="bg-muted text-foreground border-border inline-block rounded border px-1.5 py-0.5 font-mono text-[10px]">
                          PJ01
                        </div>
                      </div>

                      {/* Bus Option 2 */}
                      <div>
                        <p className="text-sm font-medium">{dict.transport.public.bus2.label}</p>
                        <p className="text-muted-foreground mb-0.5 text-xs">{dict.transport.public.bus2.walk}</p>
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
                    <strong className="text-primary mb-1 block">{dict.transport.visitor.title}</strong>
                    {renderVisitorText(dict.transport.visitor.desc)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIORITY 3: Ministries */}
        <section className="border-border/40 mb-16 border-t pt-16">
          <div className="mb-10 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold">{dict.ministries.title}</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{dict.ministries.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[dict.ministries.items.kids, dict.ministries.items.adults, dict.ministries.items.outreach].map(
              (item, i) => (
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
              )
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center md:p-12">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{dict.cta.title}</h3>
            <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-lg">{dict.cta.desc}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSd7s_661yVduVKlqypiHtpYdHQnc6curIPWYfTB_C3HRprK6w/viewform"
                className="text-primary cursor-pointer rounded-lg bg-white px-8 py-3 font-bold shadow-lg transition-colors hover:bg-gray-100"
              >
                {dict.cta.planVisit}
              </Link>
              <Link
                href="mailto:admin@trinitypj.com"
                className="cursor-pointer rounded-lg border-2 border-white px-8 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                {dict.cta.emailUs}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
