import { PageHeader } from "@/components/page-header"
import Table from "@/components/table"
import { supabase } from "@/lib/supabase"
import { SmallGroup } from "@/types/website"
import { ActivityGallery } from "components/small-groups/ActivityGallery"
import { getDictionary } from "dictionaries"

export default async function SmallGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.smallGroups

  // 1. Fetch Dynamic Data - Ordered by 'is_featured' then 'name'
  const [{ data: rawGroups, error: groupError }, { data: activities, error: activityError }] = await Promise.all([
    supabase
      .from("small_groups")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("name", { ascending: true }),
    supabase
      .from("small_group_activities")
      .select(`
        *,
        media_assets (storage_path)
      `)
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
  ])

  if (groupError) console.error("Error fetching small groups:", groupError)
  if (activityError) console.error("Error fetching activities:", activityError)

  // 2. Cast data to SmallGroup interface
  const groups = (rawGroups || []) as SmallGroup[]
  const galleryItems = (activities || []) as any[]

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
      <PageHeader title={t.hero.title} subtitle={t.hero.subtitle} />

      {/* Staggered Gallery Section */}
      <section id="activity-gallery" className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
            <h2 className="mb-6 text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">{t.intro.title}</h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-500">{t.intro.desc}</p>
          </div>

          <ActivityGallery items={galleryItems} dictionary={t} />
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
