"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ReactElement } from "react"

export interface Feature {
  icon: ReactElement
  title: string
  description: string
}

interface FeatureGridProps {
  heading: string
  subheading?: string
  features: Feature[]
  className?: string
}

/**
 * A reusable grid-based section to display features, highlights, or key points.
 */
export default function FeatureGrid({ heading, subheading, features, className = "" }: FeatureGridProps) {
  return (
    <section className={`mb-16 ${className}`}>
      <div className="mb-12 text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">{heading}</h2>
        {subheading && <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{subheading}</p>}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon, title, description }, idx) => (
          <Card key={idx} className="group transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                {icon}
              </div>
              <h3 className="text-foreground mb-3 font-bold">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
