import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

import logo from "@/../assets/logo.jpg"
import sundayServices from "@/../assets/sunday-services.jpg"
import course from "@/../assets/course.png"
import smallGroup from "@/../assets/small-group.png"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  attendees?: number
  image?: string
  backgroundImage?: string
}

const ongoingEvents: Event[] = [
  {
    id: "1",
    title: "Sunday Services",
    date: "Dec 5-7, 2025",
    time: "9:00 AM - 12:00 PM",
    location: "Trinity Methodist Church PJ Church Hall",
    description: "A fun-filled program for children to learn about God through games, crafts, and stories.",
    category: "Children",
    attendees: 45,
    backgroundImage: sundayServices.src,
  },
  {
    id: "2",
    title: "Join A Course",
    date: "Dec 5-7, 2025",
    time: "7:30 PM - 9:30 PM",
    location: "Main Sanctuary",
    description: "An evening of powerful worship and praise with contemporary music and testimonies.",
    category: "Worship",
    attendees: 120,
    backgroundImage: course.src,
  },
  {
    id: "3",
    title: "Join A Small Group",
    date: "Dec 6, 2025",
    time: "8:00 PM - 9:00 PM",
    location: "Prayer Room",
    description: "Join us for a dedicated time of prayer for our church, community, and nation.",
    category: "Prayer",
    attendees: 30,
    backgroundImage: smallGroup.src,
  },
  {
    id: "4",
    title: "Communion Sunday",
    date: "Dec 7, 2025",
    time: "9:00 AM & 11:00 AM",
    location: "Main Sanctuary",
    description: "A sacred time of remembrance and fellowship through Holy Communion.",
    category: "Worship",
    attendees: 200,
  },
]

export function OngoingEvents() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Ongoing Events</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Join us for these special gatherings and grow in fellowship with our community
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ongoingEvents.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
              backgroundImage={event.backgroundImage}
            >
              <CardContent className="p-0">
                {event.image && (
                  <div className="from-primary/20 to-accent/10 relative h-48 overflow-hidden bg-gradient-to-br">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
                      {event.category}
                    </span>
                    {event.attendees && (
                      <div className="text-background flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-background group-hover:text-primary mb-3 text-xl font-bold transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-background mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="mb-4 space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Calendar className="text-primary h-4 w-4" />
                      <span className="text-background">{event.date}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Clock className="text-primary h-4 w-4" />
                      <span className="text-background">{event.time}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="text-primary h-4 w-4" />
                      <span className="text-background">{event.location}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground text-background w-full bg-transparent transition-colors"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}
