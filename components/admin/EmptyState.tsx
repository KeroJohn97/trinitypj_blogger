"use client"
import { ImageIcon, Plus } from "lucide-react"

interface EmptyStateProps {
  title?: string
  description?: string
  onAction?: () => void
  actionLabel?: string
  icon?: React.ReactNode
}

export default function EmptyState({
  title = "No items found",
  description = "Get started by creating your first entry.",
  onAction,
  actionLabel = "Add New",
  icon,
}: EmptyStateProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 flex min-h-[400px] w-full flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-slate-100 bg-slate-50/50 p-8 text-center duration-500">
      {/* Visual Indicator */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-white opacity-50 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 ring-slate-100">
          {icon || <ImageIcon className="text-slate-200" size={40} strokeWidth={1.5} />}
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-xs space-y-2">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm leading-relaxed font-medium text-slate-400">{description}</p>
      </div>

      {/* Optional Call to Action */}
      {onAction && (
        <button
          onClick={onAction}
          className="mt-8 flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95"
        >
          <Plus size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  )
}
