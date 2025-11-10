"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useRef, useState } from "react"

interface ExpandableArticleProps {
  children: React.ReactNode
  previewHeight?: number
  className?: string
  expandButtonText?: string
  collapseButtonText?: string
}

export function ExpandableArticle({
  children,
  previewHeight = 400,
  className,
  expandButtonText = "Read More",
  collapseButtonText = "Show Less",
}: ExpandableArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const articleRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    if (isExpanded && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div ref={articleRef} className={cn("relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden transition-all duration-500 ease-in-out",
          !isExpanded && "max-h-(--preview-height)"
        )}
        style={
          {
            "--preview-height": `${previewHeight}px`,
          } as React.CSSProperties
        }
      >
        <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>

        {!isExpanded && (
          <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent" />
        )}
      </div>

      {!isExpanded && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleToggle}
            variant="default"
            size="lg"
            className="cursor-pointer gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {expandButtonText}
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </Button>
        </div>
      )}
    </div>
  )
}
