"use client"

import { LandingNotice } from "@/services/landing-notice-service"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

interface LandingNoticesSectionProps {
  notices: LandingNotice[]
}

export function LandingNoticesSection({ notices }: LandingNoticesSectionProps) {
  if (notices.length === 0) return null

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-16">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex flex-col items-center gap-12 lg:flex-row ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Media Container */}
              <div className="relative w-full overflow-hidden rounded-[32px] shadow-2xl lg:w-1/2">
                <div className="group relative aspect-video cursor-pointer">
                  {notice.media_assets?.storage_path ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${notice.media_assets.storage_path}`}
                      alt={notice.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                       <Play className="h-12 w-12 text-slate-300" />
                    </div>
                  )}

                  {/* Video Play Indicator */}
                  {notice.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-md">
                        <Play className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full space-y-8 lg:w-1/2">
                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                    Spotlight
                  </span>
                  <h2 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
                    {notice.title}
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-slate-500">
                    {notice.description}
                  </p>
                </div>

                {notice.link_url && (
                  <Link
                    href={notice.link_url}
                    className="inline-flex items-center gap-4 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-emerald-700 hover:shadow-2xl active:scale-95"
                  >
                    {notice.link_label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
