"use client"

import { WhatsNewItem, WhatsNewService } from "@/services/whats-new-service"
import { ArrowRight, ExternalLink, Newspaper, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function WhatsNewSection() {
  const [items, setItems] = useState<WhatsNewItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<WhatsNewItem | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await WhatsNewService.getAll(true)
        setItems(data)
      } catch (error) {
        console.error("Failed to fetch What's New items:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()
  }, [])

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };

  if (isLoading || items.length === 0) return null

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="h-px w-8 bg-emerald-600" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Latest Updates</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              What's <span className="text-emerald-600">New</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-500 font-medium leading-relaxed">
            Stay up to date with the latest news, events, and initiatives at Trinity Methodist Church PJ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const youtubeId = item.video_url ? getYoutubeId(item.video_url) : null;

            return (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div 
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-[40px] bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl hover:shadow-emerald-500/5 active:scale-[0.99]"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Media Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {youtubeId ? (
                        <div className="relative h-full w-full pointer-events-none">
                          <Image
                            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-emerald-600 shadow-lg backdrop-blur-sm">
                              <Play className="ml-1 h-6 w-6 fill-emerald-600" />
                            </div>
                          </div>
                        </div>
                      ) : item.media_assets?.storage_path ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.media_assets.storage_path}`}
                          alt={item.title}
                          fill
                          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-200">
                          <Newspaper size={64} strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-1 flex-col p-8 md:p-10">
                      <h3 className="mb-4 text-xl font-bold tracking-tight text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600">
                        {item.title}
                      </h3>
                      <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        View Details
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="flex max-h-[95vh] w-[95vw] flex-col overflow-hidden rounded-[32px] border-none bg-white p-0 shadow-2xl sm:max-w-xl md:rounded-[40px]">
                  {/* Content Area - All Scrollable */}
                  <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12">
                    {/* Header Section */}
                    <DialogHeader className="mb-6 flex flex-col items-center text-center">
                      <div className="mb-3 flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600">
                        <Newspaper size={12} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Latest Announcement</span>
                      </div>
                      <DialogTitle className="text-xl font-bold leading-tight text-slate-900 md:text-2xl">
                        {item.title}
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Full announcement for {item.title}
                      </DialogDescription>
                    </DialogHeader>

                    {/* Constrained Media Area */}
                    <div className="mx-auto mb-8 w-full max-w-lg overflow-hidden rounded-2xl bg-slate-50 shadow-sm ring-1 ring-slate-100">
                      <div className="relative aspect-video w-full">
                        {youtubeId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0`}
                            className="h-full w-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : item.media_assets?.storage_path ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.media_assets.storage_path}`}
                            alt={item.title}
                            fill
                            className="object-contain p-4"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-200">
                            <Newspaper size={48} strokeWidth={1} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="prose prose-slate mx-auto max-w-none text-center md:max-w-prose">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 md:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-10 md:flex-row">
                      {item.link_url && (
                        <Button asChild size="lg" className="h-12 w-full rounded-2xl bg-emerald-600 px-8 font-bold shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-700 active:scale-95 sm:w-auto">
                          <Link href={item.link_url} target="_blank">
                            {item.link_label || "Explore More"}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  )
}



