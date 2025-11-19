interface FAQ {
  question: string
  answer: string
}

interface Attachment {
  id: string
  src: string
  title: string
  thumb?: string
}

interface Ministry {
  id: string
  name: string
  tagline?: string
  description: string
  photos?: string[]
  faqs?: FAQ[],
  pdf?: Attachment
  color?: string
  disclaimer?: string
  attachment?: Attachment
  library?: Attachment[]
}

interface MinistriesPageProps {
  ministries: Ministry[]
}
