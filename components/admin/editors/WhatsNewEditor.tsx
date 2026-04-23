"use client"

import { WhatsNewItem, WhatsNewService } from "@/services/whats-new-service"
import ImagePicker from "components/ImagePicker"
import { AlertCircle, Link as LinkIcon, Plus, Save, Trash2, Video, Newspaper } from "lucide-react"
import { useEffect, useState } from "react"
import EmptyState from "../EmptyState"
import AdminHeader from "../AdminHeader"
import { useDialog } from "@/context/dialog-context"

export default function WhatsNewEditor() {
  const [items, setItems] = useState<WhatsNewItem[]>([])
  const [originalItems, setOriginalItems] = useState<WhatsNewItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  const { confirm, alert } = useDialog()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const data = await WhatsNewService.getAll(false)
      setItems(data)
      setOriginalItems(JSON.parse(JSON.stringify(data)) as WhatsNewItem[])
    } catch (error) {
      console.error("Failed to fetch What's New items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addItem = () => {
    const newItem: WhatsNewItem = {
      id: `temp-${Date.now()}`,
      title: "",
      description: "",
      sort_order: items.length,
      is_active: true,
      link_label: "Read More",
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, updates: Partial<WhatsNewItem>) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)))
  }

  const deleteItem = async (id: string) => {
    const isConfirmed = await confirm("Delete this update?", "Confirm Deletion", true)
    if (!isConfirmed) return

    if (!id.startsWith("temp-") && originalItems.some((on) => on.id === id)) {
      setDeletedIds((prev) => [...prev, id])
    }
    setItems((prev) => prev.filter((n) => n.id !== id))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => WhatsNewService.delete(id)))
      }

      await WhatsNewService.publish(items)
      alert("What's New section updated successfully!")
      setDeletedIds([])
      fetchItems()
    } catch (error: any) {
      alert(error.message || "Failed to save items")
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges =
    JSON.stringify(items) !== JSON.stringify(originalItems) || deletedIds.length > 0

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
        title="What's New"
        subtitle="Manage news, updates, and featured content for the church."
        primaryAction={{
          label: "Publish Changes",
          onClick: handlePublish,
          icon: <Save size={18} />,
          loading: isSaving,
          disabled: !hasChanges,
          className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
        }}
        secondaryAction={{
          label: "Add Update",
          onClick: addItem,
          icon: <Plus size={16} strokeWidth={2.5} />,
        }}
      />

      <div className="space-y-6">
        {items.length === 0 ? (
          <EmptyState
            title="No Updates Found"
            description="Add your first news update or announcement here."
            onAction={addItem}
            actionLabel="Add Update"
            icon={<Newspaper size={40} className="text-slate-200" />}
          />
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[32px] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Media Section */}
                <div className="lg:col-span-4">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Feature Media (Image)
                    </label>
                    <ImagePicker
                      label=""
                      value={item.image_id || ""}
                      onChange={(id) => updateItem(item.id, { image_id: id })}
                    />
                    <div className="space-y-4 pt-4">
                      <div className="relative">
                        <Video className="absolute top-3 left-3 text-slate-400" size={16} />
                        <input
                          type="text"
                          value={item.video_url || ""}
                          placeholder="Or Video URL (YouTube)..."
                          onChange={(e) => updateItem(item.id, { video_url: e.target.value })}
                          className="w-full rounded-2xl border-slate-100 bg-slate-50 py-3 pr-4 pl-10 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-0 outline-none"
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
                        Update Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        placeholder="e.g. New Outreach Ministry Launch"
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        className="w-full border-none p-0 text-2xl font-black tracking-tight text-slate-900 placeholder:text-slate-200 focus:ring-0 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Description
                      </label>
                      <textarea
                        value={item.description || ""}
                        placeholder="Give more details about this update..."
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        className="h-32 w-full resize-none rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-0 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <LinkIcon size={12} /> External Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={item.link_url || ""}
                        placeholder="https://..."
                        onChange={(e) => updateItem(item.id, { link_url: e.target.value })}
                        className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-0 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Link Button Text
                      </label>
                      <input
                        type="text"
                        value={item.link_label || ""}
                        placeholder="e.g. Read More"
                        onChange={(e) => updateItem(item.id, { link_label: e.target.value })}
                        className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-0 outline-none"
                      />
                    </div>

                    <div className="flex items-end pb-1">
                      <label className="flex cursor-pointer items-center gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={item.is_active}
                            onChange={(e) => updateItem(item.id, { is_active: e.target.checked })}
                            className="sr-only"
                          />
                          <div
                            className={`h-6 w-11 rounded-full transition-colors ${item.is_active ? "bg-emerald-500" : "bg-slate-200"}`}
                          ></div>
                          <div
                            className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${item.is_active ? "translate-x-5" : "translate-x-0"}`}
                          ></div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {item.is_active ? "Active" : "Hidden"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Area */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <AlertCircle size={12} /> News Item #{index + 1}
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-500 transition-all hover:bg-red-100 active:scale-95"
                >
                  <Trash2 size={14} /> Remove Item
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
