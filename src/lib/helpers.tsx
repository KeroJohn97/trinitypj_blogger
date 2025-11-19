import React, { JSX } from "react"

export function formatEmail(text: string): (string | JSX.Element)[] {
  // Regular expression to match emails
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

  // Split the string by emails and rebuild with <a> elements
  return text.split(emailRegex).map((part, index) => {
    if (emailRegex.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`} className="text-red-700 underline hover:text-red-800">
          {part}
        </a>
      )
    }

    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}
