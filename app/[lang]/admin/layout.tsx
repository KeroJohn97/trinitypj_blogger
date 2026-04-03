import { getDictionary } from "dictionaries"
import "globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trinity Methodist Church Petaling Jaya – TMCPJ",
  twitter: {
    card: "summary_large_image",
  },
}

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "zh-CN" }]
}

// 2. Make the layout async
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }> // Use Promise for Next.js 15+ compatibility
}) {
  // 3. Await params and fetch dictionary
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return (
    <html lang={lang}>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <body className="relative text-emerald-800">
        {/* 4. Pass the specific 'nav' dictionary to the component */}
        {/* <Navigation dict={dict.nav} /> */}

        {children}
      </body>
    </html>
  )
}
