// app/admin/settings/page.tsx
import { getWebsiteSettings } from "@/lib/db/website"
import { SettingsForm } from "./settings-form"

export default async function AdminSettingsPage() {
  // 1. Fetch the data before the page even reaches the browser
  const initialData = await getWebsiteSettings()

  // 2. Pass it as a prop
  return <SettingsForm initialData={initialData} />
}
