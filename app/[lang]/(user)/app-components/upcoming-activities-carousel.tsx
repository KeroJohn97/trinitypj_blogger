"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { UpcomingActivity } from "@/interface/upcoming-activity"
import { cn } from "@/lib/utils"
import { activityService } from "@/services/activity-service"
import { CalendarDays } from "lucide-react"
import Image from "next/image"
import * as React from "react"

interface ActivityCarouselProps {
  dict: {
    upcomingActivities: string
  }
}
export default function UpcomingActivitiesCarousel({ dict }: ActivityCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const [activities, setActivities] = React.useState<UpcomingActivity[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true)
        const data = await activityService.getAll()
        setActivities(data.filter((item) => item.is_active))
      } catch (error) {
        console.error("Carousel load failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchActivities()
  }, [])

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api, activities])

  const getSupabaseUrl = (path?: string) => {
    if (!path) return null
    return `${process.env.NEXT_publishC_SUPABASE_URL}/storage/v1/object/public/${path}`
  }

  if (isLoading) return <CarouselSkeleton />
  if (activities.length === 0) return null

  return (
    /* REMOVED: bg-muted */
    <section className="animate-in fade-in mx-auto w-full max-w-6xl px-4 py-12 duration-1000 md:py-12">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-emerald-800 lg:text-4xl">{dict.upcomingActivities}</h2>
      </div>

      <div className="group relative">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {activities.map((activity, index) => {
              const imageUrl = getSupabaseUrl(activity.media_assets?.storage_path)

              return (
                <CarouselItem key={activity.id}>
                  {/* Container is already bg-transparent. 
                  The object-contain ensures the full notice is visible.
                */}
                  <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden bg-transparent sm:h-[500px] lg:h-[550px]">
                    {imageUrl ? (
                      <div className="relative h-full w-full p-6 md:p-10">
                        <Image
                          src={imageUrl}
                          alt={activity.alt_text}
                          fill
                          className="object-contain transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
                          priority={index === 0}
                          sizes="(max-width: 1280px) 100vw, 1280px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <CalendarDays className="text-slate-200" size={64} />
                      </div>
                    )}
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Nav Controls */}
          <div className="flex">
            {" "}
            {/* Removed 'hidden' and 'opacity-0' for debugging */}
            <CarouselPrevious
              iconClassName="text-black"
              className={cn(
                "absolute -translate-y-1/2", // Reset default shadcn styles
                "left-4 z-50 h-12 w-12", // Force it INSIDE the container
                "border-none bg-white text-white shadow-xl",
                "transition-all hover:bg-emerald-600"
              )}
            />
            <CarouselNext
              iconClassName="text-black"
              className={cn(
                "absolute -translate-y-1/2",
                "right-4 z-50 h-12 w-12", // Force it INSIDE the container
                "border-none bg-white text-white shadow-xl",
                "transition-all hover:bg-emerald-600"
              )}
            />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

function CarouselSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
      <div className="mx-auto mb-10 h-12 w-80 animate-pulse rounded-3xl bg-slate-50" />
      <div className="h-[400px] w-full animate-pulse rounded-[40px] bg-slate-50 sm:h-[500px] lg:h-[550px]" />
    </div>
  )
}
