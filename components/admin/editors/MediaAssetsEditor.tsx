"use client"
import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { supabase } from "@/lib/supabase"
import { FileImage, Hash, Loader2, Save, Trash2, Type, UploadCloud } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AdminHeader from "../AdminHeader"

export interface MediaAsset {
  id: string
  created_at: string
  storage_path: string
  filename: string
  alt_text?: string
  content_type?: string
  file_size?: number
}

export default function MediaAssetsEditor() {
  const { confirm, alert } = useDialog()
  const [items, setItems] = useState<MediaAsset[]>([])
  const [originalItems, setOriginalItems] = useState<MediaAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const { setIsDirty } = useNavigationGuard()

  // We are only comparing filename and alt_text since those are the only editable fields
  const isDirty = useMemo(() => {
    return JSON.stringify(
      items.map(i => ({ id: i.id, filename: i.filename, alt_text: i.alt_text }))
    ) !== JSON.stringify(
      originalItems.map(i => ({ id: i.id, filename: i.filename, alt_text: i.alt_text }))
    )
  }, [items, originalItems])

  useEffect(() => {
    setIsDirty(isDirty)
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

  const loadData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/media-assets")
      const data: any = await res.json()
      
      if (res.ok && Array.isArray(data)) {
        setItems(data as MediaAsset[])
        setOriginalItems(data as MediaAsset[])
      } else {
        console.error("Failed to load media assets:", data.error || data)
        setItems([])
        setOriginalItems([])
      }
    } catch (error) {
      console.error(error)
      setItems([])
      setOriginalItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const fileExt = file.name.split(".").pop()
    const storageName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    const bucket = "brand-assets"

    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(storageName, file)

      if (uploadError) throw new Error(uploadError.message)

      // Use the API route to batch upsert/insert the DB record
      const newAsset = {
        storage_path: `${bucket}/${storageName}`,
        filename: file.name,
        alt_text: "",
        content_type: file.type,
        file_size: file.size,
      }

      const res = await fetch("/api/media-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([newAsset])
      })

      if (res.ok) {
        // Reload library to get the newly created asset
        await loadData()
      } else {
        throw new Error("Failed to save media asset metadata")
      }
    } catch (error: any) {
      console.error(error)
      await alert(`Upload Failed: ${error.message}`, "Error")
    } finally {
      setIsUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to permanently delete this media asset? This will break any pages using this file.", "Confirm Deletion", true)
    if (!isConfirmed) return

    setIsSaving(true)
    try {
      const res = await fetch(`/api/media-assets?id=${id}`, { method: "DELETE" })
      if (!res.ok) {
        const data:any = await res.json().catch(() => ({}))
        throw new Error(data.error || "Deletion failed")
      }
      
      const filtered = items.filter(i => i.id !== id)
      setItems(filtered)
      setOriginalItems(filtered)
    } catch (error: any) {
      console.error(error)
      await alert(`Delete Error: ${error.message}`, "Error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = (id: string, updates: Partial<MediaAsset>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // Find modified items
      const payload = items.filter(item => {
        const original = originalItems.find(o => o.id === item.id)
        return original && (original.filename !== item.filename || original.alt_text !== item.alt_text)
      }).map(item => ({
        id: item.id,
        filename: item.filename,
        alt_text: item.alt_text || null
      }))

      if (payload.length === 0) {
        setIsSaving(false)
        return
      }

      const res = await fetch("/api/media-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const freshRes = await fetch("/api/media-assets")
        const freshData:any = await freshRes.json()
        setItems(freshData)
        setOriginalItems(freshData)
        await alert("Media Assets updated successfully!", "Success")
      } else {
        throw new Error("Failed to update media assets")
      }
    } catch (error: any) {
      console.error("Publishing failed:", error)
      await alert(`Database Error: ${error.message}`, "Error")
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
        <AdminHeader
          title="Global Media Assets"
          subtitle="Manage all uploaded media, banners, and generic files used across the site."
          primaryAction={{
            label: "Save Metadata",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !isDirty,
            className: isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
          }}
          secondaryAction={{
            label: isUploading ? "Uploading..." : "Upload New",
            onClick: () => document.getElementById("file-upload")?.click(),
            icon: isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />,
          }}
        />

        {/* Hidden File Input for the secondary action */}
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={isUploading}
        />

        {items.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50">
            <p className="text-slate-500 font-medium">No media assets found in the library.</p>
            <button 
              onClick={() => document.getElementById("file-upload")?.click()} 
              className="rounded-xl font-bold bg-emerald-500 text-white px-5 py-2.5 transition-all hover:bg-emerald-600"
            >
              Upload First Asset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-2.5 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl md:rounded-[32px] md:p-3"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-50 border-b border-slate-50 pb-4 flex items-center justify-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.storage_path}`}
                    alt={item.alt_text || "Media Asset"}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <div className="space-y-4 p-4 md:p-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                      <FileImage size={12} className="text-emerald-500" /> System Filename
                    </div>
                    <input
                      value={item.filename || ""}
                      onChange={(e) => handleUpdate(item.id, { filename: e.target.value })}
                      placeholder="e.g. LCEC-2025.jpg"
                      className="w-full rounded-xl bg-slate-50/50 px-4 py-3.5 text-xs font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 md:rounded-2xl md:py-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                      <Type size={12} className="text-emerald-500" /> Alt Text / Description
                    </div>
                    <input
                      value={item.alt_text || ""}
                      onChange={(e) => handleUpdate(item.id, { alt_text: e.target.value })}
                      placeholder="..."
                      className="w-full rounded-xl bg-slate-50/50 px-4 py-3.5 text-xs font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 md:rounded-2xl md:py-4"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-4 md:pt-5">
                    <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-400">
                       <span className="flex items-center gap-1"><Hash size={10} /> ID: {item.id.substring(0,8)}</span>
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
