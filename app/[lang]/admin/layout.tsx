import { DialogProvider } from "@/context/dialog-context"
import { NavigationGuardProvider } from "@/context/navigation-guard-context"
import { getDictionary } from "dictionaries"
import "globals.css"
import { Metadata } from "next"
import { Montserrat, Oswald } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trinity Methodist Church Petaling Jaya – TMCPJ",
  twitter: {
    card: "summary_large_image",
  },
}

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "zh-CN" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return (
    <NavigationGuardProvider>
      <DialogProvider>
        <html lang={lang}>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <body className={`${montserrat.variable} ${oswald.variable} relative`}>
            {children}
          </body>
        </html>
      </DialogProvider>
    </NavigationGuardProvider>
  )
}
