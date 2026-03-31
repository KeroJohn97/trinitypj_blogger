// app/[lang]/preview/page.tsx
// NO "use client" here!
import { getWebsiteSettings } from "@/lib/db/website"
import { getDictionary } from "dictionaries"
import { PreviewClient } from "./preview-client"

export default async function PreviewPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  // 1. Fetch server-side data (Dictionary and Database)
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const initialData = await getWebsiteSettings()

  // 2. Pass it to the Client Component
  return <PreviewClient initialData={initialData} dict={dict} />
}
