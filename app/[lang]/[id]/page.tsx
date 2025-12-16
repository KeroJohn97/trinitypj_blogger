import { Footer } from "@/components/footer"
import GoogleFormEmbed from "@/components/google-form-embed"
import { formCategories } from "@/lib/data"

export default async function GoogleFormsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const category = formCategories.find((item) => item.id == id)

  return (
    category && (
      <>
        {category.formLink && (
          <GoogleFormEmbed title={category.title} description={category.description} formLink={category.formLink!} />
        )}
        <Footer />
      </>
    )
  )
}
