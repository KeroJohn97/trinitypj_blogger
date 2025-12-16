import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PrayerGroupsTable } from "app/[lang]/app-components/prayer-groups-table"

import prayer from "@/../assets/prayer.jpg"

export default function PrayerPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${prayer.src})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">Prayer Lighthouses & Meetings</h1>
          <p className="mt-3 text-lg">Join us as we seek God together</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <PrayerGroupsTable
              title="Prayer Lighthouses"
              description="Find a prayer group near you or join an online lighthouse. These gatherings are open to everyone who desires to pray together."
            />
          </div>

          {<h2 className="text-primary mb-4 text-center text-2xl font-bold">Prayer Meetings</h2>}
          <div className="mx-auto hidden max-w-6xl bg-white px-4 pb-12 md:block">
            <table className="min-w-full border-collapse overflow-hidden rounded-xl bg-white shadow-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Day</th>
                  <th className="px-6 py-3 text-left font-medium">Time</th>
                  <th className="px-6 py-3 text-left font-medium">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3">Tuesday</td>
                  <td className="px-6 py-3">5:00 PM - 6:00 PM</td>
                  <td className="px-6 py-3">Via Google Meet</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3">4th Wednesday</td>
                  <td className="px-6 py-3">8:00 PM - 9:00 PM</td>
                  <td className="px-6 py-3">Sanctuary (with LCEC, SG & HF Leaders)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3">1st Saturday</td>
                  <td className="px-6 py-3">7:00 AM - 8:30 AM</td>
                  <td className="px-6 py-3">
                    Via Zoom (call 012-3218016)
                    <div className="text-xs text-gray-500">Together with Malaysia Prayer Altar</div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3">Following Saturday</td>
                  <td className="px-6 py-3">7:00 AM - 8:30 AM</td>
                  <td className="px-6 py-3">Via Zoom (call 012-3218016)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
