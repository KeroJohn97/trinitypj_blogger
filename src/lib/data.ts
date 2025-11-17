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
    id: "boys-brigade",
    name: "Boys' Brigade",
    tagline: "1st Petaling Jaya Company",
    color: "blue",
    description: "The Boys' Brigade in Malaysia",
    photos: [
      "https://trinitypj.com/wp-content/uploads/good-to-have-3.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-4.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-5.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-6.jpeg",
      "https://trinitypj.com/wp-content/uploads/Good-to-have.jpeg",
      "https://trinitypj.com/wp-content/uploads/must-have-3.jpeg",
      "https://trinitypj.com/wp-content/uploads/Must-have-2.jpg",
      "https://trinitypj.com/wp-content/uploads/must-have-4.jpg",
      "https://trinitypj.com/wp-content/uploads/Must-have.jpg",
    ],
    faqs: [
      {
        question: "What is the Boys' Brigade?",
        answer:
          "The Boy's Brigade (BB) is the first uniformed youth organisationin the world, spreading over 60 countries. Sir William Alexander Smith founded the BB in 1883, modelling it on the concept of drill and discipline.",
      },
      {
        question: "How does the Boys' Brigade work?",
        answer:
          "The BB movement in Malaysia is made of more than 100 companies in different geographical areas. Members are divided into different sections of the Company.",
      },
      {
        question: "What are the age groups in the Boys’ Brigade?",
        answer:
          "•Pre-Junior Section (ages 6-8) \n•Junior Section (ages 9-12) \n•Senior Section (ages 13-19) \n\nMembers are supervised by a group of volunteer officers, many of whom were Members themselves.",
      },
      {
        question: "Why should you join the Boys' Brigade?",
        answer:
          "The BB gives young Boys like you the chance to make most out of youtr teenage life and not just having a boring life. The BB gives you the chance to have lots of different experiences, all for your own good! \n\nBB will also equip you for National Service!",
      },
      {
        question: "What do we do at the Boys' Brigade?",
        answer:
          "The Brigade's weekly activities range from Bible study, drill, games, brass band and a badge work syllabus that trains the memberss in various aspects of physical, social, educational and spiritual growth. \n\nIn addition, companies also organise special programmes from time to time to provide Members with an enjoyable and educational time.",
      },
      {
        question: "What fun activities can I join in BB?",
        answer: "•Camping \n•Expeditions \n•Sports \n•Water Adventure \n•Trips Outings \n•Arts, Crafts & Hobbies",
      },
      {
        question: "How can I join the Boys' Brigade?",
        answer:
          "The Boys' Brigade is open to all Boys aged from 6 to 19. Come and join us today and have the best experience of your life!",
      },
      {
        question: "When and where does the Boys’ Brigade meet each week?",
        answer:
          "The details of our weekly meetings are as follows: \n\nDay: Saturdays \nTime: 2.30pm to 5.30pm \nVenue: Trinity Methodist Church Petaling Jaya",
      },
      {
        question: "Who can I contact for more information about the Boys’ Brigade?",
        answer: "For more information, please contact: \nMr Jason Tan @ 017-364 6254",
      },
    ],
  },
  {
    id: "girls-brigade",
    name: "Girls' Brigade",
    tagline: "1st Petaling Jaya Company",
    color: "green",
    description:
      "The Girls' Brigade in Malaysia",
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
