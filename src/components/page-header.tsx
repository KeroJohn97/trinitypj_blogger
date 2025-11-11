interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  backgroundType?: "gradient" | "image" | "solid"
  colorScheme?: "primary" | "warm" | "cool"
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
  backgroundType = "gradient",
  colorScheme = "primary",
}: PageHeaderProps) {
  const getBackgroundClasses = () => {
    if (backgroundType === "image" && backgroundImage) {
      return "bg-cover bg-center bg-no-repeat"
    }

    if (backgroundType === "solid") {
      return "bg-primary"
    }

    switch (colorScheme) {
      case "warm":
        return "bg-gradient-to-r from-primary/10 to-accent/5"
      case "cool":
        return "bg-gradient-to-r from-primary/10 to-accent/5"
      default:
        return "bg-gradient-to-r from-primary/10 to-accent/5"
    }
  }

  return (
    <section
      className={`relative py-20 lg:py-32 ${getBackgroundClasses()}`}
      style={backgroundType === "image" && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-balance text-primary lg:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto max-w-3xl text-xl text-pretty text-primary/90 lg:text-2xl">{subtitle}</p>}
      </div>
    </section>
  )
}
