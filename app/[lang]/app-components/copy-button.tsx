"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CopyButton({ text, label, successLabel }: { text: string; label: string; successLabel: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
        copied ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? successLabel : label}
    </button>
  )
}
