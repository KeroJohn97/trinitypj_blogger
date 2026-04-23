"use client"

import methodistWomen from "@/../assets/methodist-women.webp"
import { useState } from "react"

export default function MethodistWomenPage({ isNested = false }: { isNested?: boolean }) {
  const [lang, setLang] = useState("en")
  const t = (en: any, zh: any) => (lang === "en" ? en : zh)

  return (
    <div className={isNested ? "" : "bg-background min-h-screen"}>
      {/* <!-- Hero Section --> */}
      {!isNested && (
        <section
          className="relative flex h-[60vh] items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${methodistWomen.src})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative px-6 text-center text-white">
            <h1 className="text-4xl font-bold">Methodist Women</h1>
            <p className="mt-3 text-lg">To Know Christ and to Make Him Known</p>
          </div>
        </section>
      )}

      {/* <!-- Added animated photo gallery section --> */}
      <section id="animated-gallery" className="bg-card overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              JOIN OUR ACTIVITIES
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Any woman who is a member of a church may become a member of the MW if she accepts its purpose and is
              willing to participate in our work through prayer, service and gifts.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-12">
        <div className="flex">
          {/* Purpose Card */}
          <section className="mb-6 flex-4 rounded-2xl bg-white p-6 shadow-md">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">{t("OUR PURPOSE", "我们的宗旨")}</h2>
              <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                <li>
                  {t(
                    "To help women grow in the knowledge of God and experience Him as revealed through Jesus Christ,",
                    "帮助妇女在认识神上成长，并藉着耶稣基督所启示的认识祂。"
                  )}
                </li>
                <li>
                  {t(
                    "To challenge them to respond to God’s redemptive fellowship to make Christ known throughout the world,",
                    "挑战她们回应神的救赎团契，使基督的名传遍全世界。"
                  )}
                </li>
                <li>
                  {t(
                    "To develop a personal responsibility for the whole task of the Church.",
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
            <h3 className="mb-3 text-xl font-semibold">{t("FUNCTIONS", "职能")}</h3>
            <p className="mb-3 text-slate-700">
              {t(
                "In order to carry out our purpose, the Methodist Women (MW) shall:",
                "为达成宗旨，卫理公会妇女会将："
              )}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>{t("Unite women of the Church in service,", "联合教会内的妇女一同服侍，")}</li>
              <li>
                {t(
                  "Join hands with the World Federation of Methodist and Uniting Church Women “To Know Christ and Make Him known”,",
                  "与世界卫理与联合教会妇女联合会携手，达成“认识基督并使祂为人所知”的使命，"
                )}
              </li>
              <li>
                {t(
                  "Co-operate with other Christian women’s groups to spread the spirit of ecumenicity,",
                  "与其他基督教妇女团体合作，推广普世合一的精神，"
                )}
              </li>
              <li>
                {t(
                  "Provide opportunities and resources to meet the needs and interest of women,",
                  "提供机会与资源，回应妇女的需要与兴趣，"
                )}
              </li>
              <li>
                {t(
                  "Enlist workers and secure funds for the mission of the Church at home and overseas.",
                  "招募工人并筹募经费，支持本地与海外的教会宣教。"
                )}
              </li>
            </ul>
          </div>

          {/* Activities Summary */}
          <div className="rounded-2xl bg-linear-to-b from-white to-emerald-50 p-6 shadow-md">
            {/* Monthly */}

            <div className="flex items-start gap-4">
              <div className="mt-1 flex-none">
                <svg
                  className="h-10 w-10 text-sky-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <h4 className="text-lg font-semibold">{t("MONTHLY ACTIVITIES", "每月活动")}</h4>
                <p className="mt-2 text-slate-700">
                  {t(
                    "We meet every 3rd Saturday of the month at 3.00 pm. Monthly programmes include talks/sharing by invited speakers on issues relevant to women, visits to the homebound, outings and evangelistic activities.",
                    "我们在每月第三个星期六下午3时聚会。月会内容包括受邀讲员就妇女相关议题分享、探访居家人士、外出活动与福音事工。"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <h4 className="mb-3 text-lg font-semibold">{t("WEEKLY ACTIVITIES", "每周活动")}</h4>

            <div className="space-y-4">
              <article className="rounded-lg border p-4">
                <h5 className="font-semibold">{t("Manna Sessions", "祷告聚会")}</h5>
                <p className="mt-1 text-sm text-slate-600">
                  {t(
                    "We come together to pray for the country, the Church, those in need and one another.",
                    "我们一同为国家、教会、有需要的人及彼此祷告。"
                  )}
                </p>
                <dl className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
                  <div>
                    <strong>{t("Venue", "地点")}:</strong> {t("Sanctuary Annex", "礼拜堂附楼")}
                  </div>
                  <div>
                    <strong>{t("Day", "日期")}:</strong>{" "}
                    {t("Every Wednesday (except public holidays)", "每星期三（政府假期除外）")}
                  </div>
                  <div>
                    <strong>{t("Time", "时间")}:</strong> 10.00 am
                  </div>
                </dl>
              </article>

              <article className="rounded-lg border p-4">
                <h5 className="font-semibold">{t("Handicraft Session", "手作活动")}</h5>
                <p className="mt-1 text-sm text-slate-600">
                  {t(
                    "We come together for a time of fellowship, while learning to make beautiful items for sale. Funds raised are for worthy projects.",
                    "我们在团契中一同学习制作手工艺品出售，筹得的款项用于有价值的项目。"
                  )}
                </p>
                <dl className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
                  <div>
                    <strong>{t("Venue", "地点")}:</strong> {t("Conference Room B", "会议室 B")}
                  </div>
                  <div>
                    <strong>{t("Day", "日期")}:</strong>{" "}
                    {t("Every Friday (except public holidays)", "每星期五（政府假期除外）")}
                  </div>
                  <div>
                    <strong>{t("Time", "时间")}:</strong> 10.00 am – 12.00 noon
                  </div>
                </dl>
              </article>

              <article className="rounded-lg border p-4">
                <h5 className="font-semibold">{t("Home Helpers Ministry", "家护事工")}</h5>
                <p className="mt-1 text-sm text-slate-600">
                  {t(
                    "We teach migrant female workers from other countries English using the Bible. We also pray for them and help them deal with the challenges of living in Malaysia.",
                    "我们以圣经教授外籍女工英文，并为她们祷告，协助她们面对在马来西亚生活的挑战。"
                  )}
                </p>
                <dl className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
                  <div>
                    <strong>{t("Venue", "地点")}:</strong> {t("Kindergarten Office", "幼儿园办公室")}
                  </div>
                  <div>
                    <strong>{t("Day", "日期")}:</strong> {t("Every Sunday", "每星期日")}
                  </div>
                  <div>
                    <strong>{t("Time", "时间")}:</strong> 8.30 am – 10.00 am
                  </div>
                </dl>
              </article>
            </div>
          </div>
          <div className="flex justify-center rounded-2xl bg-white p-6 shadow">
            <img
              src="https://trinitypj.com/wp-content/uploads/2016/03/MW-Connections.png"
              alt="Methodist Women Connections Chart"
              className="max-h-full max-w-full object-contain"
            ></img>
          </div>
        </section>
        <section className="my-6 flex w-full justify-center">
          <img
            src="https://trinitypj.com/wp-content/uploads/2016/03/MW-Partnerships.png"
            alt="Methodist Women Partnerships Chart"
            className="h-auto w-full max-w-4xl object-contain"
          />
        </section>
        <section className="mx-auto my-12 max-w-3xl rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-bold">Contact & Events</h2>
          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">Contact</h3>
            <p className="text-slate-700">Betty Tan</p>
            <p className="text-slate-700">012.221.8982 / mw@trinitypj.com</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">Handicraft Session</h3>
            <p className="text-slate-700">Every Friday @ 10.00am (will resume on 9th Mar) (except public holidays)</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">Home Helpers Ministry</h3>
            <p className="text-slate-700">Every Sunday @ 9.00am</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">MW Annual Food Sale</h3>
            <p className="text-slate-700">29th July, After Church Service</p>
            <p className="text-slate-700">Venue: Corridor towards Podium</p>
          </div>
        </section>
      </section>

      <p className="mb-16"></p>
    </div>
  )
}
