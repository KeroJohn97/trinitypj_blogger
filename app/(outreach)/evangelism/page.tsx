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
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/20190608-Alpha-Celebration-1-4.jpg",
  },
  {
    id: "2",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/20190608-Alpha-Celebration-1-6.jpg",
  },
  {
    id: "3",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/20190608-Alpha-Celebration-1-20.jpg",
  },
  {
    id: "4",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/20190608-Alpha-Celebration-1-45.jpg",
  },
  {
    id: "5",
    type: "image",
    src: "https://trinitypj.com/wp-content/uploads/20190608-Alpha-Celebration-1-61.jpg",
  },
]

export default function EvangelismPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Evangelism Ministry"
        subtitle="Evangelising is obeying the commandments of the Lord as found in Matthew 28:19-20, “Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."
        backgroundType="gradient"
        colorScheme="warm"
      />

      {/* Project Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 items-start gap-12">
            <div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                HOW DO WE EVANGELISE<span className="text-destructive">?</span>
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-8">
                  When we evangelise, we are doing God’s Kingdom work and when we do God’s work, it is not our doing but
                  the Holy Spirit doing great things in and through us. In humility and with an open heart, we must seek
                  God’s power and purposes before we start to evangelise. We use the Alpha Course as a tool to
                  evangelise and we have seen so many pre-believers being saved by God’s loving grace while those who
                  are already believers have been spiritually lifted by His grace and mercy.
                </p>
              </div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                WHAT HAPPENS AFTER WE EVANGELISE<span className="text-destructive">?</span>
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Those who received salvation will testify for our Lord Jesus Christ. The boldness to do so empowers
                  them to take the step of faith by joining the baptism course.
                </p>
                <p className="mb-4">
                  The start of this journey helps them to know more of our Lord Jesus Christ and His Holy Word. We also
                  see them obeying God’s Word by serving Him in Alpha. The Alpha team too learns how to pray (to
                  communicate with our Lord Jesus) as we come together to pray before each Alpha session starts. When we
                  pray together it builds unity in one Spirit, one Lord, and one God faithfully.
                </p>
                <p className="mb-8">
                  The prayer session also helps us individually to develop our personal relationship with our Lord. We
                  are very much encouraged to pray without ceasing when God answers our prayers for participants to come
                  and receive our Lord Jesus as their personal Lord and Saviour.
                </p>
              </div>
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                WHAT IS THE EVANGELISM TEAM LIKE<span className="text-destructive">?</span>
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  We are seeing more young members joining us in this ministry and we are happy to groom them in areas
                  which they are gifted in. We journey together as a team and encourage one another in service to our
                  Almighty God. The unity of the team is very important and everyone in the team is given a task each
                  time we run Alpha. Those who are unable to physically join us in the team are entrusted to be our
                  prayer intercessors.
                </p>
                <p className="mb-4">
                  We will continute to groom the younger ones, encourage each other, pray for one another and get
                  everyone in the team to be involved in one way or another whenever we have a task or event. The joy of
                  serving must not only remain within the Alpha team – we pray for God to send more workers to the
                  harvest field and together we will give Him all the praise and glory! We will unitedly obey His
                  commands, put on the armour of God and evangelise to those who have yet to know Him and receive His
                  salvation!
                </p>
                <p className="mb-4">
                  If you have the passion to serve in the Evangelism Ministry, please feel free to contact any person in
                  the Evangelism Committee or you can email evangelism@trinitypj.com.
                </p>
                <p className="mb-4">
                  <span className="text-red-700">2 Peter 3:18</span> “To Him be the glory both now and forever!” Amen.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-6">
            {/* Row of images */}
            <div className="flex gap-4">
              {/* Large image */}
              <div className="flex-1">
                <div className="relative aspect-4/3 overflow-hidden rounded-md">
                  <img
                    src="https://trinitypj.com/wp-content/uploads/Evangelism-Committee-2019.jpg"
                    alt="Evangelism Committee 2019"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-m mt-2 text-gray-600 italic">
                  Seated L to R: Jennifer Tiong, Jeanne Cheong, Coreen So, Suzzane Tan, Ong Su Leh and Lai Yen Choo.
                  Standing L to R: Tan Ean Chye, Lim Say Thean, Samuel Yeoh, Tan Hock Wah, Rick So, Joshua Cheong,
                  Jabaraj Vincent and Julius Yap.
                </p>
              </div>

              {/* Smaller image */}
              <div className="w-48">
                {" "}
                {/* adjust width to make it smaller */}
                <div className="relative aspect-4/3 overflow-hidden rounded-md">
                  <img
                    src="https://trinitypj.com/wp-content/uploads/Evangelism-Committee-Paul-Hor.jpg"
                    alt="Evangelism Committee - Paul Hor"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-m mt-2 text-gray-600 italic">Mr. Paul Hor</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <StaggeredMediaGallery items={items} />
          </div>

          <div className="flex w-full justify-center">
            <img
              src="https://trinitypj.com/wp-content/uploads/Alpha-2019-1.jpg"
              alt="Alpha Course"
              className="w-1/3 object-cover"
            />
          </div>

          {/* Support CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">Join Us Now</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                Drop us an email at alpha@trinitypj.com to register your interest!
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
