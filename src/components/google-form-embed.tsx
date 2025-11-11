"use client"

interface GoogleFormEmbedProps {
  title: string
  formLink: string
  description?: string
  gradientFrom?: string // optional for custom colors
  gradientTo?: string
}

export default function GoogleFormEmbed({
  title,
  formLink,
  description,
  gradientFrom = "from-primary/10",
  gradientTo = "to-accent/5",
}: GoogleFormEmbedProps) {
  return (
    <section
      className={`relative flex min-h-screen flex-col items-center justify-center bg-linear-to-r p-6 ${gradientFrom} ${gradientTo} text-center`}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl leading-tight font-bold text-primary md:text-4xl">{title}</h1>

        {description && <p className="mx-auto mb-8 max-w-2xl text-xl text-primary/90">{description}</p>}
      </div>

      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <iframe src={`${formLink}?embedded=true`} className="h-[80vh] w-full border-0" loading="lazy" title={title} />
      </div>
    </section>
  )
}
