import { PageHeader } from "@/components/page-header"
import { getDictionary } from "dictionaries"
import { Building, CreditCard, Mail } from "lucide-react"
import { CopyButton } from "../app-components/copy-button"

export default async function FinancialPledgePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en-US" | "zh-CN")
  const t = dict.pledge

  // Helper to render text with <bold> tags
  const renderRichText = (text: string) => {
    const parts = text.split(/<bold>|<\/bold>/)
    return <>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <PageHeader title={t.header.title} subtitle={t.header.subtitle} />
      <div className="mt-12 mb-4 flex w-auto items-center justify-center">
        {/* You can also use Next/Image here for optimization if configured */}
        <img src="https://trinitypj.com/wp-content/uploads/TMCPJ-Giving.png" alt="Giving" />
      </div>

      <main className="mx-auto -mt-8 max-w-5xl px-4 py-12">
        {/* Intro Card */}
        <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-center text-gray-600">{t.intro}</p>
        </div>

        {/* Confirmation Section */}
        <div className="mb-8 rounded-xl border border-yellow-100 bg-yellow-50 p-6 md:col-span-2">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-yellow-900">🧾 {t.confirmation.title}</h3>
          <p className="mb-4 text-yellow-800">{t.confirmation.desc}</p>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <a
              href="mailto:admin@trinitypj.com"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-yellow-700"
            >
              <Mail className="h-4 w-4" />
              {t.confirmation.button}
            </a>
            <span className="text-sm text-yellow-700">
              {/* Note: I kept the email hardcoded, but the label "Send to" is implicit in context or can be added */}
              Send to: <strong>admin@trinitypj.com</strong> <br className="hidden md:inline" />({t.confirmation.note})
            </span>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Method 1: DuitNow */}
          <PaymentCard
            title={t.duitnow.title}
            icon={<CreditCard className="h-6 w-6 text-pink-600" />}
            badge={t.duitnow.badge}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{t.duitnow.desc}</p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-1 text-xs font-semibold text-gray-500 uppercase">{t.duitnow.idLabel}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-gray-900">15190</span>
                  <CopyButton text="15190" label={t.copy.idLabel} successLabel={t.copy.success} />
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>{t.duitnow.stepsTitle}</strong>
                </p>
                <ol className="list-decimal space-y-1 pl-4">
                  {t.duitnow.steps.map((step, i) => (
                    <li key={i}>{renderRichText(step)}</li>
                  ))}
                </ol>
              </div>
            </div>
          </PaymentCard>

          {/* Method 2: Bank Transfer */}
          <PaymentCard title={t.bankTransfer.title} icon={<Building className="h-6 w-6 text-blue-600" />}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{t.bankTransfer.desc}</p>

              <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">{t.bankTransfer.bankLabel}</p>
                  <p className="font-medium">Alliance Bank Malaysia Bhd</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">{t.bankTransfer.nameLabel}</p>
                  <p className="text-sm font-medium">TRINITY METHODIST CHURCH PETALING JAYA</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-500 uppercase">{t.bankTransfer.numberLabel}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-gray-900">121-0900-100567-41</span>
                    <CopyButton text="121090010056741" label={t.copy.label} successLabel={t.copy.success} />
                  </div>
                </div>
              </div>

              <div className="rounded bg-blue-50 p-3 text-sm text-blue-800">
                <span className="font-bold">{t.bankTransfer.noteTitle}</span> {renderRichText(t.bankTransfer.noteDesc)}
              </div>
            </div>
          </PaymentCard>

          {/* Method 3: Cheque */}
          <PaymentCard title={t.cheque.title} icon={<Mail className="h-6 w-6 text-green-600" />}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">{t.cheque.payableTo}</p>
              <div className="rounded bg-gray-50 p-3 text-center text-sm font-bold text-gray-900 md:text-base">
                TRINITY METHODIST CHURCH PETALING JAYA
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-2">{t.cheque.backNote}</p>
                <p className="mb-1 font-semibold">{t.cheque.mailTo}</p>
                <address className="rounded border border-gray-200 bg-gray-50 p-3 not-italic">
                  {t.cheque.office}
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
    </div>
  )
}

// Subcomponent: PaymentCard (Stateless, so it can stay in this file)
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
