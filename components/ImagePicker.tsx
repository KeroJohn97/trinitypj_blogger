"use client"
import { supabase } from "@/lib/supabase"
import { Check, Loader2, MousePointer2, Plus, Search, UploadCloud, X } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"

interface MediaAsset {
  id: string
  storage_path: string
  filename: string
}

interface ImagePickerProps {
  label: string
  value?: string
  onChange: (assetId: string | "") => void
  bucket?: string
  aspectRatio?: "video" | "square" | "portrait" | "auto"
}

export default function ImagePicker({ 
  label, 
  value, 
  onChange, 
  bucket = "brand-assets",
  aspectRatio = "video"
}: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"upload" | "library">("upload")
  const [library, setLibrary] = useState<MediaAsset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (value) fetchCurrentAsset(value)
    else setSelectedAsset(null)
  }, [value])

  const fetchCurrentAsset = async (id: string) => {
    const { data } = await supabase.from("media_assets").select("*").eq("id", id).single()
    if (data) setSelectedAsset(data)
  }

  const fetchLibrary = async () => {
    const { data } = await supabase
      .from("media_assets")
      .select("id, storage_path, filename")
      .order("created_at", { ascending: false })
    if (data) setLibrary(data)
  }

  const filteredLibrary = useMemo(() => {
    return library.filter((asset) => asset.filename.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [library, searchTerm])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file)

    if (!uploadError) {
      const { data: asset } = await supabase
        .from("media_assets")
        .insert({
          storage_path: `${bucket}/${fileName}`,
          filename: file.name,
          content_type: file.type,
          file_size: file.size,
        })
        .select()
        .single()

      if (asset) {
        onChange(asset.id)
        setSelectedAsset(asset)
        setIsOpen(false)
      }
    }
    setIsUploading(false)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent opening the modal
    onChange("")
    setSelectedAsset(null)
  }

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "aspect-auto h-full"
  }

  return (
    <div className="group/picker h-full flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">{label}</label>
        {selectedAsset && (
          <button
            onClick={handleRemove}
            className="text-[10px] font-bold tracking-tight text-red-400 uppercase transition-colors hover:text-red-600"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* TRIGGER BOX */}
      <div
        onClick={() => {
          setIsOpen(true)
          fetchLibrary()
        }}
        className={`group relative ${aspectClasses[aspectRatio]} w-full cursor-pointer overflow-hidden rounded-[32px] transition-all duration-500 ease-out ${
          selectedAsset
            ? "bg-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50"
            : "border-2 border-dashed border-slate-200 bg-[#F8FAFC] hover:border-emerald-400/50 hover:bg-emerald-50/20"
        }`}
      >
        {selectedAsset ? (
          <>
            {/* Image with subtle Inner Shadow for Depth */}
            <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)]" />
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${selectedAsset.storage_path}`}
              className="cubic-bezier(0.4, 0, 0.2, 1) h-full w-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
              alt="Selected asset"
            />

            {/* Modern High-Gloss Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm">
              <div className="translate-y-2 scale-90 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100">
                <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-6 py-3 text-[13px] font-bold tracking-tight text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md">
                  <MousePointer2 size={16} className="text-emerald-500" />
                  Replace Image
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Minimalist Empty State with 'Icon Stack' Aesthetic */
          <div className="relative flex h-full flex-col items-center justify-center">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-emerald-100">
                <Plus
                  size={22}
                  className="text-emerald-500 transition-transform group-hover:scale-110"
                  strokeWidth={2.5}
                />
              </div>

              <div className="space-y-1">
                <p className="text-[14px] font-bold tracking-tight text-slate-600 transition-colors group-hover:text-slate-900">
                  Add Image
                </p>
                <p className="text-[11px] font-medium text-slate-400">Drag and drop or click to browse</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-8">
          <div
            className="animate-in fade-in absolute inset-0 bg-slate-900/60 backdrop-blur-xl duration-500"
            onClick={() => setIsOpen(false)}
          />

          <div className="animate-in slide-in-from-bottom shadow-2xl relative flex h-[90vh] sm:h-full sm:max-h-[800px] w-full max-w-5xl flex-col overflow-hidden rounded-t-[32px] sm:rounded-[40px] bg-white duration-500">
            {/* MODAL HEADER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 sm:px-8 py-5 sm:py-6">
              <div className="flex items-center gap-4">
                <div className="flex rounded-full bg-slate-100 p-1">
                  {(["upload", "library"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-full px-6 py-1.5 text-xs font-bold transition-all ${
                        activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-slate-50 p-2.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4 sm:p-8">
              {activeTab === "upload" ? (
                <label className="group/upload relative flex h-full min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-200 bg-white transition-all hover:border-emerald-300 hover:bg-emerald-50/10">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                      <div className="absolute -inset-4 animate-pulse rounded-full bg-emerald-50 opacity-0 transition-opacity group-hover/upload:opacity-100" />
                      <div className="relative rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100">
                        {isUploading ? (
                          <Loader2 size={40} className="animate-spin text-emerald-500" />
                        ) : (
                          <UploadCloud size={40} className="text-emerald-500" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">
                        {isUploading ? "Uploading to Server..." : "Release to upload"}
                      </p>
                      <p className="text-sm font-medium text-slate-400">PNG, JPG or WebP (Max 5MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                    disabled={isUploading}
                  />
                </label>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      placeholder="Search previously uploaded media..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-2xl border-none bg-white px-12 py-4 text-sm font-medium shadow-sm ring-1 ring-slate-100 transition-all outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {filteredLibrary.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => {
                          onChange(asset.id)
                          setSelectedAsset(asset)
                          setIsOpen(false)
                        }}
                        className="group relative aspect-square cursor-pointer overflow-hidden rounded-[20px] bg-white ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${asset.storage_path}`}
                          className="h-full w-full object-contain"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all ${
                            selectedAsset?.id === asset.id
                              ? "bg-emerald-600/60 opacity-100"
                              : "bg-slate-900/0 opacity-0 group-hover:bg-slate-900/40 group-hover:opacity-100"
                          }`}
                        >
                          <div className="scale-75 rounded-full bg-white p-2 text-emerald-600 shadow-xl transition-transform group-hover:scale-100">
                            <Check size={20} strokeWidth={3} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
