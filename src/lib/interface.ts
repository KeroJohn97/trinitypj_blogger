interface FAQ {
  question: string
  answer: string
}

interface Ministry {
  id: string
  name: string
  tagline?: string
  description: string
  photos?: string[]
  faqs?: FAQ[]
  color?: string
}

interface MinistriesPageProps {
  ministries: Ministry[]
}
