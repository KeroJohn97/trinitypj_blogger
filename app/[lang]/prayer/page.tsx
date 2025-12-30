import prayer from "@/../assets/prayer.jpg"
import { PrayerGroupsTable } from "app/[lang]/app-components/prayer-groups-table"
import { getDictionary } from "dictionaries"

export default async function PrayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.prayer

  return (
    <div className="bg-background min-h-screen">
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${prayer.src})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">{t.hero.title}</h1>
          <p className="mt-3 text-lg">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <PrayerGroupsTable
              title={t.lighthouses.title}
              description={t.lighthouses.description}
              headers={t.groupsTable.headers}
              groups={t.groupsTable.items}
            />
          </div>

          <h2 className="text-primary mb-4 text-center text-2xl font-bold">{t.meetings.title}</h2>

          <div className="mx-auto hidden max-w-6xl bg-white px-4 pb-12 md:block">
            <table className="min-w-full border-collapse overflow-hidden rounded-xl bg-white shadow-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">{t.meetings.headers.day}</th>
                  <th className="px-6 py-3 text-left font-medium">{t.meetings.headers.time}</th>
                  <th className="px-6 py-3 text-left font-medium">{t.meetings.headers.venue}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {t.meetings.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{item.day}</td>
                    <td className="px-6 py-3">{item.time}</td>
                    <td className="px-6 py-3">
                      {item.venue}
                      {/* Render note only if it exists in the dictionary item */}
                      {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
