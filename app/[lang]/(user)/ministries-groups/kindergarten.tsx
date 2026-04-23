import { PageHeader } from "@/components/page-header"

export default function KindergartenPage({ isNested = false }: { isNested?: boolean }) {
  return (
    <div className={isNested ? "" : "bg-background min-h-screen"}>
      {!isNested && (
        <PageHeader
          title="Methodist Kindergarten PJ"
          subtitle="The Methodist Kindergarten was established in 1960 as a non-profit, church-based preschool to provide a quality, affordable and inclusive kindergarten programme for families of the Petaling Jaya, Selangor community."
        />
      )}

      {/* Project Overview */}
      <section className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-start gap-12 lg:flex-row">
            <div>
              <h3 className="text-foreground mb-2 text-xl font-bold lg:text-2xl">Our Focus</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Our Vision Statement is for the Methodist Kindergarten to be a Christ-centred Kindergarten with the
                  Mission to nurture our children in an environment that expresses faithfulness to the Great Commission
                  (Matthew 28:18-20). Our Core Values are to uphold the Great Commission by recognising the Supremacy of
                  Jesus Christ, Discipleship and Evangelism.
                </p>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-bold lg:text-2xl">School Hour</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">Mondays to Fridays: 8.00 am to 12.30 pm</p>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-bold lg:text-2xl">Address & Contact</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p>The Methodist Kindergarten</p>
                <p>6 Jalan 5/37 </p>
                <p className="mb-2">46000 Petaling Jaya</p>
                <p>The Office</p>
                <p>Tel: (+60)3-7956 6350</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
