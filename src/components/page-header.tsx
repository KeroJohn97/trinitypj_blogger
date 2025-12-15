import church from "@/../assets/church.jpg"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string // Now optional
}

export function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  // Use the provided image URL, or fall back to the imported default's src
  const activeImage = backgroundImage || church.src

  return (
    <section
      className="relative bg-gray-900 bg-cover bg-center bg-no-repeat py-20 lg:py-32"
      style={{ backgroundImage: `url(${activeImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-balance text-white lg:text-6xl">{title}</h1>

        {subtitle && <p className="mx-auto max-w-3xl text-xl text-pretty text-white/90 lg:text-2xl">{subtitle}</p>}
      </div>
    </section>
  )
}
