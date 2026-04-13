import { PageHeader } from "@/components/page-header"
import { getMinistries } from "@/lib/ministries-data"
import MinistriesPage from "app/[lang]/(user)/app-components/ministries-component"

export default async function ChurchMinistryPage() {
  const ministries = await getMinistries();
  
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Church Ministries" />
      <MinistriesPage ministries={ministries as any} />
    </div>
  )
}
