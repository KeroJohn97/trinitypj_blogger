import course from "@/../assets/course.png"
import prayer from "@/../assets/prayer.jpg"
import smallGroup from "@/../assets/small-group.png"
import sundayServices from "@/../assets/sunday-services.jpg"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  category: string
  backgroundImage: string
  href: string
  // Kept these in interface if you need them later, but made optional for display logic
  date?: string
  time?: string
  location?: string
  attendees?: number
}

const ongoingEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Services",
    description: "Join us for worship, teaching, and community every Sunday morning.",
    category: "Worship",
    backgroundImage: sundayServices.src,
    href: "/location-services",
  },
  {
    id: "2",
    title: "Alpha Course",
    description: "Explore the basics of the Christian faith in an open, friendly environment.",
    category: "Education",
    backgroundImage: course.src,
    href: "/alpha-course",
  },
  {
    id: "3",
    title: "Small Groups",
    description: "Connect with others, study the Bible, and do life together in a smaller setting.",
    category: "Community",
    backgroundImage: smallGroup.src,
    href: "/small-groups",
  },
  {
    id: "4",
    title: "Prayer Meetings",
    description: "Join us as we intercede for our church, community, and nation.",
    category: "Prayer",
    backgroundImage: prayer.src,
    href: "/prayer",
  },
]

export function OngoingEvents() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Get Involved</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            There is a place for everyone to connect, grow, and serve
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ongoingEvents.map((event) => (
            <Link
              key={event.id}
              href={event.href}
              className="group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* 1. Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${event.backgroundImage})` }}
              />

              {/* 2. Dark Overlay (Gradient) */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />

              {/* 3. Content */}
              <div className="relative z-10 p-8">
                {/* Category Label */}
                <span className="bg-primary/90 mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {event.category}
                </span>

                <h3 className="mb-2 text-2xl font-bold text-white">{event.title}</h3>

                <p className="mb-6 line-clamp-2 max-w-lg text-sm text-gray-200">{event.description}</p>

                {/* Button Mockup */}
                <div className="group-hover:text-primary flex items-center text-sm font-bold text-white transition-colors">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
