import prayerImg from "@/../assets/prayer.jpg"
import { createClient } from "@/utils/supabase/server"
import { PrayerGroupsTable } from "app/[lang]/app-components/prayer-groups-table"
import { getDictionary } from "dictionaries"

export default async function PrayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const supabase = await createClient()

  const [dict, { data: rawGatherings }] = await Promise.all([
    getDictionary(lang as "en-US" | "zh-CN"),
    supabase.from("prayer_gathering").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
  ])

  const t = dict.prayer
  const gatherings = rawGatherings || []

  // 1. Process Lighthouses (Mapping 'venue' to 'location' for your component)
  const lighthouses: any = gatherings
    .filter((g) => g.type === "lighthouse")
    .map((g) => ({
      id: g.id,
      name: g.title,
      location: g.venue, // Mapping DB venue to the "Location" column
      day: g.day,
      time: g.time,
      leader: g.leader,
      contact: g.contact,
    }))

  // 2. Process Prayer Meetings
  const prayerMeetings = gatherings.filter((g) => g.type === "prayer")

  return (
    <div className="bg-background min-h-screen">
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${prayerImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">{t.hero.title}</h1>
          <p className="mt-3 text-lg md:text-xl">{t.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Lighthouses Section */}
          <div className="mx-auto max-w-6xl pb-16">
            <PrayerGroupsTable
              title={t.lighthouses.title}
              description={t.lighthouses.description}
              // We pass the dictionary headers, but ensure 'type' is not used in the component
              headers={t.groupsTable.headers}
              groups={lighthouses}
            />
          </div>

          <hr className="mb-16 border-gray-100" />

          {/* Prayer Meetings Section */}
          <div className="mx-auto max-w-6xl">
            <h2 className="text-primary mb-4 text-center text-3xl font-bold tracking-tight">{t.meetings.title}</h2>

            <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-xl md:block">
              <table className="min-w-full border-collapse">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="px-8 py-4 text-left font-semibold tracking-wider uppercase">
                      {t.meetings.headers.day}
                    </th>
                    <th className="px-8 py-4 text-left font-semibold tracking-wider uppercase">
                      {t.meetings.headers.time}
                    </th>
                    <th className="px-8 py-4 text-left font-semibold tracking-wider uppercase">
                      {t.meetings.headers.venue}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {prayerMeetings.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50/80">
                      <td className="px-8 py-5 font-medium">{item.day}</td>
                      <td className="px-8 py-5">{item.time}</td>
                      <td className="px-8 py-5">
                        <div className="font-semibold text-gray-900">{item.venue}</div>
                        {item.note && <div className="mt-1 text-sm text-gray-500 italic">{item.note}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="space-y-4 md:hidden">
              {prayerMeetings.map((item) => (
                <div key={item.id} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="mb-3 flex justify-between border-b pb-3">
                    <span className="font-bold text-emerald-600">{item.day}</span>
                    <span className="font-medium text-gray-600">{item.time}</span>
                  </div>
                  <div className="font-bold text-gray-900">{item.venue}</div>
                  {item.note && <div className="mt-1 text-sm text-gray-500 italic">{item.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
