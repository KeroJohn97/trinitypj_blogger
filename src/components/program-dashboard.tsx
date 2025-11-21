import { Calendar, Mail, Phone } from "lucide-react"
import React from "react"

// Types
export type Activity = {
  title: string
  schedule: string
  icon?: React.ReactNode
  category: string
}

export type ContactInfo = {
  name: string
  phone: string
  email: string
}

export default function ProgramDashboard({ contact, activities }: { contact: ContactInfo; activities: Activity[] }) {
  const weekly = activities.filter((a) => a.category === "weekly")
  const bimonthly = activities.filter((a) => a.category === "bimonthly")
  const special = activities.filter((a) => a.category === "special")

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 p-4">
      {/* Contact Card */}
      <div className="flex flex-col items-start gap-4 rounded-2xl border bg-white p-6 shadow-md md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold">Contact {contact.name}</h2>
          <div className="mt-2 flex flex-col gap-1 text-gray-700">
            <div className="flex items-center gap-2">
              <Phone size={18} /> {contact.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} /> {contact.email}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activities */}
      {weekly.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold">Weekly Activities</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {weekly.map((item, idx) => (
              <div key={idx} className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold text-gray-800">{item.title}</span>
                </div>
                <p className="text-sm text-gray-600">{item.schedule}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bi-Monthly Activities */}
      {bimonthly.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold">Bi-Monthly Programs</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bimonthly.map((item, idx) => (
              <div key={idx} className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="text-primary mb-3 flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold text-gray-800">{item.title}</span>
                </div>
                <p className="text-sm text-gray-600">{item.schedule}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Special Event */}
      {special.length > 0 && (
        <section>
          <h3 className="mb-4 text-lg font-semibold">Special Event</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {special.map((item, idx) => (
              <div
                key={idx}
                className="border-primary rounded-xl border-2 bg-white p-5 shadow transition hover:shadow-lg"
              >
                <div className="text-primary mb-3 flex items-center gap-3 font-semibold">
                  <Calendar />
                  <span>{item.title}</span>
                </div>
                <p className="font-medium text-gray-700">{item.schedule}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
