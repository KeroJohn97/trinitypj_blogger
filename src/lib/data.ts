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

export const ministries = [
  {
    id: "worship",
    name: "Worship & Creative Arts",
    tagline: "Leading hearts into His presence",
    color: "red",
    description:
      "Our Worship Ministry is passionate about creating spaces where people can encounter God through music, media, and the arts.",
    photos: ["https://trinitypj.com/wp-content/uploads/must-have-4.jpg"],
    faqs: [
      {
        question: "Who can join?",
        answer: "Anyone with a heart for worship — singers, musicians, and tech team members are welcome.",
      },
      {
        question: "When do we serve?",
        answer: "We serve every Sunday and during special church events.",
      },
    ],
  },
  {
    id: "boys-brigade",
    name: "Boys Brigade",
    tagline: "Raising a generation for Christ",
    color: "blue",
    description:
      "The Youth Ministry is a vibrant community where teenagers grow in faith, build friendships, and discover their purpose in God.",
    photos: ["https://trinitypj.com/wp-content/uploads/BB-GB-Enrolment-2018-42.png"],
  },
  {
    id: "missions",
    name: "Missions & Outreach",
    tagline: "Extending God’s love beyond our walls",
    color: "green",
    description:
      "We partner with local and international missions to reach the unreached and serve communities in need.",
    photos: ["https://trinitypj.com/wp-content/uploads/Visitations-Ministry.jpg"],
  },
  {
    id: "sss",
    name: "Hello World",
    tagline: "Extending Redalds for sure",
    color: "green",
    description:
      "We partner with local and international missions to reach the unreached and serve communities in need.",
    photos: ["https://trinitypj.com/wp-content/uploads/Visitations-Ministry.jpg"],
  },
  {
    id: "aaa",
    name: "Something funny",
    tagline: "Gpod gafasd es",
    color: "green",
    description:
      "We partner with local and international missions to reach the unreached and serve communities in need.",
    photos: ["https://trinitypj.com/wp-content/uploads/Visitations-Ministry.jpg"],
  },
]
