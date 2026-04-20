import { ministryService } from "@/services/ministry-service"
import { CommunityEntity } from "./interface"

// Fallback data in case the database is empty or unreachable during development
export const STATIC_MINISTRIES: CommunityEntity[] = [
  {
    id: "boys-brigade",
    type: "ministry",
    slug: "boys-brigade",
    name: "Boys' Brigade",
    tagline: "1st Petaling Jaya Company",
    description: "The Boys' Brigade in Malaysia",
    photos: [
      "https://trinitypj.com/wp-content/uploads/Must-have.jpg",
      "https://trinitypj.com/wp-content/uploads/Must-have.jpg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-3.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-4.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-5.jpeg",
      "https://trinitypj.com/wp-content/uploads/good-to-have-6.jpeg",
      "https://trinitypj.com/wp-content/uploads/Good-to-have.jpeg",
      "https://trinitypj.com/wp-content/uploads/must-have-3.jpeg",
      "https://trinitypj.com/wp-content/uploads/Must-have-2.jpg",
      "https://trinitypj.com/wp-content/uploads/must-have-4.jpg",
    ],
    metadata: {
      theme_color: "blue",
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
          answer: "• Camping \n• Expeditions \n• Sports \n• Water Adventure \n• Trips Outings \n• Arts, Crafts & Hobbies",
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
    sort_order: 0,
    is_active: true,
    is_featured: false,
  },
  {
    id: "girls-brigade",
    type: "ministry",
    slug: "girls-brigade",
    name: "Girls' Brigade",
    tagline: "1st Petaling Jaya Company",
    description: "The Girls' Brigade in Malaysia",
    photos: [
      "https://trinitypj.com/wp-content/uploads/BB-GB-Enrolment-2018-26.jpg",
      "https://trinitypj.com/wp-content/uploads/BB-GB-Enrolment-2018-26.jpg",
      "https://trinitypj.com/wp-content/uploads/BB-GB-Enrolment-2018-42.png",
    ],
    metadata: {
      theme_color: "green",
      faqs: [
        {
          question: "The Aim of the Girls’ Brigade",
          answer:
            "The Aim of the The Girls’ Brigade, being a Christian organisation, international and interdenominational, shall be : To help girls to become followers of the Lord Jesus Christ, and through self-control, reverence and a sense of responsibility, to find true enrichment of life.",
        },
        {
          question: "What are the core beliefs and values of the Girls’ Brigade?",
          answer:
            "The Girls’ Brigade acknowledges Jesus Christ as Saviour and Lord according to the Scriptures and seeks to fulfil its aim to the glory of one God, Father, Son and Holy Spirit. The Brigade witnesses to the standard set by Jesus Christ and gives positive teaching on the Christian attitude to life. The Brigade promotes a just society where all people are equally valued.",
        },
        {
          question: "What does a typical Girls’ Brigade weekly programme look like?",
          answer:
            "• Roll Call \n• Singspiration \n• Devotion / Bible Study \n• Badge Work \n• Drill / Games \n• Dismissal",
        },
        {
          question: "What are the age groups in the Girls’ Brigade?",
          answer:
            "• Cadets : 6 – 8 years old \n• Juniors : 9 – 11 years old \n• Seniors : 12 – 14 years old \n• Pioneers : 15 – 21 years old",
        },
        {
          question: "Who can I contact for the Girls’ Brigade at Trinity Methodist Church Petaling Jaya?",
          answer:
            "Trinity Methodist Church Petaling Jaya \nAddress: 6 Jalan 5/37, 46000 Petaling Jaya \nTel: 03-79565989 \nEmail: admin@trinitypj.com \nWebsite: www.gbmalaysia.org \n\nCaptain Tan Hzu Fernn: 0163352303 \nAdvisor Chew Lee Fuang : 0162853028",
        },
        {
          question: "What is the Girls’ Brigade Four Square Programme?",
          answer:
            "The Four Square Programme covers everything done for and with the girls. It includes activities and projects of the church, the local community, the wider boundaries of Girls’ Brigade, as well as Company meetings. \nIt is built on four key areas: \n\n🌱 Spiritual Understanding Christian living through Scripture, seeing how faith works in others’ lives, and participating in church activities. \n\n📚 Educational Developing knowledge and skills, discovering meaningful activities and interests, and achieving personal growth. \n\n🤝 Social Learning about herself in relation to others and the community, being part of a team, working in small groups, serving the community, and gaining leadership training. \n\n🏃 Physical Building physical health and skills, learning self-care, and participating in games and physical activities.",
        },
        {
          question: "What is the history of the 1st Petaling Jaya Girls’ Brigade Company?",
          answer:
            "The 1st Petaling Jaya Girls’ Life Brigade (PJGLB) Company was started on November 1960 under the leadership of Mrs Khoo Onn Soo at Trinity Methodist Church Petaling Jaya (TMCPJ). At the time of its founding, there were about 23 girls and officers, 22 of them were from Kuala Lumpur and one girl from Petaling Jaya...",
        },
        {
          question: "What happened during the 1st Petaling Jaya Girls’ Brigade Enrolment Sunday in 2013?",
          answer:
            "The 1st Petaling Jaya Girls’ Brigade had their Enrolment Sunday on 28th April, 2013...",
        },
      ],
    },
    sort_order: 1,
    is_active: true,
    is_featured: false,
  },
  {
    id: "christian-education",
    type: "ministry",
    slug: "christian-education",
    name: "Christian Education",
    description:
      "The Christian Education Committee is entrusted with the functions and duties...",
    metadata: {
      theme_color: "green",
    },
    sort_order: 2,
    is_active: true,
    is_featured: false,
  },
  {
    id: "church-school",
    type: "ministry",
    slug: "church-school",
    name: "Church School",
    description:
      "We partner with local and international missions to reach the unreached and serve communities in need.",
    photos: [
      "https://trinitypj.com/wp-content/uploads/Church-School-1-min.png",
      "https://trinitypj.com/wp-content/uploads/Church-School-1-min.png",
      "https://trinitypj.com/wp-content/uploads/Church-School-2-min.png",
      "https://trinitypj.com/wp-content/uploads/2024-Church-School-schedule-Jan_June.png",
    ],
    metadata: {
      theme_color: "green",
      faqs: [
        {
          question: "Who can join the Church School and when are the classes held?",
          answer:
            "We welcome all children from 3-12 years old to join us! Our weekly Church School classes are from 11.00 am – 12.15pm. Check out our first-half calendar in the Pictures section.",
        },
        {
          question: "What is the vision of the Church School for children?",
          answer:
            "Every child to experience the love of God and to come to a knowledge of the truth in Jesus; and for each child to continue growing as a disciple of the Lord Jesus.",
        },
        {
          question: "What do children do in Church School each week?",
          answer:
            "• We learn Bible lessons using the engaging DiscipleLand curriculum which is designed by age. \n• We sing songs to worship God, We pray for one another and We grow in faith together. \n• We have fun together through our activities such Kids Connect, Games, Crafts, activities with external organizations, Christmas Parties and Vacation Bible School.",
        },
        {
          question: "Who can I contact for more information about the Church School?",
          answer:
            "Please contact our Church School Superintendent – Emily Thanasegaram at 012-3654075 or the Church Office for more info.",
        },
      ],
      pdf: {
        id: "church-school-announcement",
        src: "https://trinitypj.com/wp-content/uploads/CS-Annoucement_compressed.pdf",
        title: "Announcement",
      },
      disclaimer:
        "No person shall transfer, use, store, replicate or reproduce any data, photo, personal information or any data without prior consent and approval.",
      attachment: {
        id: "kid-sermon-lesson-materials",
        src: "https://drive.google.com/drive/folders/1f0VoZh3Lo-qVxkJ6NaMkMRt1SA_bui8o",
        title: "Kids’ sermon lesson materials",
      },
    },
    sort_order: 3,
    is_active: true,
    is_featured: false,
  },
  {
    id: "membership",
    type: "ministry",
    slug: "membership",
    name: "Church Membership",
    description:
      "To be a member of Trinity Methodist Church Petaling Jaya (TMC PJ) means pledging to work out one’s discipleship...",
    metadata: {
      faqs: [
        {
          question: "How can I become a member of the church?",
          answer:
            "Through one of three ways below: \n\n• By profession of faith \n• By confirmation/reaffirmation \n• By transfer (from another community of faith)...",
        },
        {
          question: "How does Infant and Children Baptism work in our church?",
          answer:
            "INFANT/CHILDREN BAPTISM (age 1 month – 13 years old) \n\nMethodist Churches in Malaysia practice children baptism...",
        },
        {
          question: "What are the duties and privileges of church membership?",
          answer:
            "In short, to be a member of the community of faith, we strongly encourage you to...",
        },
        {
          question: "How do I register or get more information about church membership?",
          answer:
            "All who are interested may send your request for the respective registration forms or further enquiries to membership@trinitypj.com or call the church office : 03-7956 5986/5872/5302",
        },
      ],
    },
    sort_order: 4,
    is_active: true,
    is_featured: false,
  },
  {
    id: "stewardship-finance",
    type: "ministry",
    slug: "stewardship-finance",
    name: "Stewardship & Finance",
    description:
      "The Stewardship and Finance committee, as per the Methodist Book of Discipline 2016, is entrusted to promote and cultivate Christian Stewardship.",
    metadata: {
      faqs: [
        {
          question: "What are the areas of stewardship?",
          answer:
            "• Possessions (eg House, Car) \n• Time \n• Money \n• Spiritual Gifts ie Our talents...",
        },
      ],
    },
    sort_order: 5,
    is_active: true,
    is_featured: false,
  },
  {
    id: "the-clarion",
    type: "ministry",
    slug: "the-clarion",
    name: "THE CLARION",
    tagline: "The official newsletter of the TMCPJ",
    description:
      "The Clarion is the official newsletter of the Trinity Methodist Church, Petaling Jaya (TMC PJ) and is published quarterly.",
    metadata: {
      faqs: [
        {
          question: "What is The Clarion and how can I contribute?",
          answer:
            "The Clarion will carry the Pastoral Message and lead articles on the theme according to the issue. There will be reports on the activities of the various ministries; home fellowships; testimonies of members in experiencing God; The Chinese Ministry; and announcements of births, marriages and those who have returned to the Lord.",
        },
      ],
      library: [
        {
          id: "the-clarion-2024",
          src: "https://drive.google.com/file/d/16QBSVUnuec8mprlcz3SvP0PNK46v4OQ8",
          title: "2024: A Renewed Church",
        },
        {
          id: "the-clarion-2023",
          src: "https://drive.google.com/file/d/1vyDKnlgQN_d99kIsb-u2ofKaejP9FjAI/view",
          title: "2023: See How God is Knitting Us, For His Glory!",
        },
        {
          id: "the-clarion-2022-2",
          src: "https://drive.google.com/file/d/1bX2zrb-dwfMC9BnPk3owdGOh08Px3z6T/view",
          title: "2022: Celebrating 63 Years of God's Faithfulness",
        },
        {
          id: "the-clarion-2022",
          src: "https://drive.google.com/file/d/1oPknYi-Cr58cBT9f6CeT5Q0PX4-xQ88d/view?usp=sharing",
          title: "2022: See, God Is Going to Do Something New This Year...",
        },
        {
          id: "the-clarion-2021-2",
          src: "https://drive.google.com/file/d/1mDGx1GlPGBGvghZVFS1V4FdlQR4egz47/view",
          title: "2021: Celebrating 62 Years of God's Faithfulness",
        },
        {
          id: "the-clarion-2021",
          src: "https://drive.google.com/file/d/1CM6JqUdQwASj25zkUGPbtJeF6Yc4g8mj/view?usp=sharing",
          title: "2021: Easter Brings Hope",
          thumb: "https://trinitypj.com/wp-content/uploads/Clarion-2021-Issue-1.png",
        },
      ],
    },
    sort_order: 6,
    is_active: true,
    is_featured: false,
  },
  {
    id: "oasis-centre",
    type: "ministry",
    slug: "oasis-centre",
    name: "TMC Oasis Lay Pastoral Care and Counselling Centre",
    description:
      "Weighed down by life’s challenges? Christian counselling is provided at the OASIS Centre.",
    sort_order: 7,
    is_active: true,
    is_featured: false,
    metadata: {}
  },
  {
    id: "visitations",
    type: "ministry",
    slug: "visitations",
    name: "Visitations",
    description:
      "Visiting the parishioners is a pivotal part of pastoral oversight in TMC PJ. Visitations are made on a weekly basis.",
    photos: ["https://trinitypj.com/wp-content/uploads/Visitations-Ministry.jpg"],
    sort_order: 8,
    is_active: true,
    is_featured: false,
    metadata: {}
  },
]

/**
 * Fetch ministries from the database.
 * Falls back to static data if no database records are found.
 */
export async function getMinistries() {
  try {
    const dynamicMinistries = await ministryService.getAll()

    if (dynamicMinistries && dynamicMinistries.length > 0) {
      return dynamicMinistries
    }

    console.warn(
      "[MINISTRIES_DATA] No dynamic ministries found, falling back to static data."
    )
    return STATIC_MINISTRIES
  } catch (error) {
    console.error("[MINISTRIES_DATA] Failed to fetch dynamic ministries:", error)
    return STATIC_MINISTRIES
  }
}
