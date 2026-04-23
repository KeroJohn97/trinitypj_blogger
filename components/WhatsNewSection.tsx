"use client"

import { WhatsNewItem, WhatsNewService } from "@/services/whats-new-service"
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function WhatsNewSection() {
  const [items, setItems] = useState<WhatsNewItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
              <div 
                key={item.id} 
                className="group flex flex-col overflow-hidden rounded-[40px] bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      className="h-full w-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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
                  <h3 className="mb-4 text-xl font-bold tracking-tight text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {item.link_url && (
                    <Link
                      href={item.link_url}
                      target="_blank"
                      className="flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-95 shadow-xl shadow-slate-200"
                    >
                      {item.link_label || "Read More"}
                      {item.link_url.startsWith("http") ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}



