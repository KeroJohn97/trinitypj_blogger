import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

export function SortableGatheringRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {/* The Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1/2 left-[-32px] hidden -translate-y-1/2 cursor-grab p-2 text-gray-300 opacity-0 transition-all group-hover:opacity-100 hover:text-emerald-500 active:cursor-grabbing lg:block"
      >
        <GripVertical size={20} />
      </div>
      {children}
    </div>
  )
}
export function SortableMinistryRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {/* The Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1/2 left-[-32px] hidden -translate-y-1/2 cursor-grab p-2 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:text-emerald-500 active:cursor-grabbing lg:block"
      >
        <GripVertical size={22} strokeWidth={1.5} />
      </div>
      {children}
    </div>
  )
}
