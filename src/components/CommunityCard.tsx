"use client"

import { CommunityEntity } from "@/lib/interface"
import { Calendar, MapPin, User, ArrowRight, Layers, Users } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CommunityCardProps {
  entity: CommunityEntity
  onClick?: () => void
  variant?: "detailed" | "compact"
  isActive?: boolean
}

export default function CommunityCard({ entity, onClick, variant = "detailed", isActive }: CommunityCardProps) {
  const isMinistry = entity.type === "ministry"
  const isFellowship = entity.type === "fellowship"
  const isSmallGroup = entity.type === "small_group"

  if (variant === "compact") {
    return (
      <motion.button
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4 text-left transition-all cursor-pointer ${
          isActive 
            ? "ring-2 ring-emerald-500 shadow-lg" 
            : "ring-1 ring-slate-100 shadow-sm hover:shadow-md"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            isActive ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"
          }`}>
            {isMinistry ? <Layers size={18} /> : <Users size={18} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="truncate text-sm font-bold text-slate-800">{entity.name}</h4>
            <p className="truncate text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {entity.meeting_time || entity.meeting_day || "Schedule TBD"}
            </p>
          </div>
        </div>
      </motion.button>
    )
  }

  return (
    <motion.div
      layout
      className={`group relative flex flex-col overflow-hidden rounded-[24px] bg-white transition-all md:flex-row ${
        isActive ? "ring-2 ring-emerald-500 shadow-xl" : "ring-1 ring-slate-100 shadow-sm"
      }`}
    >
      {/* Featured Image */}
      <div className="relative h-48 w-full shrink-0 md:h-auto md:w-48 lg:w-56">
        {entity.image ? (
            <Image
              src={entity.image}
              alt={entity.name}
              fill
              className="object-cover transition-transform duration-700"
            />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-200">
            {isMinistry ? <Layers size={48} /> : <Users size={48} />}
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${
            isMinistry ? "bg-emerald-600" : isFellowship ? "bg-blue-600" : "bg-amber-600"
          }`}>
            {entity.type.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">{entity.name}</h3>
            {onClick && (
              <button 
                onClick={onClick}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-emerald-600 hover:text-white"
              >
                <ArrowRight size={18} />
              </button>
            )}
          </div>
          
          {entity.tagline && (
            <p className="mt-1 text-sm font-bold text-emerald-600/80">{entity.tagline}</p>
          )}

          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {entity.description || "No description provided."}
          </p>

          {/* Metadata Grid */}
          <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 border-t border-slate-50 pt-6 sm:grid-cols-2">
            {(entity.meeting_day || entity.meeting_time) && (
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <Calendar size={16} className="text-emerald-500 shrink-0" />
                <span>{entity.meeting_day && `${entity.meeting_day}, `}{entity.meeting_time}</span>
              </div>
            )}
            {(entity.location_name || entity.location_area) && (
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <MapPin size={16} className="text-emerald-500 shrink-0" />
                <span className="truncate">{entity.location_name || entity.location_area}</span>
              </div>
            )}
            {entity.leader_name && (
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <User size={16} className="text-emerald-500 shrink-0" />
                <span>Leader: {entity.leader_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
