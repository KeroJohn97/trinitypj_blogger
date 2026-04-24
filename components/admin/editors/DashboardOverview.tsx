"use client"

import { Megaphone, Newspaper, Calendar, Users, ArrowRight, Plus, Activity, Clock, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { LandingNoticeService } from "@/services/landing-notice-service"
import { WhatsNewService } from "@/services/whats-new-service"
import { activityService } from "@/services/activity-service"
import { groupService } from "@/services/group-service"

export default function DashboardOverview() {
  const router = useRouter()
  const [counts, setCounts] = useState({
    notices: 0,
    whatsNew: 0,
    activities: 0,
    groups: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [notices, whatsNew, activities, groups] = await Promise.all([
          LandingNoticeService.getAll(),
          WhatsNewService.getAll(false),
          activityService.getAll(),
          groupService.getAll(false)
        ])
        setCounts({
          notices: notices.length,
          whatsNew: whatsNew.length,
          activities: activities.length,
          groups: groups.length
        })
      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCounts()
  }, [])

  const stats = [
    { label: "Active Notices", count: counts.notices, icon: Megaphone, color: "text-amber-600", bg: "bg-amber-50", slug: "landing-notices" },
    { label: "News Updates", count: counts.whatsNew, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50", slug: "whats-new" },
    { label: "Upcoming Activities", count: counts.activities, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50", slug: "activities" },
    { label: "Fellowship Groups", count: counts.groups, icon: Users, color: "text-purple-600", bg: "bg-purple-50", slug: "church-groups" },
  ]

  const recentActivity = [
    { type: "Update", title: "MW Connect May-Sep Issue published", time: "2 hours ago", icon: Newspaper, color: "text-blue-500" },
    { type: "Notice", title: "Sunday School registration alert active", time: "5 hours ago", icon: Megaphone, color: "text-amber-500" },
    { type: "Activity", title: "Youth Camp 2024 dates added", time: "Yesterday", icon: Calendar, color: "text-emerald-500" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl space-y-8 pb-12"
    >
      {/* Welcome Hero - Adaptive for Mobile */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white md:rounded-[48px] md:p-16">
        <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-400 uppercase">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live Portal Status
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl lg:text-6xl">
              Welcome back, <br className="md:hidden" />
              <span className="text-emerald-400">Admin</span>
            </h1>
            <p className="max-w-md text-sm font-medium leading-relaxed text-slate-400 md:text-base">
              Everything looks good today. You have <span className="text-white underline decoration-emerald-500 underline-offset-4">{counts.notices} active notices</span> that need your attention.
            </p>
          </div>

          <button
            onClick={() => router.push("?tab=landing-notices")}
            className="group cursor-pointer flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-emerald-400 hover:text-white active:scale-95"
          >
            Manage Notices
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-blue-500/10 blur-[80px]" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Stats & Quick Actions */}
        <div className="space-y-8 lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6">
            {stats.map((stat, i) => (
              <motion.button
                variants={item}
                key={i}
                onClick={() => router.push(`?tab=${stat.slug}`)}
                className="group cursor-pointer flex flex-col items-start gap-4 rounded-[28px] border border-slate-100 bg-white p-6 text-left transition-all hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 md:p-8"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin text-slate-200" />
                    ) : (
                      <p className="text-2xl font-black text-slate-900 md:text-3xl">{stat.count}</p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Secondary Actions */}
          <div className="rounded-[32px] bg-slate-50/50 p-8 ring-1 ring-slate-100">
            <h3 className="mb-6 text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">Command Center</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button 
                onClick={() => router.push("?tab=whats-new")}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600 group-hover:bg-white/20 group-hover:text-white">
                    <Plus size={20} />
                  </div>
                  <span className="text-sm font-bold">New Post Update</span>
                </div>
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => router.push("?tab=activities")}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition-all hover:bg-slate-900 hover:text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600 group-hover:bg-white/20 group-hover:text-white">
                    <Calendar size={20} />
                  </div>
                  <span className="text-sm font-bold">Add Activity</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="lg:col-span-4">
          <motion.div 
            variants={item}
            className="h-full rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">Recent Activity</h3>
              <Clock size={16} className="text-slate-300" />
            </div>

            <div className="space-y-8">
              {recentActivity.map((activity, i) => (
                <div key={i} className="group relative flex gap-4">
                  {i !== recentActivity.length - 1 && (
                    <div className="absolute left-5 top-10 h-10 w-px bg-slate-100" />
                  )}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-900 group-hover:text-white ${activity.color}`}>
                    <activity.icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase">{activity.type}</p>
                    <p className="text-sm font-bold leading-snug text-slate-900">{activity.title}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 w-full cursor-pointer rounded-2xl border border-slate-100 py-4 text-xs font-bold text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-900">
              View Full History
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}