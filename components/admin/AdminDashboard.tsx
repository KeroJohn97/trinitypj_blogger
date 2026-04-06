"use client"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { EDITOR_COMPONENTS } from "./EditorRegistry"

export default function AdminDashboard({ siteData }: { siteData: any }) {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "general"
  const { isDirty } = useNavigationGuard()

  const ActiveEditor = EDITOR_COMPONENTS[activeTab]

  const displayTitle = useMemo(() => activeTab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), [activeTab])

  return (
    <>
      {/* SHARED HEADER */}
      <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 bg-white/50 px-8 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase transition-colors ${
              isDirty ? "bg-amber-50 text-amber-600 shadow-sm" : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {isDirty && <AlertCircle size={12} />}
            {isDirty ? "Unsaved Changes" : "Data Synced"}
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-xl font-light">/</span>
            <h1 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{displayTitle}</h1>
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <section className="custom-scrollbar flex-1 overflow-y-auto bg-gray-50/30">
        <div className="mx-auto max-w-5xl p-8 lg:p-12">
          {ActiveEditor ? (
            <ActiveEditor data={siteData} />
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-20 text-center">
              <p className="text-gray-400">Editor for "{activeTab}" not found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
