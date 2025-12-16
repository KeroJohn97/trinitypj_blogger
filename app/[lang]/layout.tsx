import "globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trinity Methodist Church Petaling Jaya – TMCPJ | Methodist Church in Petaling Jaya, Selangor, Malaysia",
  twitter: {
    card: "summary_large_image",
  },
}

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "zh-CN" }]
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <body className="relative text-emerald-800">{children}</body>
    </html>
  )
}
