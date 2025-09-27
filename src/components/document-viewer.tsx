"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, X } from "lucide-react"

interface Document {
  id: string
  title: string
  description?: string
  type: "pdf" | "docx" | "doc"
  url: string
  size?: string
  uploadDate?: string
  category?: string
}

interface DocumentViewerProps {
  document: Document
  isOpen: boolean
  onClose: () => void
}

export function DocumentViewer({ document, isOpen, onClose }: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  if (!isOpen) return null

  const getEmbedUrl = (url: string, type: string) => {
    if (type === "pdf") {
      return url
    }
    // For DOCX files, we'll use Google Docs viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center p-4">
        <div className="bg-background flex h-[90vh] w-full max-w-6xl flex-col rounded-lg shadow-xl">
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-primary h-5 w-5" />
              <div>
                <h3 className="text-foreground font-semibold">{document.title}</h3>
                {document.description && <p className="text-muted-foreground text-sm">{document.description}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={document.url} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={document.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Document Content */}
          <div className="relative flex-1">
            {isLoading && (
              <div className="bg-muted/20 absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="border-primary/30 border-t-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2" />
                  <p className="text-muted-foreground">Loading document...</p>
                </div>
              </div>
            )}

            {document.type === "pdf" ? (
              <iframe
                src={getEmbedUrl(document.url, document.type)}
                className="h-full w-full border-0"
                onLoad={() => setIsLoading(false)}
                title={document.title}
              />
            ) : (
              <iframe
                src={getEmbedUrl(document.url, document.type)}
                className="h-full w-full border-0"
                onLoad={() => setIsLoading(false)}
                title={document.title}
              />
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
