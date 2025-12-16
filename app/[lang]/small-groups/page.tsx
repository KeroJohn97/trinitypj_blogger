"use client"

import smallGroup from "@/../assets/small-group.png"
import { Footer } from "@/components/footer"
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
import { useState } from "react"

export default function SmallGroupsPage() {
  const [galleryVisible, setGalleryVisible] = useState(true)

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
          <h1 className="text-4xl font-bold">Small Groups</h1>
          <p className="mt-3 text-lg"> Check out what some of our small groups have been up to!</p>
        </div>
      </section>

      {/* <!-- Added animated photo gallery section --> */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              TOGETHER WE GROW
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Small groups have always been a part of our Methodist heritage, for the nurturing and continual spiritual
              growth of the church. It is through Small Groups that we can reach the most people in the most meaningful
              way as well as to enable us to provide all the essential elements for caring, spiritual growth and
              witnessing. Through the Small Groups Ministry we make disciples, identify leaders and give people the
              relationship and accountability they need.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="https://trinitypj.com/wp-content/uploads/SG-Bkt-Damansara-1030x636.jpg"
                alt="MYF - 2023"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-12">
        <Table columns={pjDayColumns} data={pjDayData} title="Zone : Petaling Jaya (day)"></Table>
        <Table columns={pjNightColumns} data={pjNightData} title="Zone : Petaling Jaya (night)"></Table>
        <Table columns={puchongColumns} data={puchongData} title="Zone : Puchong"></Table>
        <Table columns={subangShahAlamColumns} data={subangShahAlamData} title="Zone : Subang-Shah Alam"></Table>
        <Table
          columns={klColumns}
          data={klData}
          title="Zone : KL (Damansara Hts, Sri Hartamas, Mont Kiara, Bangsar, TTDI areas)"
        ></Table>
        <Table columns={chineseMinistryColumns} data={chineseMinistryData} title="Zone : Chinese Ministry"></Table>
        <Table columns={spheresColumns} data={spheresData} title="Zone : Spheres (18 – 35 years old)"></Table>
        <Table columns={homeFellowshipColumns} data={homeFellowshipData} title="Zone : Puchong"></Table>
      </div>

      <p className="mb-16"></p>
      <Footer />
    </div>
  )
}
