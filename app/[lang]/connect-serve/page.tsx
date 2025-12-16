import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formCategories } from "@/lib/data"

export default function MinistryFormsPage() {
  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Connect & Serve"
        subtitle="Your next step in community, service, and spiritual growth starts here"
      />

      {/* Forms Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {formCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`bg-muted rounded-lg p-3 ${category.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {category.formLink ? (
                    // IF: It is a link
                    <Button asChild className="w-full" size="lg">
                      <a href={`/${category.id}`} rel="noopener noreferrer">
                        {category.buttonText}
                      </a>
                    </Button>
                  ) : (
                    // ELSE: It is a regular button (perhaps disabled?)
                    <Button className="w-full" size="lg" href={category.link}>
                      {category.buttonText}
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
