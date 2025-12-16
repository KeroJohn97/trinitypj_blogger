"use client"

import ProgramDashboard from "@/components/program-dashboard"
import { MediaItem, StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { formatEmail } from "@/lib/helpers"
import { BookOpen, Calendar } from "lucide-react"
import { useState } from "react"

const items: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture1-1.png",
  },
  {
    id: "2",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture2-1.png",
  },
  {
    id: "3",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture3-1.png",
  },
  {
    id: "4",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture4.png",
  },
  {
    id: "5",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture5.png",
  },
  {
    id: "6",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/2016/03/Picture6.png",
  },
]

// Suggested Example Usage Data
const contact = {
  name: "Leong Sow Yoke",
  phone: "(+60)19-218 8832",
  email: "maf@trinitypj.com",
}

const activities = [
  {
    title: "MAF Bible Sharing",
    schedule: "Every Sat @ 2.30pm",
    icon: <BookOpen size={20} />,
    category: "weekly",
  },
  {
    title: "MAF Family Outing",
    schedule: "11 August",
    icon: <Calendar size={20} />,
    category: "special",
  },
  {
    title: "Silent Retreat with ICM",
    schedule: "26-28 October",
    icon: <Calendar size={20} />,
    category: "special",
  },
]

export default function AdultFellowshipPage() {
  const [lang, setLang] = useState("en")
  const t = (en: any, zh: any) => (lang === "en" ? en : zh)

  return (
    <div className="bg-background min-h-screen">
      {/* <!-- Hero Section --> */}
      <section
        className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://trinitypj.com/wp-content/uploads/2016/03/Picture4.png')` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 text-center text-white">
          <h1 className="text-4xl font-bold">Methodist Adult Fellowship</h1>
          <p className="mt-3 text-lg">
            To grow our faith and life in community with other Christians and be challenged to greater commitment and
            service in our church, our community and society
          </p>
        </div>
      </section>

      {/* <!-- Added animated photo gallery section --> */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              JOIN OUR ACTIVITIES
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Christians aged 31 to 60 who are members of the local church may join as ordinary members. Adults in the
              same age group who are not church members may join as associate members. Only ordinary members are
              permitted to vote or hold office
            </p>
          </div>
        </div>
      </section>

      <section className="mx-12">
        <div className="flex">
          {/* Purpose Card */}
          <section className="mb-6 flex-4 rounded-2xl bg-white p-6 shadow-md">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">{t("OUR VISION", "我们的宗旨")}</h2>
              <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                <li>
                  {t(
                    "“Light of the World, Salt of the Earth”",
                    "帮助妇女在认识神上成长，并藉着耶稣基督所启示的认识祂。"
                  )}
                </li>
                <li>
                  {t(
                    "Light of the World – We shall live exemplary, personal Christian lives with Jesus as our Lord, in the way we worship and pray, in the strength of our faith and in our faithfulness to Him. We shall shine God’s light so that others may come to receive Him.",
                    "挑战她们回应神的救赎团契，使基督的名传遍全世界。"
                  )}
                </li>
                <li>
                  {t(
                    "Salt of the Earth – We shall rise to the challenge of service in our church and the community we live in so that our Christian love can touch and affect lives positively.",
                    "培养对教会整体使命的个人担当。"
                  )}
                </li>
              </ol>
            </div>
          </section>
        </div>

        {/* Functions Card */}
        <section className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">{t("PROGRAMMES", "职能")}</h3>
            <p className="mb-3 text-slate-700">
              {t("To meet the objectives, we have developed programmes that:", "为达成宗旨，卫理公会妇女会将：")}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                {t(
                  "Encourage one another towards a deeper commitment to God and deepen our faith through regular study of Scriptures;",
                  "联合教会内的妇女一同服侍，"
                )}
              </li>
              <li>
                {t(
                  "Draw members closer to God through worship, praise, thanksgiving and prayer;",
                  "与世界卫理与联合教会妇女联合会携手，达成“认识基督并使祂为人所知”的使命，"
                )}
              </li>
              <li>
                {t(
                  "Establish awareness, sensitivity, care and concern towards the needy, underprivileged and marginalized in our society through short term sensitising projects and exposure trips;",
                  "与其他基督教妇女团体合作，推广普世合一的精神，"
                )}
              </li>
              <li>
                {t(
                  "Equip ourselves with the necessary skills of evangelism, counselling and discipleship to reach out to the churched and unchurched in our midst;",
                  "提供机会与资源，回应妇女的需要与兴趣，"
                )}
              </li>
              <li>
                {t(
                  "Facilitate the experience of the God-given warmth, love and care and the responsibility for one another as a Body of Christ through regular meetings for fellowship and prayer.",
                  "招募工人并筹募经费，支持本地与海外的教会宣教。"
                )}
              </li>
            </ul>
          </div>

          {/* Activities Summary */}
          <div className="rounded-2xl bg-linear-to-b from-white to-emerald-50 p-6 shadow-md">
            {/* Monthly */}

            <div className="flex items-start gap-4">
              <div>
                <h4 className="text-lg font-semibold">{t("BIG MEETS", "每月活动")}</h4>
                <p className="mt-2 text-slate-700">
                  {t(
                    "MAF organises Big Meets where members come together for a time of fellowship and often with an invited speaker to share on specific topics. Big Meets are held at Trinity Methodist Church, PJ’s church hall and start with high tea at 3.15 pm.  Typically, this will following with praise and worship, testimonies from fellow members or inspiring sermons delivered by selected speakers.",
                    "我们在每月第三个星期六下午3时聚会。月会内容包括受邀讲员就妇女相关议题分享、探访居家人士、外出活动与福音事工。"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-linear-to-b from-white to-emerald-50 p-6 shadow-md">
            {/* Monthly */}
            <div>
              <h4 className="text-lg font-semibold">
                {t("Bible Sharing/Prayer on Bible Understanding and Spiritual Formation", "每月活动")}
              </h4>
              <p className="mt-2 text-slate-700">
                {t(
                  "MAF comes together monthly for a time of bible sharing and prayer. This is usually held on Saturday mornings. Due to the ongoing church redevelopment, the venue may change from time to time, depending on the availability of rooms.",
                  "我们在每月第三个星期六下午3时聚会。月会内容包括受邀讲员就妇女相关议题分享、探访居家人士、外出活动与福音事工。"
                )}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-linear-to-b from-white to-emerald-50 p-6 shadow-md">
            {/* Monthly */}
            <div>
              <h4 className="text-lg font-semibold">{t("How I can help/discover my gifts", "每月活动")}</h4>
              <p className="mt-2 text-slate-700">
                {t(
                  "There are various sub-committees in MAF that you may wish to participate in.  You could discover the special role God wants/needs you to play in your Christian living.  These include Worship, Social Concerns, Faith, Witness/Evangelism, Fellowship, Prayer and Publicity.",
                  "我们在每月第三个星期六下午3时聚会。月会内容包括受邀讲员就妇女相关议题分享、探访居家人士、外出活动与福音事工。"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">{t("Contact Persons", "职能")}</h3>
            <p className="mb-3 text-slate-700">
              {formatEmail(
                t(
                  "Please email to maf@trinitypj.com or contact Mr Leong (019-218 8832) for further information",
                  "为达成宗旨，卫理公会妇女会将："
                )
              )}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">{t("Subscription", "职能")}</h3>
            <p className="mb-3 text-slate-700">
              {formatEmail(
                t(
                  "Annual membership fee is RM30 (inclusive of MAF T-shirt for NEW members only). Please send an email to maf@trinitypj.com if you need a Membership Form",
                  "为达成宗旨，卫理公会妇女会将："
                )
              )}
            </p>
          </div>
        </section>

        <div className="mb-6">
          <StaggeredMediaGallery items={items} />
        </div>
        <ProgramDashboard contact={contact} activities={activities} />
      </section>

      <p className="mb-16"></p>
    </div>
  )
}
