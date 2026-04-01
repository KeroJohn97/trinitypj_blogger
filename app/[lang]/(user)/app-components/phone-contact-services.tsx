"use client"

import { useState } from "react"

interface PhoneContactProps {
  phone: string
  whatsapp?: boolean
  mask?: boolean
}

export function PhoneContact({ phone, whatsapp = false, mask = false }: PhoneContactProps) {
  const [visible, setVisible] = useState(!mask)
  const displayNumber = visible ? phone : "••• ••• ••••"
  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, "")}`

  return (
    <div className="text-sm">
      {/* First row — phone number and Show/Hide */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-800">{displayNumber}</span>
        {mask && (
          <button onClick={() => setVisible(!visible)} className="text-red-600 hover:underline">
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Second row — Call / WhatsApp actions */}
      <div className="mt-1 flex items-center gap-4">
        <a href={`tel:${phone}`} className="text-red-600 hover:underline">
          Call
        </a>
        {whatsapp && (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
            WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
