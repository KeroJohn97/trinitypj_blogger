import { HandHeart, Heart, Users } from "lucide-react"

export const formCategories = [
  {
    id: "e6cd0475-7e74-4a07-a989-45c8dd18bf11",
    icon: HandHeart,
    title: "Serve With Us",
    description: "Discover opportunities to use your gifts and talents to serve in various church ministries",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSeXbVhtOJzT_ifLYZ_fw7iPxk-ypdnYWtkia-WmSvJ_D0508Q/viewform",
    buttonText: "Volunteer to Serve",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "db87267e-51d2-4918-9980-bf83e44baf61",
    icon: Heart,
    title: "Prayer Requests",
    description: "Share your prayer needs with our church family. We're here to lift you up in prayer",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSePaYSVQ-NREQMXtmdeD77Hu52NEdl5y5qAX1TMSovKSltH-Q/viewform",
    buttonText: "Submit Prayer Request",
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "7acd2a78-29da-4590-9dda-81ca171f04d0",
    icon: Users,
    title: "New Here?",
    description: "Welcome! We'd love to get to know you better and help you connect with our community",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSd7s_661yVduVKlqypiHtpYdHQnc6curIPWYfTB_C3HRprK6w/viewform",
    buttonText: "Connect With Us",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "db87267e-51d2-4918-9980-bf83e44baf61",
    icon: Heart,
    title: "Financial Pledge",
    description:
      "Trusting God to bless me and provide for my every need, by faith and in obedience to Him who is the Head of the Church",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSePaYSVQ-NREQMXtmdeD77Hu52NEdl5y5qAX1TMSovKSltH-Q/viewform",
    buttonText: "Submit Prayer Request",
    color: "text-rose-600 dark:text-rose-400",
  },
]

export const groups = [
  {
    id: "1",
    name: "Puchong Lighthouse",
    type: "Church",
    location: "Bandar Kinrara, Puchong",
    day: "Tuesday",
    time: "8:45 PM",
    leader: "Ong Chong Lai",
    contact: "(+60)19-311 8610",
  },
  {
    id: "2",
    name: "Subang Jaya Lighthouse",
    type: "Home",
    location: "Jalan USJ 11/1F, Subang Jaya",
    day: "Wednesday",
    time: "8:00 PM",
    leader: "Cassandra Pak",
    contact: "(+60)12-287 3822",
  },
  {
    id: "3",
    name: "Subang Heights West Lighthouse",
    type: "Campus",
    location: "Jalan SHB 4, Subang Heights West",
    day: "1st & 3rd Saturdays",
    time: "8:30 PM",
    leader: "Carrie Chew",
    contact: "(+60)12-622 2630",
  },
  {
    id: "4",
    name: "Petaling Jaya Lighthouse",
    type: "Workplace",
    location: "Lorong 5/10B, 46000 Petaling Jaya",
    day: "Wednesdays",
    time: "3:00 PM",
    leader: "Joy Jayaratnam",
    contact: "(+60)3-7957 2558",
  },
  {
    id: "5",
    name: "Bangsar Group",
    type: "Family",
    location: "Bangsar",
    day: "2nd & 4th Tuesdays",
    time: "4:00 PM",
    leader: "Quek Lee Heng",
    contact: "(+60)16-288 5118",
  },
]

export const pjDayColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const pjDayData = [
  {
    venue: "TMC PJ (Manna) [In Person]",
    meetingTime: "1st & 3rd Wednesday @ 10:00am / 2nd & 4th Wednesday (WA Studies)",
  },
  {
    venue: "TMC PJ (Agape) [In Person/Online]",
    meetingTime: "Thursday Weekly @ 9:30am (Online) / Last Thursday @ 9:30am (In Person)",
  },
  {
    venue: "TMC PJ (Shalom) [In Person]",
    meetingTime: "Friday Weekly @ 10:00am",
  },
  {
    venue: "TMC PJ (Five Stones) [Online]",
    meetingTime: "Friday Weekly @ 2:00pm",
  },
  {
    venue: "TMC PJ SG MW [In Person]",
    meetingTime: "Thursday Weekly @ 11:00am",
  },
  {
    venue: "TMC PJ (Vineyard) [In Person]",
    meetingTime: "Saturday Weekly @ 10:30am (except 5th Saturday)",
  },
]

export const pjNightColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const pjNightData = [
  {
    venue: "Section 17, Petaling Jaya [Online/In Person]",
    meetingTime: "Thursday Weekly @ 8:00pm (Online) / Last Thursday @ 8:00pm (In Person)",
  },
  {
    venue: "Section 5, Petaling Jaya [In Person/Online]",
    meetingTime: "Thursday Weekly @ 8:30pm (except last Thursday)",
  },
  {
    venue: "KG Tunku, Petaling Jaya [In Person]",
    meetingTime: "Thursday Monthly @ 8:00pm",
  },
  {
    venue: "Alpha Cell [Online]",
    meetingTime: "Tuesday Weekly @ 8:30pm (except last Tuesday)",
  },
  {
    venue: "Aleph [Online]",
    meetingTime: "Thursday Weekly @ 8:00pm (except last Thursday)",
  },
  {
    venue: "Crossroot [Online]",
    meetingTime: "1st & 3rd Friday @ 8:30pm",
  },
]

export const puchongColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const puchongData = [
  {
    venue: "Puchong 3, Bandar Kinrara [In Person]",
    meetingTime: "Thursday Fortnightly @ 8:30pm",
  },
  {
    venue: "CANA, Old Klang Road [In Person]",
    meetingTime: "Sunday Weekly @ 11:15am",
  },
  {
    venue: "Puchong 1, TMC PJ [Online]",
    meetingTime: "Monday Weekly @ 8:30pm (except Public Holiday)",
  },
  {
    venue: "Puchong 2, TMC PJ [In Person]",
    meetingTime: "Sunday Weekly @ 11:15am",
  },
]

export const subangShahAlamColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const subangShahAlamData = [
  {
    venue: "UEP Subang Jaya [In Person]",
    meetingTime: "1st & 3rd Thursday @ 8:30pm",
  },
  {
    venue: "Putra Heights [Online]",
    meetingTime: "1st & 3rd Tuesday @ 8:00pm",
  },
  {
    venue: "UEP Subang Jaya [Online]",
    meetingTime: "Thursday Weekly @ 8:30pm (except 5th Thursday)",
  },
  {
    venue: "Subang Height West [In Person]",
    meetingTime: "Friday Fortnightly @ 8:30pm",
  },
  {
    venue: "Sunway Alam Suria, Shah Alam [In Person]",
    meetingTime: "Friday Fortnightly @ 8:30pm",
  },
]

export const klColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const klData = [
  {
    venue: "Desa ParkCity [In Person]",
    meetingTime: "Tuesday Weekly @ 8:00pm",
  },
  {
    venue: "Bukit Damansara, KL [In Person]",
    meetingTime: "Thursday Fortnightly @ 8:00pm",
  },
  {
    venue: "Bangsar Baru, KL [In Person]",
    meetingTime: "1st & 3rd Thursday @ 8:00pm",
  },
  {
    venue: "Mont’ Kiara, KL [In Person]",
    meetingTime: "Friday Fortnightly @ 8:00pm",
  },
  {
    venue: "TTDI, KL [Online]",
    meetingTime: "Friday Fortnightly @ 8:00pm",
  },
  {
    venue: "Bandar Utama, PJ [In Person]",
    meetingTime: "Friday Weekly @ 8:00pm",
  },
  {
    venue: "Bible Study Group, Desa Damansara Height [In Person]",
    meetingTime: "Wednesday Weekly @ 10:00am",
  },
]

export const chineseMinistryColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const chineseMinistryData = [
  {
    venue: "TMCPJ (Life)",
    meetingTime: "2nd & 4th Sunday @ 11:00am",
  },
  {
    venue: "TMCPJ (YA)",
    meetingTime: "1st & 3rd Sunday @ 11:00am",
  },
]

export const spheresColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const spheresData = [
  {
    venue: "Pathfinders (Campus) [In Person]",
    meetingTime: "Sunday Weekly @ 11:00am (at TMCPJ)",
  },
  {
    venue: "Acts 2.4 (Female Only) [In Person]",
    meetingTime: "Friday Weekly @ 8:00pm",
  },
  {
    venue: "Men’s Connect (Men Only) [Online]",
    meetingTime: "Thursday Weekly (Zoom)",
  },
  {
    venue: "Beth [In Person]",
    meetingTime: "2nd & 4th Sunday @ 11:00am",
  },
  {
    venue: "Gimel (late 30’s) [Online]",
    meetingTime: "Friday Weekly @ 8:30pm",
  },
  {
    venue: "Hanan (early 30’s) [In Person]",
    meetingTime: "Friday Weekly @ 8:30pm",
  },
  {
    venue: "Hesed",
    meetingTime: "Tuesday Weekly @ 8:00pm",
  },
]

export const homeFellowshipColumns = [
  { header: "Venue", accessor: "venue" },
  { header: "Meeting Time", accessor: "meetingTime" },
]

export const homeFellowshipData = [
  {
    venue: "KL & Bangsar [In Person/Online]",
    meetingTime: "2nd Saturday @ 4:00pm (Zoom) / Occasionally In Person (at agreed venue)",
  },
  {
    venue: "Puchong [In Person]",
    meetingTime: "2 to 3 times a year (at agreed venue)",
  },
  {
    venue: "Subang / Section 5 [In Person/Online]",
    meetingTime: "Alternately on 2nd Tuesday: 8:00pm (Zoom) / 3:00pm (In Person at TMCPJ)",
  },
  {
    venue: "SS2 [In Person]",
    meetingTime: "1st Saturday @ 10:30am (at TMCPJ)",
  },
  {
    venue: "DU / TTDI",
    meetingTime: "1st Friday @ 8:00pm (Zoom) / In Person for special occasions",
  },
  {
    venue: "9B SS22 DJ [In Person]",
    meetingTime: "Saturday once a month (at agreed venue)",
  },
]
