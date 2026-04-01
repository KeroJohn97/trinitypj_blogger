import { PageHeader } from "@/components/page-header"
import { ministries } from "@/lib/ministries-data"
import MinistriesPage from "app/[lang]/(user)/app-components/ministries-component"

export default function ChurchMinistryPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Church Ministries" />
      <MinistriesPage ministries={ministries} />
    </div>
  )
}
