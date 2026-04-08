import { getDictionary } from "dictionaries"
import AdminLoginForm from "./AdminLoginForm"

export default async function AdminLoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return <AdminLoginForm dict={dict} />
}
