"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Building, Check, Copy, CreditCard, Mail } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"

export default function FinancialPledgePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navigation />
      <PageHeader
        title="Financial Pledge"
        subtitle="Support the mission and ministry of Trinity Methodist Church Petaling Jaya"
      />
      <div className="mt-12 mb-4 flex w-auto items-center justify-center">
        <img src="https://trinitypj.com/wp-content/uploads/TMCPJ-Giving.png" alt="2 Corinthians 9:7" />
      </div>

      <main className="mx-auto -mt-8 max-w-5xl px-4 py-12">
        {/* Intro Card */}
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-center text-gray-600">
            We gratefully accept tithes, offerings, and pledges to support our church's work. Please choose one of the
            convenient methods below.
          </p>
        </div>

        {/* Confirmation Section */}
        <div className="mb-8 rounded-xl border border-yellow-100 bg-yellow-50 p-6 md:col-span-2">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-yellow-900">🧾 Proof of Transaction</h3>
          <p className="mb-4 text-yellow-800">
            If you have made an online transfer or ATM deposit, please help our finance team by emailing your
            transaction receipt.
          </p>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <a
              href="mailto:admin@trinitypj.com"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-yellow-700"
            >
              <Mail className="h-4 w-4" />
              Email Receipt
            </a>
            <span className="text-sm text-yellow-700">
              Send to: <strong>admin@trinitypj.com</strong> <br className="hidden md:inline" />
              (Subject: "Your Name - Purpose of Gift")
            </span>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Method 1: DuitNow */}
          <PaymentCard title="DuitNow" icon={<CreditCard className="h-6 w-6 text-pink-600" />} badge="Instant">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Use your bank's mobile app to transfer instantly using our ID number.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-1 text-xs font-semibold text-gray-500 uppercase">DuitNow ID (Business Reg No)</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-gray-900">15190</span>
                  <CopyButton text="15190" label="Copy ID" />
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Steps:</strong>
                </p>
                <ol className="list-decimal space-y-1 pl-4">
                  <li>
                    Select <strong>DuitNow</strong> in your banking app.
                  </li>
                  <li>
                    Choose <strong>Business Registration Number</strong>.
                  </li>
                  <li>
                    Enter ID: <strong>15190</strong>.
                  </li>
                  <li>Enter amount and reference (e.g., "Tithe").</li>
                </ol>
              </div>
            </div>
          </PaymentCard>

          {/* Method 2: Bank Transfer */}
          <PaymentCard title="Bank Transfer" icon={<Building className="h-6 w-6 text-blue-600" />}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Direct transfer via online banking or ATM deposit.</p>

              <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Bank</p>
                  <p className="font-medium">Alliance Bank Malaysia Bhd</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Account Name</p>
                  <p className="text-sm font-medium">TRINITY METHODIST CHURCH PETALING JAYA</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-500 uppercase">Account Number</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-gray-900">121-0900-100567-41</span>
                    <CopyButton text="121090010056741" label="Copy" />
                  </div>
                </div>
              </div>

              <div className="rounded bg-blue-50 p-3 text-sm text-blue-800">
                <span className="font-bold">Note:</span> Please state your <strong>Name</strong> and{" "}
                <strong>Purpose</strong> (e.g., Tithe, Pledge, Restoration Fund) in the recipient reference. If making
                an <strong>ATM deposit</strong>, please email the bank-in slip to admin@trinitypj.com.
              </div>
            </div>
          </PaymentCard>

          {/* Method 3: Cheque */}
          <PaymentCard title="Cheque" icon={<Mail className="h-6 w-6 text-green-600" />}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Make cheques payable to:</p>
              <div className="rounded bg-gray-50 p-3 text-center text-sm font-bold text-gray-900 md:text-base">
                TRINITY METHODIST CHURCH PETALING JAYA
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-2">Please write the purpose on the back of the cheque (e.g., "Sunday Offering").</p>
                <p className="mb-1 font-semibold">Mail to:</p>
                <address className="rounded border border-gray-200 bg-gray-50 p-3 not-italic">
                  Attn: Church Office Manager
                  <br />
                  Trinity Methodist Church Petaling Jaya
                  <br />
                  6 Jalan 5/37,
                  <br />
                  46000 Petaling Jaya,
                  <br />
                  Selangor, Malaysia
                </address>
              </div>
            </div>
          </PaymentCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// --- Subcomponents ---

function PaymentCard({
  title,
  icon,
  children,
  badge,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  badge?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between border-b border-gray-50 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-50 p-2">{icon}</div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {badge && (
          <span className="rounded-full bg-pink-100 px-2 py-1 text-xs font-bold tracking-wide text-pink-700 uppercase">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function CopyButton({ text, label }: { text: string; label: string }) {
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
      {copied ? "Copied" : label}
    </button>
  )
}
