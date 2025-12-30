import NewsGrid from "@/components/news-grid"
import { PageHeader } from "@/components/page-header"
import { getDictionary } from "dictionaries"

export default async function NewsEventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={dict.newsEvents.header.title} subtitle={dict.newsEvents.header.subtitle} />

      {/* Spacer */}
      <p className="mb-16"></p>

      <div className="mx-12">
        <NewsGrid />
      </div>

      {/* Spacer */}
      <p className="mb-16"></p>
    </div>
  )
}
