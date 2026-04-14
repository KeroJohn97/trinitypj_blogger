"use client"

import { MediaDialog, MediaDialogContent } from "@/components/ui/media-dialog"
import { ChevronLeft, ChevronRight, ExternalLink, Globe, MapPin } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { MediaItem } from "./staggered-media-gallery"
import { cn } from "@/lib/utils"

interface MediaModalProps {
  item: MediaItem
  isOpen: boolean
  onClose: () => void
}

export function MediaModal({ item, isOpen, onClose }: MediaModalProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const isPoster = item.category === "advertising"

  const allSources = useMemo(() => {
    const sources: string[] = []
    if (item.src) sources.push(item.src)
    if (item.gallerySrcs && item.gallerySrcs.length > 0) {
      sources.push(...item.gallerySrcs)
    }
    return sources
  }, [item])

  const hasMultiple = allSources.length > 1

  useEffect(() => {
    setActiveIndex(0)
  }, [item])

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev + 1) % allSources.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev - 1 + allSources.length) % allSources.length)
  }

  if (!isOpen || !item) return null

  return (
    <MediaDialog open={isOpen} onOpenChange={onClose}>
      <MediaDialogContent className="border-none shadow-none">
        <div 
          className={cn(
            "relative flex flex-col lg:flex-row overflow-hidden w-[95vw] sm:w-[90vw] transition-all duration-500",
            isPoster 
              ? "max-w-5xl rounded-3xl bg-white shadow-2xl shadow-black/20" 
              : "max-w-[1200px] rounded-2xl bg-black"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* MEDIA PANEL */}
          <div className={cn(
            "relative flex items-center justify-center overflow-hidden",
            isPoster ? "lg:w-[65%] bg-slate-50 min-h-[40vh] lg:min-h-[70vh]" : "w-full min-h-[50vh] lg:min-h-[85vh]"
          )}>
            {item.type === "image" && allSources.length > 0 && (
              <div className="relative h-full w-full">
                <Image
                  src={allSources[activeIndex]!}
                  alt={item.title || `Gallery image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/f8fafc/cbd5e1?text=Image+Unavailable";
                  }}
                />
                
                {hasMultiple && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-4 text-white transition-all hover:bg-black/60 backdrop-blur-md"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-4 text-white transition-all hover:bg-black/60 backdrop-blur-md"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
                      {allSources.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === activeIndex ? "w-8 bg-emerald-500" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {item.type === "video" && item.youtubeId && (
              <div className="relative aspect-video w-full bg-black shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                  title={item.title || "YouTube video"}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            )}
          </div>

          {/* REGISTRATION PANEL (Poster Specific) */}
          {isPoster && (
            <div className="lg:w-[35%] flex flex-col p-10 bg-white overflow-y-auto max-h-[50vh] lg:max-h-[70vh]">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Join The Journey</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-3">{item.title || "Alpha Course"}</h2>
                <p className="text-[13px] font-medium text-slate-500 leading-relaxed">{item.description || "Explore life, faith, and meaning in a friendly environment."}</p>
              </div>

              <div className="space-y-6 mt-auto">
                {/* Physical Section */}
                {(item.registrationQrSrcPhysical || item.reg_url_physical) && (
                  <div className="flex flex-col space-y-4 p-5 rounded-3xl bg-slate-50 hover:bg-emerald-50/50 transition-colors ring-1 ring-slate-100 hover:ring-emerald-100 group/reg">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2.5 rounded-xl text-emerald-600 shadow-sm ring-1 ring-slate-100">
                        <MapPin size={18} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-900">Physical Session</span>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      {item.registrationQrSrcPhysical && (
                        <a 
                          href={item.reg_url_physical} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-24 w-24 shrink-0 bg-white p-2 rounded-2xl shadow-sm hover:scale-105 transition-transform ring-1 ring-slate-100 flex items-center justify-center overflow-hidden"
                        >
                          <img 
                            src={item.registrationQrSrcPhysical} 
                            alt="QR Physical" 
                            className="w-full h-full object-contain" 
                          />
                        </a>
                      )}
                      <div className="flex flex-col space-y-3">
                        <p className="text-[11px] font-bold text-slate-400 leading-tight">Click the QR or link to register for the in-person event.</p>
                        {item.reg_url_physical && (
                          <a 
                            href={item.reg_url_physical}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-xs font-black text-emerald-600 hover:text-emerald-700 decoration-2 underline-offset-4 hover:underline"
                          >
                            <span>Registration Hub</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Online Section */}
                {(item.registrationQrSrcOnline || item.reg_url_online) && (
                  <div className="flex flex-col space-y-4 p-5 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors ring-1 ring-slate-100 group/reg">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2.5 rounded-xl text-slate-600 shadow-sm ring-1 ring-slate-100">
                        <Globe size={18} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-900">Online Session</span>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      {item.registrationQrSrcOnline && (
                        <a 
                          href={item.reg_url_online} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-24 w-24 shrink-0 bg-white p-2 rounded-2xl shadow-sm hover:scale-105 transition-transform ring-1 ring-slate-100 flex items-center justify-center overflow-hidden"
                        >
                          <img 
                            src={item.registrationQrSrcOnline} 
                            alt="QR Online" 
                            className="w-full h-full object-contain" 
                          />
                        </a>
                      )}
                      <div className="flex flex-col space-y-3">
                        <p className="text-[11px] font-bold text-slate-400 leading-tight">Click the QR or link below to join the online Zoom course.</p>
                        {item.reg_url_online && (
                          <a 
                            href={item.reg_url_online}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-xs font-black text-slate-700 hover:text-slate-900 decoration-2 underline-offset-4 hover:underline"
                          >
                            <span>Join Online</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </MediaDialogContent>
    </MediaDialog>
  )
}
