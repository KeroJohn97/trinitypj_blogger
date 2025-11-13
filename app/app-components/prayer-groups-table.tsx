"use client"

import { groups } from "@/lib/data"
import { PhoneContact } from "./phone-contact-services"

export interface PrayerGroup {
  id: string
  name: string
  type: string
  location: string
  day: string
  time: string
  leader: string
  contact: string
}

interface PrayerGroupsTableProps {
  title?: string
  description?: string
}

export function PrayerGroupsTable({ title, description }: PrayerGroupsTableProps) {
  return (
    <section className="w-full">
      {/* Header */}
      {title && <h2 className="text-primary mb-2 text-center text-2xl font-bold">{title}</h2>}
      {description && <p className="mx-auto mb-6 max-w-2xl text-center text-gray-600">{description}</p>}

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-left text-white">
            <tr>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Day</th>
              <th className="px-6 py-3 font-medium">Time</th>
              <th className="px-6 py-3 font-medium">Leader</th>
              <th className="px-6 py-3 font-medium">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {groups.map((group) => (
              <tr key={group.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{group.location}</td>
                <td className="px-6 py-3">{group.type}</td>
                <td className="px-6 py-3">{group.day}</td>
                <td className="px-6 py-3">{group.time}</td>
                <td className="px-6 py-3">{group.leader}</td>
                <td className="px-6 py-3">
                  <PhoneContact phone={group.contact} whatsapp={true} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {groups.map((group) => (
          <div key={group.id} className="rounded-lg bg-white p-4 shadow transition hover:shadow-md">
            <h3 className="text-primary mb-1 text-lg font-semibold">{group.name}</h3>
            <p className="text-sm text-gray-600">
              {group.day} • {group.time}
            </p>
            <p className="mt-1 text-sm text-gray-500">{group.location}</p>
            <p className="mt-1 text-sm text-gray-500">Type: {group.type}</p>
            <p className="mt-1 text-sm text-gray-500 italic">Leader: {group.leader}</p>
            <div className="pt-2"> <PhoneContact phone={group.contact} whatsapp={true} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
