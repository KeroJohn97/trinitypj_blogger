// app/[lang]/preview/preview-client.tsx
"use client"

import ThemeTemplate from "components/Website/ThemeTemplate"
import { useEffect, useState } from "react"

export function PreviewClient({ initialData, dict }: { initialData: SiteData; dict: any }) {
  const [formData, setFormData] = useState<SiteData>(initialData)

  useEffect(() => {
    // Listen for NEW changes from the Admin Panel
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "WHATSAPP_BUILDER_DRAFT") {
        console.log("Preview received draft:", event.data.payload)
        setFormData(event.data.payload as SiteData)
      }
    }

    window.addEventListener("message", handleMessage)

    // Tell the Admin Panel we are ready to receive data
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*")

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return <ThemeTemplate data={formData} dict={dict} />
}
