import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import course from "@/../assets/course.png"
import smallGroup from "@/../assets/small-group.png"
import sundayServices from "@/../assets/sunday-services.jpg"

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
              <CardContent className="h-48 p-0">
                {event.image && (
                  <div className="from-primary/20 to-accent/10 relative h-48 overflow-hidden bg-linear-to-br">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <div className="p-16">
                  <h3 className="text-background mb-3 text-center text-xl font-bold transition-colors">
                    {event.title}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground text-background w-full cursor-pointer bg-transparent transition-colors"
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
