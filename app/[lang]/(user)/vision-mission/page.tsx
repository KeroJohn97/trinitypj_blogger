import { PageHeader } from "@/components/page-header"
import Image from "next/image"

// --- 1. Import Your Local Assets ---
// English Images
import cf1En from "@/../assets/church-focus-1-en.png"
import cf2En from "@/../assets/church-focus-2-en.png"
import cf3En from "@/../assets/church-focus-3-en.png"
import cf4En from "@/../assets/church-focus-4-en.png"
import mainEn from "@/../assets/vision-mission-en.jpg"

// Chinese Images (If you have them, otherwise import English ones as fallback)
import cf1Cn from "@/../assets/church-focus-1-zh.png"
import cf2Cn from "@/../assets/church-focus-2-zh.png"
import cf3Cn from "@/../assets/church-focus-3-zh.png"
import cf4Cn from "@/../assets/church-focus-4-zh.png"
import mainCn from "@/../assets/vision-mission-zh.png"
import { getDictionary } from "dictionaries"

export default async function VisionMissionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.visionMission

  // --- 2. Create an Image Map ---
  // This selects the correct set of images based on the current language
  const images =
    lang === "zh-CN"
      ? {
          main: mainCn,
          cf1: cf1Cn,
          cf2: cf2Cn,
          cf3: cf3Cn,
          cf4: cf4Cn,
        }
      : {
          main: mainEn,
          cf1: cf1En,
          cf2: cf2En,
          cf3: cf3En,
          cf4: cf4En,
        }

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={t.header.title} subtitle={t.header.subtitle} />

      {/* Main Vision Poster */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 flex justify-center px-12">
            {/* Use Next.js <Image> for automatic optimization */}
            <Image
              src={images.main}
              alt={t.images.main}
              placeholder="blur" // Optional: adds a blur effect while loading
              className="h-auto w-full max-w-4xl rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Core Values 1 */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 flex justify-center px-12">
            <Image src={images.cf1} alt={t.images.cf1} placeholder="blur" className="h-auto w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Core Values 2 */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 flex justify-center px-12">
            <Image src={images.cf2} alt={t.images.cf2} placeholder="blur" className="h-auto w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Core Values 3 */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 flex justify-center px-12">
            <Image src={images.cf3} alt={t.images.cf3} placeholder="blur" className="h-auto w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Core Values 4 */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-muted-foreground mb-12 flex justify-center px-12">
            <Image src={images.cf4} alt={t.images.cf4} placeholder="blur" className="h-auto w-full max-w-4xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
