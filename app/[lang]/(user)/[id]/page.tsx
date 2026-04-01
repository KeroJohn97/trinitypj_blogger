import GoogleFormEmbed from "@/components/google-form-embed"
import { formCategories } from "@/lib/data"
import { getDictionary } from "dictionaries"

export default async function GoogleFormsPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  // 1. Get the static config (link, id) from data.ts
  const category = formCategories.find((item) => item.id === id)

  // 2. Get the translated text (title, description) from the dictionary
  // We cast to Record so TypeScript knows we can look up by string ID
  const items = dict.connectServe.items as Record<string, { title: string; description: string }>
  const localizedItem = items[id]

  // 3. Safety check
  if (!category || !localizedItem || !category.formLink) {
    return null // Or render a "Not Found" component
  }

  return (
    <GoogleFormEmbed title={localizedItem.title} description={localizedItem.description} formLink={category.formLink} />
  )
}
