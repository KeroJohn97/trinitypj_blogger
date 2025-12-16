import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { VerseCard } from "@/components/verse-card"

export default function MissionsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Missions"
        subtitle="Methodists are a happening people! Involved, committed, diverse and open; a people who try to be accepting, caring, hospitable and inclusive. Family and community oriented. A people who are concerned for those beyond their own communities and around the world. Active in missions and responsive whether in prayer or financial partnership or in good works. A people who love God and who reaches out to include others in God’s redeeming grace."
      />

      {/* Project Overview */}
      <section className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 items-start gap-12">
            <div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                Missions Ministry Responsibilities
              </h3>
              <div className="prose prose-lg text-muted-foreground">
                <p>1. To disseminate Missions information and create church wide awareness;</p>
                <p>2. To study local community needs and recommend missions projects;</p>
                <p>3. To study overseas missions needs and recommend for local church participation and involvement;</p>
                <p className="mb-4">
                  4. To involve church wide participation in missions and encourage missionaries to venture into
                  Missions Projects.
                </p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">Mission Statement</h3>
              <div className="prose prose-lg text-muted-foreground">
                <VerseCard
                  reference="Matthew 5:13-14 (NIV)"
                  verse="You are the salt of the earth, But if the salt loses its saltiness, how can it be made salty again?
                  It is no longer good for anything, except to be thrown out and trampled by men. You are the light of
                  the world. A city on a hill cannot be hidden"
                />
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">Core Missions Projects</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  The Methodists are a happening people! Involved, committed, diverse and open; a people who try to be
                  accepting, caring, hospitable and inclusive. Family and community oriented. A people who are concerned
                  for those beyond their own communities and around the world. Active in missions and responsive whether
                  in prayer or financial partnership or in good works. A people who love God and who reaches out to
                  include others in God’s redeeming grace.
                </p>
                <p className="mb-4">Below are some of the many ministries and what we have done thus far:</p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">1. Serundong Laut in Sabah</h3>
              <div className="prose prose-lg text-muted-foreground mb-4">
                <p className="mb-4">
                  Serundong Laut is a village situated in the district of Tawau in Sabah. It is accessible by river with
                  the boat journey taking three hours from Tawau town. The community in Serundong Laut consist of
                  indigenous people of the tribes of Muruts and Tidungs numbering about 320 in total. The villagers lack
                  basic amenities, have poor living conditions and education level. The focus of Missions in Serundong
                  Laut is :
                </p>
                <p>• Education (kindergarten, English, mathematics and health science)</p>
                <p>• Improving living conditions</p>
                <p>• Emphasis on clean water supply</p>
                <p>• Medical treatments</p>
                <p>• Living skills</p>
                <p>• Sharing/Fellowship/Praise & Worship/Music Ministry</p>
                <p className="mb-4">• Support for the local pastors</p>
                <p>The ultimate aim of our mission in Serundong Laut is to spread the GOOD NEWS!!</p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">2. Lower Myanmar</h3>
              <div className="prose prose-lg text-muted-foreground mb-4">
                <p className="mb-4">
                  Myanmar was devastated by Cyclone Nargis in May 2008 and large parts of the country were decimated.
                  The population in Myanmar were reduced to living hand to mouth as international aid could not reach
                  some parts of the country.
                </p>
                <p className="mb-4">
                  In 2009 when TMCPJ partnered TRAC and the Methodist HQ to explore the possibility of setting up
                  missions fields near Yangon, the process of rebuilding the infrastructure in Myanmar was on-going but
                  slow.
                </p>
                <p>
                  A TMCPJ missions team was sent to Lower Myanmar on a fact-finding mission and to explore the setting
                  up of the missions fields. Our missions work in Lower Myanmar is on-going and we hope to involve
                  church wide participation on a longer term basis in our outreach programmes there for 2012.
                </p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">3. Sengoi (Gopeng, Kampar & Raub)</h3>
              <div className="prose prose-lg text-muted-foreground mb-4">
                <p className="mb-4">
                  TMCPJ is involved in the missions work for the Sengoi people in Gopeng, Kampar and Raub. A community
                  hall was built in Kampung Jelintuk, Gopeng and the consecration of the hall was carried out by the
                  TRAC President, Rev Dr Ong Hwai Teik.
                </p>
                <p>
                  The Sengoi Missions Conference in Kampar which oversees Gopeng is ably led by Pendeta Bah Uda and his
                  ministry staff. TMCPJ is now exploring the possibility of pastoral training in partnership with the
                  Sengoi Missions Conference for these dedicated ministry staff so as to enable them to reach out
                  effectively to the Sengois.
                </p>
                <p>
                  The Sengois in Raub has been living in poverty and our mission there would be to ensure that they are
                  properly equipped with living skills.
                </p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                4. Protestant Church in Sabah (PCS) at Shah Alam
              </h3>
              <div className="prose prose-lg text-muted-foreground mb-4">
                <p className="mb-4">
                  PCS consists mainly of the Rungus tribe based in Sabah. The PCS had set up a branch in Shah Alam for
                  worship on Sundays. TMCPJ partners PCS in some of its programmes. TMCPJ has also sponsored Bibles and
                  assisted in the rewiring of the electrical cables and supply of ceiling and wall fans in the Shah Alam
                  church.
                </p>
              </div>
              <h3 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">5. Thai-Myanmar border</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  In early 2010, our Missions Committee member and church member, Janice Tay left for the Thai-Burmese
                  border as a missionary worker under OM. Over there, she was mainly involved with the children’s
                  ministry and had clearly touched the lives of the local community through her sharing and fellowship.
                </p>
                <p className="mb-4">Missions Night (“Malam Muhibbah”)</p>
                <p>
                  For the past couple of years, the Missions Committee had organised Missions Night or “Malam Muhibbah”
                  on the first Saturday of August where our Mission partners from Sengoi (Kampar and Raub), PCS,
                  Serundong Laut and Myanmar were invited for the event. The rich cultural diversity was really apparent
                  where the participants were mostly garbed in their traditional costumes and presented skits and native
                  dances to the delight of church members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
