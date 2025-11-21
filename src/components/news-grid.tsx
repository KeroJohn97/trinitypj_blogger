"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface NewsItem {
  id: number
  title: string
  summary?: string
  category?: string
  date: string
  image?: string
  imageQuery?: string
  details?: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "CS Christmas Party",
    summary: "Join us for our annual Christmas celebration with food, fun, and fellowship.",
    category: "Event",
    date: "Nov 30, 2025",
    image: "https://trinitypj.com/wp-content/uploads/BG-Anniversary-2048x1152.jpg",
    imageQuery: "community outreach volunteers serving food",
    details:
      "Our Summer Outreach Program is back for another year! This comprehensive initiative will run from June through August, offering hot meals, clothing donations, and spiritual support to our local community. We're looking for volunteers to help with meal preparation, distribution, and fellowship activities. Every Saturday from 10 AM to 2 PM at the community center. All skill levels welcome - whether you can cook, organize, or simply share a smile, there's a place for you in this ministry.",
  },
  {
    id: 2,
    title: "9 Lessons & Carols @ 5pm Service",
    summary: "Experience our new worship series focusing on hope and renewal, starting this Sunday morning.",
    category: "Event",
    date: "Nov 30, 2025",
    image: "https://trinitypj.com/wp-content/uploads/BG-Anniversary-2048x1152.jpg",
    imageQuery: "church worship with raised hands and lights",
    details:
      "Join us for our new 8-week worship series 'Hope Rising.' Each Sunday, we'll explore different aspects of hope through scripture, contemporary worship music, and testimonies from our community. Services at 9 AM and 11 AM. Childcare provided for all ages.",
  },
  {
    id: 3,
    title: "November Birthday Celebration",
    summary: "Join us as we celebrate all November birthdays with a special service and fellowship time.",
    category: "Announcement",
    date: "Nov 30, 2025",
    image: "https://bearcreek.camp/wp-content/uploads/2025/01/IMG_4657-1312x875.jpg",
    imageQuery: "youth group teenagers having fun together",
  },
  {
    id: 4,
    title: "MW Handicraft Sale",
    summary: "Join us for our annual handicraft sale featuring handmade items from local artisans.",
    category: "Event",
    date: "Nov 30, 2025",
    image: "https://bearcreek.camp/wp-content/uploads/2025/01/IMG_4657-1312x875.jpg",
    imageQuery: "mission trip volunteers building construction",
    details:
      "We're partnering with local organizations in Guatemala to build a new school and provide medical care to underserved communities. Trip dates: October 15-22, 2025. Cost: $1,800 per person (fundraising support available). Requirements: 18+ years old, valid passport, attend all pre-trip training sessions. Limited to 20 participants. Application deadline: July 31st.",
  },
  {
    id: 5,
    title: "BB Christmas Celebration - Outdoor Movie Night",
    summary: "Bring the whole family for movie night under the stars with popcorn, games, and great fellowship.",
    category: "Event",
    date: "Nov 29, 2025",
    image: "https://bearcreek.camp/wp-content/uploads/2025/01/IMG_4657-1312x875.jpg",
    imageQuery: "outdoor movie night families enjoying together",
  },
  {
    id: 6,
    title: "GB 65th Anniversary Celebration",
    summary: "Celebrate 65 years of God's faithfulness with us! Join us for a special service and dinner.",
    category: "Announcement",
    date: "Nov 29, 2025",
    image: "https://bearcreek.camp/wp-content/uploads/2025/01/IMG_4657-1312x875.jpg",
    imageQuery: "small group bible study people discussing",
  },
  {
    id: 7,
    title: "GB Awards Day 2025",
    date: "Nov 29, 2025",
    category: "Announcement",
    image: "https://bearcreek.camp/wp-content/uploads/2025/01/IMG_4657-1312x875.jpg",
    imageQuery: "modern church building renovation interior",
  },
  {
    id: 8,
    title: "TRAC 50th Session - Klang Valley",
    summary: "Celebrate 50 years of TRAC with special sessions, worship, and guest speakers. All are welcome!",
    date: "Nov 21, 2025 - Nov 23, 2025",
    details:
      "Wednesday prayer meetings are a sacred time for our community to gather and lift up our needs, praises, and concerns. We meet every Wednesday at 7 PM in the chapel. The format includes 30 minutes of worship followed by guided prayer time. Feel free to submit prayer requests in advance via our website or share them in person.",
  },
  {
    id: 9,
    title: "TRAC 50th Gala Dinner",
    date: "Nov 22, 2025",
    category: "Event",
  },
  {
    id: 10,
    title: "BB Awards Day 2025",
    date: "Nov 22, 2025",
  },
  {
    id: 11,
    title: "CS Sunday & Awards Day",
    summary: "Thanks to your generous donations, we collected over 500 pounds of food for local families in need.",
    date: "Nov 16, 2025",
  },
  {
    id: 12,
    title: "MW Exco / Big Meet",
    date: "Nov 15, 2025",
    category: "Announcement",
  },
]

const categoryColors: Record<string, string> = {
  Event: "bg-accent text-accent-foreground",
  Announcement: "bg-primary text-primary-foreground",
}

export default function NewsGrid() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  return (
    <>
      <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
        {newsItems.map((item) => (
          <Card
            key={item.id}
            className="group border-border mb-6 break-inside-avoid overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {item.image && (
              <div className="bg-muted relative h-48 overflow-hidden">
                <Image
                  src={`${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="mb-2 flex flex-wrap items-start gap-2">
                {item.category && <Badge className={`${categoryColors[item.category]} text-xs`}>{item.category}</Badge>}
                <div className="text-muted-foreground ml-auto flex items-center text-xs">
                  <Calendar className="mr-1 h-3 w-3 shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>
              <h3 className="text-foreground group-hover:text-primary text-xl leading-snug font-semibold text-balance transition-colors">
                {item.title}
              </h3>
            </CardHeader>

            {item.summary && (
              <CardContent className="pt-0 pb-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
              </CardContent>
            )}

            {item.details && (
              <CardContent className="pt-0 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedNews(item)}
                  className="hover:bg-primary hover:text-primary-foreground w-full cursor-pointer transition-colors"
                >
                  Read More
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-background max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedNews.image && (
              <div className="relative h-64 overflow-hidden">
                <Image src={`${selectedNews.image}`} alt={selectedNews.title} fill className="object-cover" />
              </div>
            )}

            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {selectedNews.category && (
                  <Badge className={`${categoryColors[selectedNews.category]}`}>{selectedNews.category}</Badge>
                )}
                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{selectedNews.date}</span>
                </div>
              </div>

              <h2 className="text-foreground mb-4 text-3xl font-bold text-balance">{selectedNews.title}</h2>

              {selectedNews.summary && (
                <p className="text-muted-foreground mb-4 text-base leading-relaxed">{selectedNews.summary}</p>
              )}

              <p className="text-foreground text-base leading-relaxed whitespace-pre-line">{selectedNews.details}</p>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedNews(null)} variant="default" className="cursor-pointer">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
