// components/admin/Sidebar.tsx
"use client"
import { ADMIN_NAV } from "@/types/navigation"

interface SidebarProps {
  activeSlug: string
  onSelect: (slug: string) => void
}

export default function Sidebar({ activeSlug, onSelect }: SidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col overflow-y-auto border-r bg-white">
      {/* Header */}
      <div className="border-b p-6">
        <h1 className="text-lg font-bold text-blue-600">TMCPJ Portal</h1>
        <p className="mt-1 text-xs tracking-wider text-gray-500 uppercase">Admin Dashboard</p>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 space-y-8 p-4">
        {ADMIN_NAV.map((group) => (
          <div key={group.group}>
            <h3 className="mb-2 px-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">{group.group}</h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeSlug === item.slug

                return (
                  <button
                    key={item.slug}
                    onClick={() => onSelect(item.slug)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-blue-600" : "text-gray-400"} />
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / Profile */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            TM
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">Church Staff</p>
            <p className="truncate text-xs text-gray-500">admin@tmcpj.org</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
