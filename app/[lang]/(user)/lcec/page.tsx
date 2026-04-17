import { BookOpen, Calendar, HeartHandshake, Music, Users } from "lucide-react"

const seniorColumns = [
  { header: "Designation", accessor: "designation" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
]
const seniorOfficeBearerData = [
  { designation: "President", name: "Peter Chen Kait Leong", email: "pckl@azizchen.com" },
  { designation: "Vice President", name: "Patrick Chen Suan Han", email: "patchen25@gmail.com" },
  { designation: "Secretary", name: "Jennie Siew", email: "kikkodesa@yahoo.com" },
  { designation: "Treasurer", name: "Lim Sow Mun", email: "sowmun.lim@hgmail.com" },
]

const seniorCoordinatorData = [
  { designation: "Spiritual Coordinator", name: "Gillian Lee", email: "yakpg9@gmail.com" },
  { designation: "Social Concerns Coordinator", name: "Francis Ann Lock, Choo", email: "francis.choo@fcs.com.my" },
  { designation: "Fellowship", name: "Peggy Yeo", email: "sksunnykoh@gmail.com" },
  { designation: "Membership", name: "Jennie Siew", email: "kikkodesa@yahoo.com" },
  { designation: "Music", name: "Susan San", email: "-" },
  { designation: "Programme/Activities", name: "Lucy Kok", email: "wskok5555@gmail.com" },
  { designation: "Auditor", name: "Edward Kok", email: "wskok5555@gmail.com" },
]

// Suggested Example Usage Data
const contact = {
  name: "Peter Chen",
  phone: "(+60)12-238 6817",
  email: "msf@trinitypj.com",
}

const activities = [
  {
    title: "Sit Down Exercises",
    schedule: "Every Mon & Wed @ 10.00am",
    icon: <Users size={20} />,
    category: "weekly",
  },
  {
    title: "Ukulele (8am) / Guitar (9am)",
    schedule: "Every Sat",
    icon: <Music size={20} />,
    category: "weekly",
  },
  {
    title: "Line Dancing",
    schedule: "Every Sun @ 2.00pm",
    icon: <HeartHandshake size={20} />,
    category: "weekly",
  },
  {
    title: "Bible Hour",
    schedule: "1st & 3rd Tues @ 9.15am",
    icon: <BookOpen size={20} />,
    category: "bimonthly",
  },
  {
    title: "Choir Practice",
    schedule: "1st & 3rd Tues @ 12.30pm",
    icon: <Music size={20} />,
    category: "bimonthly",
  },
  {
    title: "MSF Sunday",
    schedule: "27 October 2024",
    icon: <Calendar size={20} />,
    category: "special",
  },
]

import { lcecService } from "@/services/lcec-service"

export default async function LCECPage() {
  const settings = await lcecService.getSettings()

  // Dynamic images from DB with legacy URL fallbacks
  const bannerUrl = settings?.bannerUrl
  const chartUrl = settings?.chartUrl
  return (
    <div className="bg-background min-h-screen">
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Project Overview */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            {chartUrl && <img src={chartUrl} alt="LCEC 2025" />}
          </div>
        </div>
      </section>
    </div>
  )
}
