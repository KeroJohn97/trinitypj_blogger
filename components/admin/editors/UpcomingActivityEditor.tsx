"use client"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { UpcomingActivity } from "@/interface/upcoming-activity"
import { activityService } from "@/services/activity-service"
import ImagePicker from "components/ImagePicker"
import { AlertCircle, Hash, Loader2, Plus, Save, Trash2, Type } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import EmptyState from "../EmptyState"

export default function UpcomingActivityEditor() {
  const [items, setItems] = useState<UpcomingActivity[]>([])
  const [originalItems, setOriginalItems] = useState<UpcomingActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { setIsDirty } = useNavigationGuard()

  const isDirty = useMemo(() => JSON.stringify(items) !== JSON.stringify(originalItems), [items, originalItems])

  useEffect(() => {
    setIsDirty(isDirty)

    // Optional: Reset it when the component unmounts
    return () => setIsDirty(false)
  }, [isDirty, setIsDirty])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await activityService.getAll()
        setItems(data)
        setOriginalItems(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAdd = () => {
    const tempId = -Math.floor(Math.random() * 1000000)
    const newEntry: UpcomingActivity = {
      id: tempId,
      image_id: "",
      alt_text: "",
      sort_order: items.length,
      is_active: true,
    }
    setItems([...items, newEntry])
  }

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleUpdate = (id: number, updates: Partial<UpcomingActivity>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      const payload = items.map((item, index) => {
        if (item.id < 0) {
          const { id, ...newItem } = item
          return { ...newItem, sort_order: index }
        }
        return { ...item, sort_order: index }
      })

      const toUpdate = payload.filter((i: any) => i.id)
      const toInsert = payload.filter((i: any) => !i.id)

      if (toInsert.length > 0) await activityService.create(toInsert as any)
      if (toUpdate.length > 0) await activityService.updateOrder(toUpdate as any)

      const freshData = await activityService.getAll()

      // CRITICAL: Reset the dirty state after success
      setItems(freshData)
      setOriginalItems(freshData)

      alert("Activities published successfully!")
    } catch (error: any) {
      console.error("Publishing failed:", error)
      alert(`Database Error: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-200" size={32} />
      </div>
    )
  }

  return (
    <NavigationGuardProvider>
      <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 px-4 py-6 duration-700 md:space-y-12 md:px-6 md:py-10">
        {/* RESPONSIVE HEADER */}
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Upcoming Activities</h2>
              {isDirty && (
                <span className="flex animate-pulse items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[9px] font-black tracking-widest text-amber-600 uppercase ring-1 ring-amber-200 md:text-[10px]">
                  <AlertCircle size={12} /> Unsaved
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-500 md:text-base">Manage your promotional carousel.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-[18px] bg-white px-5 py-3.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-50 active:scale-95 sm:flex-none md:py-4"
            >
              <Plus size={18} className="text-emerald-500" />
              Add Notice
            </button>

            <button
              onClick={handlePublish}
              disabled={isSaving || !isDirty}
              className={`flex flex-1 items-center justify-center gap-3 rounded-[18px] px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-30 sm:flex-none md:py-4 ${
                isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900"
              }`}
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? "Saving..." : "Publish Changes"}
            </button>
          </div>
        </div>

        {/* RESPONSIVE GRID */}
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-2.5 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl md:rounded-[32px] md:p-3"
              >
                <div className="relative">
                  <ImagePicker
                    label={`Activity Slot #${index + 1}`}
                    value={item.image_id}
                    onChange={(assetId) => handleUpdate(item.id, { image_id: assetId })}
                    bucket="brand-assets"
                  />
                </div>

                <div className="space-y-4 p-4 md:p-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                      <Type size={12} className="text-emerald-500" /> SEO Alt Text
                    </div>
                    <input
                      value={item.alt_text}
                      onChange={(e) => handleUpdate(item.id, { alt_text: e.target.value })}
                      placeholder="Describe this activity..."
                      className="w-full rounded-xl bg-slate-50/50 px-4 py-3.5 text-xs font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 md:rounded-2xl md:py-4"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-4 md:pt-5">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-400">
                      <Hash size={10} /> POS: {index + 1}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition-all hover:bg-red-50 hover:text-red-500 md:h-11 md:w-11 md:rounded-2xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavigationGuardProvider>
  )
}
