import Table from "@/components/table"
import { supabase } from "@/lib/supabase"
import { SmallGroup } from "@/types/website"
import { getDictionary } from "dictionaries"

export default async function SmallGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.smallGroups

  // 1. Fetch Dynamic Data - Ordered by 'is_featured' then 'name'
  const { data: rawGroups, error } = await supabase
    .from("small_groups")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true }) // Updated from 'title' to 'name'

  if (error) {
    console.error("Error fetching small groups:", error)
  }

  // 2. Cast data to SmallGroup interface
  const groups = (rawGroups || []) as SmallGroup[]

  // 3. Define columns using the EXACT interface keys (accessors)
  const columns = [
    { header: "Fellowship", accessor: "name" }, // Match: name
    { header: "Day", accessor: "meeting_day" }, // Match: meeting_day
    { header: "Time", accessor: "meeting_time" }, // Match: meeting_time
    { header: "Location", accessor: "location_area" }, // Match: location_area
    { header: "Language", accessor: "language" }, // Match: language
    { header: "Leader", accessor: "leader_name" }, // Match: leader_name
  ]

  // 4. Group data by Zone
  const groupedGroups = groups.reduce<Record<string, SmallGroup[]>>((acc, group) => {
    const zoneName = group.zone || "General"

    if (!acc[zoneName]) {
      acc[zoneName] = []
    }

    acc[zoneName].push(group)
    return acc
  }, {})

  return (
    <div className="bg-background min-h-screen selection:bg-emerald-100">
      {/* Hero Section */}
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/images/small-group-hero.jpg')` }} // Use your asset path
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">{t.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium opacity-90 sm:text-xl">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Intro Gallery Section */}
      <section id="animated-gallery" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">{t.intro.title}</h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-500">{t.intro.desc}</p>
          </div>
          <div className="group relative overflow-hidden rounded-[40px] shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
            <img
              src="https://trinitypj.com/wp-content/uploads/SG-Bkt-Damansara-1030x636.jpg"
              alt="Small Group Gathering"
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* DYNAMIC DATA SECTION */}
      <div className="mx-auto max-w-7xl space-y-24 px-6 pb-32">
        {Object.entries(groupedGroups).map(([zoneName, zoneGroups]) => (
          <div key={zoneName} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Table title={zoneName} columns={columns} data={zoneGroups} />
          </div>
        ))}

        {/* Empty State */}
        {Object.keys(groupedGroups).length === 0 && (
          <div className="rounded-[32px] border-2 border-dashed border-slate-100 py-32 text-center">
            <p className="text-lg font-medium text-slate-400">
              No fellowship groups are currently listed for this season.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
