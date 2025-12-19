import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formCategories } from "@/lib/data"
import { getDictionary } from "dictionaries"
import Link from "next/link"

export default async function ConnectServePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")

  return (
    <main className="bg-background min-h-screen">
      <PageHeader title={dict.connectServe.header.title} subtitle={dict.connectServe.header.subtitle} />

      {/* Forms Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {formCategories.map((category, index) => {
            const IconComponent = category.icon

            const items = dict.connectServe.items as Record<
              string,
              { title: string; description: string; button: string }
            >
            const itemDict = items[category.id]

            if (!itemDict) return null

            return (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`bg-muted rounded-lg p-3 ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      {/* 2. Use Translated Title & Description */}
                      <CardTitle className="mb-2 text-2xl">{itemDict.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{itemDict.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Check if 'formLink' exists (for external Google Forms) */}
                  {category.formLink ? (
                    <Button asChild className="w-full" size="lg">
                      <a href={`${category.id}`} target="_blank" rel="noopener noreferrer">
                        {itemDict.button}
                      </a>
                    </Button>
                  ) : (
                    // Fallback for internal links (like the pledge page)
                    <Button className="w-full" size="lg" asChild>
                      {/* Assuming category.link exists here based on the data */}
                      <Link href={category.link || "#"}>{itemDict.button}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </main>
  )
}
