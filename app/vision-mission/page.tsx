import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"

const visionImages = [
  {
    id: "1",
    src: "/church-outreach.png",
    alt: "Community service outreach",
    title: "Serving Others",
    description: "Reaching out to our community with love and service",
  },
  {
    id: "2",
    src: "/church-worship-praise-hands-raised.jpg",
    alt: "Worship and praise",
    title: "Worship Together",
    description: "United in praise and worship of our Lord",
  },
  {
    id: "3",
    src: "/church-bible-study-group-learning.jpg",
    alt: "Bible study group",
    title: "Growing in Faith",
    description: "Deepening our understanding through God's Word",
  },
  {
    id: "4",
    src: "/placeholder-xw86r.png",
    alt: "Youth ministry",
    title: "Next Generation",
    description: "Nurturing young hearts for Christ",
  },
  {
    id: "5",
    src: "/church-missions-global-outreach.jpg",
    alt: "Global missions",
    title: "Global Impact",
    description: "Spreading God's love around the world",
  },
  {
    id: "6",
    src: "/church-family-fellowship-gathering.jpg",
    alt: "Family fellowship",
    title: "Church Family",
    description: "Building lasting relationships in Christ",
  },
]

export default function VisionMissionPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Vision & Mission"
        subtitle="Guided by God's love, we strive to make disciples, serve others, and transform our community"
      />

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <img
              src={`https://trinitypj.com/wp-content/uploads/TMCPJ-Vision-Mission-1057x1500.jpg`}
              alt="TMCPJ Vision Mission"
            />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <img src={`https://trinitypj.com/wp-content/uploads/CF_1-en-1030x579.png`} alt="TMCPJ Vision Mission" />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <img src={`https://trinitypj.com/wp-content/uploads/CF_2-en-1030x579.png`} alt="TMCPJ Vision Mission" />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <img src={`https://trinitypj.com/wp-content/uploads/CF_3-en-1030x579.png`} alt="TMCPJ Vision Mission" />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 px-12">
            <img src={`https://trinitypj.com/wp-content/uploads/CF_4-en-1-1030x579.png`} alt="TMCPJ Vision Mission" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
