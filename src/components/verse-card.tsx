interface VerseCardProps {
  reference: string
  verse: string
}

export function VerseCard({ reference, verse }: VerseCardProps) {
  return (
    <>
      <div className="my-6 w-auto rounded-r-lg border-l-4 border-emerald-600 bg-emerald-50 p-6">
        <p className="mb-2 text-gray-800 italic">"{verse}"</p>
        <p className="font-semibold text-emerald-700">— {reference}</p>
      </div>
    </>
  )
}
