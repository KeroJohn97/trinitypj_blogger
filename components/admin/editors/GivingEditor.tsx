// components/admin/editors/GivingEditor.tsx
"use client"
import { CreditCard, Link as LinkIcon, QrCode } from "lucide-react"

export default function GivingEditor() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Giving & Tithe</h2>
        <p className="text-sm text-gray-500">Provide secure ways for the community to support the church.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bank Transfer Details */}
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 font-bold text-emerald-600">
            <CreditCard size={20} />
            <h3>Bank Details</h3>
          </div>
          <input placeholder="Bank Name" className="w-full rounded-md border p-2 text-sm" />
          <input placeholder="Account Name" className="w-full rounded-md border p-2 text-sm" />
          <input placeholder="Account Number" className="w-full rounded-md border p-2 font-mono text-sm" />
        </div>

        {/* Online Giving Link */}
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 font-bold text-green-600">
            <LinkIcon size={20} />
            <h3>Online Portal</h3>
          </div>
          <p className="text-xs text-gray-500 italic">Link to Tithe.ly, PayPal, or your preferred gateway.</p>
          <input placeholder="https://tithe.ly/give?..." className="w-full rounded-md border p-2 text-sm" />
        </div>

        {/* QR Code Upload */}
        <div className="flex items-center gap-8 rounded-xl border bg-white p-6 shadow-sm md:col-span-2">
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 text-gray-400">
            <QrCode size={32} />
            <span className="mt-2 text-[10px] font-bold uppercase">No QR Code</span>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-gray-800">DuitNow QR Code</h3>
            <p className="text-xs text-gray-500">
              Upload your church's official QR code for easy scanning during service.
            </p>
            <button className="rounded bg-gray-100 px-4 py-2 text-xs font-bold transition-colors hover:bg-gray-200">
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
