import { ExpandableArticle } from "@/components/expandable-article"
import { PageHeader } from "@/components/page-header"
import { StaggeredMediaGallery } from "@/components/staggered-media-gallery"
import { Card, CardContent } from "@/components/ui/card"
import DropEmailButton from "app/[lang]/(user)/app-components/drop-email-button"
import { getDictionary } from "dictionaries"
import { Mail } from "lucide-react"

// Static Data (kept outside as it contains IDs/Images mostly)
import { alphaService } from "@/services/alpha-service"

export default async function AlphaCoursePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.alpha

  // Fetch all alpha media from Supabase
  const allMedia = await alphaService.getAll()

  // Categorize items
  const displayJourney = allMedia.filter(m => m.category === "journey")
  const displayAdvertising = allMedia.filter(m => m.category === "advertising")

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={t.header.title} subtitle={t.header.subtitle} />

      {/* Project Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            {/* Left Column: FAQ */}
            <div>
              {/* FAQ 1 */}
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                {t.faq.who.title}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">{t.faq.who.desc}</p>
              </div>

              {/* FAQ 2 */}
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                {t.faq.how.title}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">{t.faq.how.desc}</p>
              </div>

              {/* FAQ 3 */}
              <h2 className="text-foreground mb-2 text-3xl font-bold lg:text-4xl">
                {t.faq.cost.title}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">{t.faq.cost.desc}</p>
              </div>
            </div>

            {/* Right Column: Article */}
            <div className="relative">
              <ExpandableArticle 
                previewHeight={400}
                expandButtonText={t.article.expand}
                collapseButtonText={t.article.collapse}
              >
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-foreground mb-6 text-2xl font-bold">{t.article.title}</h3>
                    <div className="prose prose-lg text-muted-foreground">
                      <p className="mb-4">{t.article.p1}</p>
                      <p className="mb-4">{t.article.p2}</p>
                      <p className="mb-4">{t.article.p3}</p>
                      <p className="mb-4">{t.article.p4}</p>
                      <p className="mb-4">{t.article.p5}</p>
                      <p className="mb-4">{t.article.p6}</p>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableArticle>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{t.gallery.journey.title}</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t.gallery.journey.subtitle}</p>
            </div>
            <StaggeredMediaGallery items={displayJourney} dict={t.modal} />
          </div>

          <div className="mb-16">
            <div className="mb-12 text-center">
              <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{t.gallery.languages}</h2>
              <StaggeredMediaGallery items={displayAdvertising} dict={t.modal} />
            </div>
          </div>

          {/* Support CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-foreground mb-4 text-2xl font-bold">{t.cta.title}</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">{t.cta.desc}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <DropEmailButton dict={t.cta} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
