"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { DocumentCard } from "@/components/document-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Search, FileText, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

const documents = [
  {
    id: "1",
    title: "Church Constitution & Bylaws",
    description: "Official governing documents outlining our church structure, beliefs, and operational procedures",
    type: "pdf" as const,
    url: "/placeholder.pdf",
    size: "2.4 MB",
    uploadDate: "December 2024",
    category: "Governance",
  },
  {
    id: "2",
    title: "Annual Report 2024",
    description: "Comprehensive overview of our church activities, finances, and ministry impact throughout 2024",
    type: "pdf" as const,
    url: "/placeholder.pdf",
    size: "5.1 MB",
    uploadDate: "December 2024",
    category: "Reports",
  },
  {
    id: "3",
    title: "Sanctuary Restoration Project Plan",
    description: "Detailed project timeline, budget, and architectural plans for our sanctuary restoration",
    type: "docx" as const,
    url: "/placeholder.docx",
    size: "8.7 MB",
    uploadDate: "November 2024",
    category: "Projects",
  },
  {
    id: "4",
    title: "Ministry Volunteer Handbook",
    description: "Guidelines and procedures for volunteers serving in various church ministries",
    type: "pdf" as const,
    url: "/placeholder.pdf",
    size: "1.8 MB",
    uploadDate: "October 2024",
    category: "Ministry",
  },
  {
    id: "5",
    title: "Small Group Study Guide - Advent 2024",
    description: "Weekly discussion questions and activities for our Advent small group studies",
    type: "docx" as const,
    url: "/placeholder.docx",
    size: "945 KB",
    uploadDate: "November 2024",
    category: "Education",
  },
  {
    id: "6",
    title: "Financial Transparency Report Q3 2024",
    description: "Quarterly financial statement showing income, expenses, and ministry allocations",
    type: "pdf" as const,
    url: "/placeholder.pdf",
    size: "1.2 MB",
    uploadDate: "October 2024",
    category: "Finance",
  },
  {
    id: "7",
    title: "Youth Ministry Activity Calendar",
    description: "Ongoing events, camps, and activities for our youth ministry programs",
    type: "docx" as const,
    url: "/placeholder.docx",
    size: "2.1 MB",
    uploadDate: "December 2024",
    category: "Youth",
  },
  {
    id: "8",
    title: "Community Outreach Impact Report",
    description: "Summary of our community service initiatives and their impact on local families",
    type: "pdf" as const,
    url: "/placeholder.pdf",
    size: "3.4 MB",
    uploadDate: "November 2024",
    category: "Outreach",
  },
  {
    id: "9",
    title: "New Member Welcome Packet",
    description: "Information packet for new members including church history, ministries, and next steps",
    type: "docx" as const,
    url: "/placeholder.docx",
    size: "1.6 MB",
    uploadDate: "September 2024",
    category: "Membership",
  },
]

const categories = [
  "All",
  "Governance",
  "Reports",
  "Projects",
  "Ministry",
  "Education",
  "Finance",
  "Youth",
  "Outreach",
  "Membership",
]

export default function DocumentPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocument = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      <PageHeader
        title="Document & Resources"
        subtitle="Access important church documents, reports, and resources for our community"
        backgroundType="gradient"
        colorScheme="cool"
      />

      {/* Search and Filter Controls */}
      <section className="border-border border-b py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-5 w-5" />
              <span className="text-muted-foreground mr-2 text-sm font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredDocument.length} {filteredDocument.length === 1 ? "document" : "documents"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredDocument.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>

          {filteredDocument.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
              <p className="text-muted-foreground mb-2 text-lg">No documents found</p>
              <p className="text-muted-foreground mb-4 text-sm">Try adjusting your search terms or category filter</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Document Categories Overview */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold">Document Categories</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Our documents are organized into categories to help you find what you need quickly
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "Governance",
                description: "Official church documents, constitution, and bylaws",
                count: documents.filter((d) => d.category === "Governance").length,
              },
              {
                category: "Reports",
                description: "Annual reports, financial statements, and ministry updates",
                count: documents.filter((d) => d.category === "Reports").length,
              },
              {
                category: "Ministry",
                description: "Ministry guidelines, volunteer handbooks, and procedures",
                count: documents.filter((d) => d.category === "Ministry").length,
              },
              {
                category: "Education",
                description: "Study guides, curriculum, and educational resources",
                count: documents.filter((d) => d.category === "Education").length,
              },
              {
                category: "Projects",
                description: "Special project plans, timelines, and documentation",
                count: documents.filter((d) => d.category === "Projects").length,
              },
              {
                category: "Outreach",
                description: "Community service reports and outreach program information",
                count: documents.filter((d) => d.category === "Outreach").length,
              },
            ].map((item) => (
              <Card
                key={item.category}
                className="group cursor-pointer transition-shadow duration-300 hover:shadow-lg"
                onClick={() => setSelectedCategory(item.category)}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                    <FileText className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground mb-2 font-bold">{item.category}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{item.description}</p>
                  <span className="text-primary text-sm font-semibold">
                    {item.count} {item.count === 1 ? "document" : "documents"}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <Upload className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-foreground mb-4 text-3xl font-bold">Need to Share a Document?</h2>
          <p className="text-muted-foreground mb-8 text-xl">
            If you have documents that would benefit our church community, we'd love to include them in our resource
            library.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="font-semibold">
              Submit Document
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent font-semibold">
              Contact Administrator
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
