import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ministries } from "@/lib/ministries-data"
import MinistriesPage from "app/app-components/ministries-component"

export default function ChurchMinistryPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <MinistriesPage ministries={ministries} />
      <Footer />
    </div>
  )
}
