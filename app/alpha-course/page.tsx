import { ExpandableArticle } from "@/components/expandable-article"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { MediaItem, StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { Card, CardContent } from "@/components/ui/card"
import DropEmailButton from "app/app-components/drop-email-button"
import { Mail } from "lucide-react"

const items: MediaItem[] = [
  {
    id: "1",
    type: "video",
    youtubeId: "Un4kKyjmw44",
  },
  {
    id: "2",
    type: "video",
    youtubeId: "9ib_IOjNMJs",
  },
  {
    id: "3",
    type: "video",
    youtubeId: "oWsRQ7MwQbg",
  },
  {
    id: "4",
    type: "video",
    youtubeId: "Fv2f4-Fact0",
  },
  {
    id: "5",
    type: "video",
    youtubeId: "FrC5WBP5HHQ",
  },
  {
    id: "6",
    type: "video",
    youtubeId: "hTDq8A-J0RE",
  },
  {
    id: "7",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/Alpha-Online-2020-1.png",
  },
  {
    id: "8",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/Alpha-Online-2020-2-1.png",
  },
]

const advertisingItems: MediaItem[] = [
  {
    id: "9",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/alpha2025_16-9ppt_eng-01-2048x1151.jpg",
  },
  {
    id: "10",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/alpha2025_16-9ppt_chn-01-2048x1151.jpg",
  },
  {
    id: "11",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/alpha2025_16-9ppt_malay-01-2048x1151.jpg",
  },
]

const projectImages = [
  {
    id: "1",
    src: "/church-sanctuary-renovation-before.jpg",
    alt: "Sanctuary before renovation",
    title: "Before Renovation",
    description: "Our beloved sanctuary before the restoration project",
  },
  {
    id: "2",
    src: "/church-sanctuary-construction-progress.jpg",
    alt: "Construction in progress",
    title: "Work in Progress",
    description: "Restoration work currently underway",
  },
  {
    id: "3",
    src: "/church-sanctuary-architectural-plans.jpg",
    alt: "Architectural plans",
    title: "Design Plans",
    description: "Architectural drawings for the new sanctuary",
  },
  {
    id: "4",
    src: "/church-volunteers-construction-work.jpg",
    alt: "Volunteers helping",
    title: "Community Effort",
    description: "Church members volunteering their time and skills",
  },
  {
    id: "5",
    src: "/church-sanctuary-new-features.jpg",
    alt: "New sanctuary features",
    title: "Modern Features",
    description: "Updated lighting and sound systems",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Worship space vision",
    title: "Vision Realized",
    description: "The completed sanctuary ready for worship",
  },
]

export default function SanctuaryProjectPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Alpha Course"
        subtitle="Alpha is a series of interactive sessions that explore the basics of the Christian faith"
        backgroundType="gradient"
        colorScheme="warm"
      />

      {/* Project Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">WHO’S IT FOR?</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Alpha is for anyone who’s curious to explore the big questions of life, faith and meaning. The videos
                  are designed to encourage conversation and explore the Christian faith in a friendly, open and
                  informal environment.
                </p>
              </div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">HOW DOES IT WORK?</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Typically run over twelve weeks and ends with a celebration. No two Alphas look the same, but
                  generally they have three key things in common: food (except for Alpha Online), a short video and a
                  discussion where you can share your thoughts. There’s no pressure and no follow up.
                </p>
              </div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">HOW MUCH IS IT?</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">There’s no charge for Alpha.</p>
              </div>
            </div>
            <div className="relative">
              <ExpandableArticle previewHeight={400}>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-foreground mb-6 text-2xl font-bold">Alpha: A Journey of Faith</h3>
                    <div className="prose prose-lg text-muted-foreground">
                      <p className="mb-4">
                        Trinity Methodist Church PJ has been running Alpha for many years. Alpha has brought many people
                        to the salvation grace of our Lord Jesus Christ. Alpha also gives opportunities to people to
                        serve God with the many gifts and talents which He has uniquely given to individuals. Each year,
                        the Alpha team sees the miracles which God performs in the participants’ lives and this brings
                        them back to serve God in Alpha, year after year. Alpha puts us in the right course of our
                        Christian walk and the journey through Alpha strengthens our love, faith and reliance on the
                        Holy Spirit through the unity of the spirit with one another and prayer.
                      </p>
                      <p className="mb-4">
                        At the beginning of this year, as the Covid-19 pandemic brought a halt to our running of Alpha
                        in church, we thank God for being able to share the gospel through Alpha Online (AO). In unity
                        of Spirit, the AO team was set-up and we started our first AO session on Aug 15, 2020 using the
                        Zoom platform. We had an average attendance of 16 participants with 6 pre-believers on board.
                        Our AO team consists of 14 persons – 4 hosts, 5 helpers, 2 prayer warriors and 3 handling main
                        room functions.
                      </p>
                      <p className="mb-4">
                        It was amazing how we saw 1 participant come to the saving grace of Christ after the video –
                        “How can I have faith?” and another 2 participants accepted salvation after the video on “How
                        does God guide us?” The weekend away was a 2.5-hour journey and we saw 3 participants accepted
                        our Lord Jesus Christ as their Lord and Saviour. We praise God when we saw the amazing works of
                        the Holy Spirit administering to the 6 participants who weren’t believers when they started the
                        AO journey and those who were Christians re-dedicated their lives to Jesus Christ.
                      </p>
                      <p className="mb-4">
                        AO just concluded on Nov 14, 2020 with celebration and testimonies. The Alpha F&B sisters
                        contributed home made and specially ordered cakes, cookies, scones, sweet and savoury stuff.
                        These yummy stuffs were delivered to all AO participants and the AO team too, in a nice goody
                        bag on Nov 14. We thank God that the goody bags were delivered in good order to all. Everyone
                        enjoyed the goodies and the testimonies shared were inspiring and encouraging to all. We give
                        thanks and praise to our Almighty God for His blessings in this AO.
                      </p>
                      <p className="mb-4">
                        Alpha is a journey for those who come with humble and prepared hearts, be it one who serves or
                        as participants. It is a journey where the AO team prepares for the topic but leaves the rest to
                        the work of the Holy Spirit. And for the participants, it is also for the Holy Spirit to work in
                        their lives. We thank God for giving us this platform to spread the gospel and to point people
                        to Jesus Christ who made it possible for us to have eternal life. We learned not to
                        under-estimate the power of the Holy Spirit and we saw this so real in our first journey of AO
                        and for sure, it will not be our last.
                      </p>
                      <p className="mb-4">
                        Let us continue to grow in the grace and knowledge of our Lord and Saviour Jesus Christ. To Him
                        be glory both now and forever! Amen. 2 Peter 3:18
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableArticle>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">Alpha's Journey</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Hear from our community members about the impact of the restoration project
              </p>
            </div>
            <StaggeredMediaGallery items={items} />
          </div>
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-8 text-3xl font-bold lg:text-4xl">Available in 3 Languages</h2>
              <StaggeredMediaGallery items={advertisingItems} />
            </div>
          </div>

          {/* Support CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Show Your Interest</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                Want to make sure you don’t miss the next Alpha Online program? Drop us an email at alpha@trinitypj.com
                to register your interest!
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <DropEmailButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
