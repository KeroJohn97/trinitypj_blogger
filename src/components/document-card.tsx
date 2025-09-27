"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DocumentViewer } from "./document-viewer"
import { FileText, Download, Eye, Calendar, HardDrive } from "lucide-react"
import { Card, CardContent } from "./ui/card"

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

interface DocumentCardProps {
  document: Document
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [viewerOpen, setViewerOpen] = useState(false)

  const getFileIcon = (type: string) => {
    return <FileText className="text-primary h-6 w-6" />
  }

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF Document"
      case "docx":
        return "Word Document"
      case "doc":
        return "Word Document"
      default:
        return "Document"
    }
  }

  return (
    <>
      <Card className="group transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors">
              {getFileIcon(document.type)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-foreground group-hover:text-primary mb-2 font-semibold transition-colors">
                {document.title}
              </h3>

              {document.description && (
                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{document.description}</p>
              )}

              <div className="text-muted-foreground mb-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {getFileTypeLabel(document.type)}
                </span>
                {document.size && (
                  <span className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    {document.size}
                  </span>
                )}
                {document.uploadDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {document.uploadDate}
                  </span>
                )}
              </div>

              {document.category && (
                <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-2 py-1 text-xs">
                  {document.category}
                </span>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewerOpen(true)}
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={document.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DocumentViewer document={document} isOpen={viewerOpen} onClose={() => setViewerOpen(false)} />
    </>
  )
}
