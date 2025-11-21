import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import ProgramDashboard from "@/components/program-dashboard"
import Table from "@/components/table"
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

export default function SeniorPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://trinitypj.com/wp-content/uploads/2016/03/Picture4.png')` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">Methodist Senior Fellowship</h1>
          <p className="mt-3 text-lg">We open to all church members above the age of 50</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-foreground mb-4 px-12 text-3xl font-bold lg:text-4xl">Aims & Objectives of MSF</h3>
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <p className="mb-4">
              To provide and enhance Christian Fellowship for all Senior Members of the congregation as well as their
              friends so as to lead them to accept Jesus Christ as Lord and Saviour.
            </p>
            <p className="mb-2">1. To disseminate Missions information and create church wide awareness;</p>
            <p className="mb-2">2. To study local community needs and recommend missions projects;</p>
            <p className="mb-2">
              3. To study overseas missions needs and recommend for local church participation and involvement;
            </p>
            <p className="mb-4">
              4. To involve church wide participation in missions and encourage missionaries to venture into Missions
              Projects.
            </p>
          </div>

          <Table title="Office-Bearers for 2023-2024" columns={seniorColumns} data={seniorOfficeBearerData} />
          <Table title="Coordinators" columns={seniorColumns} data={seniorCoordinatorData} />

          <ProgramDashboard contact={contact} activities={activities} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
