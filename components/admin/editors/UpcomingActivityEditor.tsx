"use client"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { UpcomingActivity } from "@/interface/upcoming-activity"
import { activityService } from "@/services/activity-service"
import ImagePicker from "components/ImagePicker"
import { Hash, Loader2, Plus, Save, Trash2, Type } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AdminHeader from "../AdminHeader"
import EmptyState from "../EmptyState"
import { useDialog } from "@/context/dialog-context"

export default function UpcomingActivityEditor() {
  const { confirm, alert } = useDialog()
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

  const handleDelete = async (id: number) => {
    // 1. If it's a new item (negative ID) not yet in DB, just filter it out locally
    if (id < 0) {
      setItems(items.filter((item) => item.id !== id))
      return
    }

    // 2. Otherwise, it's in the DB. Confirm with the user first.
    const isConfirmed = await confirm("Are you sure you want to delete this activity?", "Confirm Deletion", true)
    if (!isConfirmed) return

    try {
      setIsSaving(true) // Reuse the saving state for the loader

      // 3. Call the service
      await activityService.delete(id)
      

      // 4. Update local state so it disappears from the UI
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      setOriginalItems(updatedItems)

      console.log("Activity deleted successfully")
    } catch (error: any) {
      console.error("Deletion failed:", error)
      await alert(`Delete Error: ${error.message}`, "Error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = (id: number, updates: Partial<UpcomingActivity>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // 1. Map and sanitize the payload
      const sanitizedPayload = items.map((item, index) => {
        // Destructure to separate the joined data (media_assets) from the actual columns
        // We also pull out 'id' separately to handle the 'newItem' logic
        const { media_assets, id, ...cleanData } = item

        const sort_order = index

        if (id < 0) {
          // New Item: Remove the temporary negative ID
          return { ...cleanData, sort_order }
        }

        // Existing Item: Keep the ID but ensure media_assets is gone
        return { id, ...cleanData, sort_order }
      })

      const toUpdate = sanitizedPayload.filter((i: any) => i.id)
      const toInsert = sanitizedPayload.filter((i: any) => !i.id)

      // 2. Database operations with clean data
      if (toInsert.length > 0) await activityService.create(toInsert as any)
      if (toUpdate.length > 0) await activityService.updateOrder(toUpdate as any)

      // 3. Refresh and Sync
      const freshData = await activityService.getAll()
      setItems(freshData)
      setOriginalItems(freshData)

      await alert("Activities published successfully!", "Success")
    } catch (error: any) {
      console.error("Publishing failed:", error)
      // Providing more context for the alert
      await alert(`Database Error: ${error.message || "Failed to sync with schema cache"}`, "Error")
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
        {/* STICKY HEADER WRAPPER */}
        <AdminHeader
          title="Upcoming Activities"
          subtitle="Manage your promotional carousel."
          primaryAction={{
            label: "Publish Changes",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !isDirty,
            // We keep your "Elite" dynamic color logic here
            className: isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
          }}
          secondaryAction={{
            label: "Add Notice",
            onClick: handleAdd,
            icon: <Plus size={18} />,
          }}
        />

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
                      onClick={() => handleDelete(item.id)}
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
