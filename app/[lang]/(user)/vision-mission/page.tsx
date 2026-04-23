import { PageHeader } from "@/components/page-header"
import Image from "next/image"
import { getDictionary } from "dictionaries"
import { VisionService } from "@/services/vision-service"

export default async function VisionMissionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.visionMission

  // Fetch dynamic vision pillars
  const pillars = await VisionService.getAll()

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={t.header.title} subtitle={t.header.subtitle} />

      {pillars.length > 0 ? (
        <div className="space-y-16 py-12">
          {pillars.map((pillar, index) => (
            <section key={pillar.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-12 px-4 md:px-12">
                  {pillar.media_assets?.storage_path && (
                    <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-100 bg-slate-50/50">
                      <img
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${pillar.media_assets.storage_path}`}
                        alt={pillar.title}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className="max-w-3xl text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      {pillar.title}
                    </h2>
                    {pillar.description && (
                      <p className="text-lg leading-relaxed text-slate-600">
                        {pillar.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Fallback / Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="rounded-full bg-slate-50 p-6 mb-4">
            <p className="text-slate-400 italic">No vision pillars published yet.</p>
          </div>
        </div>
      )}
    </div>
  )
}

