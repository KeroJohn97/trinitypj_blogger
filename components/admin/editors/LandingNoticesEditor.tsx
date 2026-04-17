"use client"

import { LandingNotice, LandingNoticeService } from "@/services/landing-notice-service"
import ImagePicker from "components/ImagePicker"
import { AlertCircle, Calendar, Link as LinkIcon, Plus, Save, Trash2, Video } from "lucide-react"
import { useEffect, useState } from "react"
import EmptyState from "../EmptyState"
import AdminHeader from "../AdminHeader"
import { useDialog } from "@/context/dialog-context"

export default function LandingNoticesEditor() {
  const [notices, setNotices] = useState<LandingNotice[]>([])
  const [originalNotices, setOriginalNotices] = useState<LandingNotice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  const { confirm, alert } = useDialog()

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const data = await LandingNoticeService.getAll(false)
      setNotices(data)
      setOriginalNotices(JSON.parse(JSON.stringify(data)) as LandingNotice[])
    } catch (error) {
      console.error("Failed to fetch notices:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addNotice = () => {
    const newNotice: LandingNotice = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      sort_order: notices.length,
      is_active: true,
      link_label: "Learn More",
    }
    setNotices([...notices, newNotice])
  }

  const updateNotice = (id: string, updates: Partial<LandingNotice>) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)))
  }

  const deleteNotice = async (id: string) => {
    const isConfirmed = await confirm("Delete this spotlight notice?", "Confirm Deletion", true)
    if (!isConfirmed) return

    if (!id.startsWith("temp-") && originalNotices.some((on) => on.id === id)) {
      setDeletedIds((prev) => [...prev, id])
    }
    setNotices((prev) => prev.filter((n) => n.id !== id))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => LandingNoticeService.delete(id)))
      }

      const sanitized = notices.map((n, idx) => ({
        ...n,
        sort_order: idx,
      }))

      await LandingNoticeService.publish(sanitized)
      alert("Spotlight notices updated successfully!")
      setDeletedIds([])
      fetchNotices()
    } catch (error: any) {
      alert(error.message || "Failed to save notices")
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges =
    JSON.stringify(notices) !== JSON.stringify(originalNotices) || deletedIds.length > 0

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-20">
      <AdminHeader
        title="Landing Spotlights"
        subtitle="Manage temporary banners and spotlight notices for the homepage."
        primaryAction={{
          label: "Publish Changes",
          onClick: handlePublish,
          icon: <Save size={18} />,
          loading: isSaving,
          disabled: !hasChanges,
          className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
        }}
        secondaryAction={{
          label: "Add Spotlight",
          onClick: addNotice,
          icon: <Plus size={16} strokeWidth={2.5} />,
        }}
      />

      <div className="space-y-6">
        {notices.length === 0 ? (
          <EmptyState
            title="No Spotlights Found"
            description="Add your first temporary notice to feature it on the landing page."
            onAction={addNotice}
            actionLabel="Create Spotlight"
          />
        ) : (
          notices.map((notice, index) => (
            <div
              key={notice.id}
              className="group relative overflow-hidden rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Media Section */}
                <div className="lg:col-span-4">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Background Image
                    </label>
                    <ImagePicker
                      label=""
                      value={notice.image_id || ""}
                      onChange={(id) => updateNotice(notice.id, { image_id: id })}
                    />
                    <div className="space-y-4 pt-4">
                      <div className="relative">
                        <Video className="absolute top-3 left-3 text-slate-400" size={16} />
                        <input
                          type="text"
                          value={notice.video_url || ""}
                          placeholder="Or Video URL (Youtube/Vimeo)..."
                          onChange={(e) => updateNotice(notice.id, { video_url: e.target.value })}
                          className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pr-4 pl-10 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Spotlight Title
                      </label>
                      <input
                        type="text"
                        value={notice.title}
                        placeholder="Enter a catchy title..."
                        onChange={(e) => updateNotice(notice.id, { title: e.target.value })}
                        className="w-full border-none p-0 text-2xl font-black tracking-tight text-slate-900 placeholder:text-slate-200 focus:ring-0"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Description
                      </label>
                      <textarea
                        value={notice.description || ""}
                        placeholder="Write a brief description..."
                        onChange={(e) => updateNotice(notice.id, { description: e.target.value })}
                        className="h-24 w-full resize-none rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <LinkIcon size={12} /> Target Link (URL)
                      </label>
                      <input
                        type="text"
                        value={notice.link_url || ""}
                        placeholder="https://..."
                        onChange={(e) => updateNotice(notice.id, { link_url: e.target.value })}
                        className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={notice.link_label || ""}
                        placeholder="e.g. Learn More"
                        onChange={(e) => updateNotice(notice.id, { link_label: e.target.value })}
                        className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Calendar size={12} /> Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={notice.expiry_date ? notice.expiry_date.split("T")[0] : ""}
                        onChange={(e) =>
                          updateNotice(notice.id, {
                            expiry_date: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                          })
                        }
                        className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-0"
                      />
                    </div>

                    <div className="flex items-end pb-1">
                      <label className="flex cursor-pointer items-center gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notice.is_active}
                            onChange={(e) => updateNotice(notice.id, { is_active: e.target.checked })}
                            className="sr-only"
                          />
                          <div
                            className={`h-6 w-11 rounded-full transition-colors ${notice.is_active ? "bg-emerald-500" : "bg-slate-200"}`}
                          ></div>
                          <div
                            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${notice.is_active ? "translate-x-5" : "translate-x-0"}`}
                          ></div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {notice.is_active ? "Active" : "Hidden"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Area */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <AlertCircle size={12} /> Spotlight #{index + 1}
                </div>
                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-500 transition-all hover:bg-red-100 active:scale-95"
                >
                  <Trash2 size={14} /> Remove Notice
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
