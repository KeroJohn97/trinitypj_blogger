// components/admin/editors/SmallGroupsEditor.tsx
"use client"
import { Calendar, MapPin, Plus, Trash2, Users } from "lucide-react"
import { useState } from "react"

export default function SmallGroupsEditor() {
  const [groups, setGroups] = useState([{ id: "1", name: "Bereans", leader: "John Tan", area: "SS2", day: "Friday" }])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Small Groups</h2>
          <p className="text-sm text-gray-500">Manage the list of cell groups and fellowships.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
          <Plus size={18} /> New Group
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.id}
            className="group relative rounded-xl border bg-white p-5 shadow-sm transition-colors hover:border-blue-300"
          >
            <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-blue-500" />
                <span>
                  Leader: <b>{group.leader}</b>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-red-500" />
                <span>Area: {group.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-green-500" />
                <span>{group.day}s at 8:00 PM</span>
              </div>
            </div>

            <button className="absolute top-4 right-4 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
