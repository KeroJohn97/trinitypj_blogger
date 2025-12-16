import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { ministries } from "@/lib/ministries-data"
import MinistriesPage from "app/[lang]/app-components/ministries-component"

export default function ChurchMinistryPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <PageHeader title="Church Ministries" />
      <MinistriesPage ministries={ministries} />
      <Footer />
    </div>
  )
}
