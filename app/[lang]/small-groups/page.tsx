import smallGroup from "@/../assets/small-group.png"
import Table from "@/components/table"
import {
  chineseMinistryColumns,
  chineseMinistryData,
  homeFellowshipColumns,
  homeFellowshipData,
  klColumns,
  klData,
  pjDayColumns,
  pjDayData,
  pjNightColumns,
  pjNightData,
  puchongColumns,
  puchongData,
  spheresColumns,
  spheresData,
  subangShahAlamColumns,
  subangShahAlamData,
} from "@/lib/data"
import { getDictionary } from "dictionaries"

export default async function SmallGroupsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.smallGroups

  return (
    <div className="bg-background min-h-screen">
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${smallGroup.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">{t.hero.title}</h1>
          <p className="mt-3 text-lg">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {t.intro.title}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t.intro.desc}</p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="https://trinitypj.com/wp-content/uploads/SG-Bkt-Damansara-1030x636.jpg"
                alt="Small Group Gathering"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-12 space-y-8 pb-16">
        <Table columns={pjDayColumns} data={pjDayData} title={t.zones.pjDay} />
        <Table columns={pjNightColumns} data={pjNightData} title={t.zones.pjNight} />
        <Table columns={puchongColumns} data={puchongData} title={t.zones.puchong} />
        <Table columns={subangShahAlamColumns} data={subangShahAlamData} title={t.zones.subang} />
        <Table columns={klColumns} data={klData} title={t.zones.kl} />
        <Table columns={chineseMinistryColumns} data={chineseMinistryData} title={t.zones.chinese} />
        <Table columns={spheresColumns} data={spheresData} title={t.zones.spheres} />
        {/* Note: I assumed the last table title was meant to be Home Fellowship based on the data variable */}
        <Table columns={homeFellowshipColumns} data={homeFellowshipData} title={t.zones.homeFellowship} />
      </div>
    </div>
  )
}
