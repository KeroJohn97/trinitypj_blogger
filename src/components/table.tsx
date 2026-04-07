"use client"
import { formatEmail } from "@/lib/helpers"
import { Star, Users } from "lucide-react"

type TableColumn = {
  header: string
  accessor: string
  className?: string
}

type TableProps = {
  title?: string
  columns: TableColumn[]
  data: any[] // Using any[] to allow for 'is_featured' flags
}

export default function Table({ title, columns, data }: TableProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 w-full duration-1000">
      {title && (
        <div className="mb-8 flex items-end justify-between px-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-blue-600" />
          </div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{data.length} Groups</span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-[11px] font-bold tracking-[0.1em] text-slate-500 uppercase ${col.className || ""}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {data.map((row, rowIdx) => {
                const isFeatured = row.is_featured

                return (
                  <tr
                    key={rowIdx}
                    className={`group transition-colors duration-200 hover:bg-slate-50/50 ${
                      isFeatured ? "bg-amber-50/30" : ""
                    }`}
                  >
                    {columns.map((col, colIdx) => {
                      const value = row[col.accessor]
                      const isTitle = col.accessor === "title"

                      return (
                        <td
                          key={colIdx}
                          className={`px-6 py-5 text-sm whitespace-nowrap transition-all ${
                            isTitle ? "font-semibold text-slate-900" : "font-medium text-slate-500"
                          } ${col.className || ""}`}
                        >
                          <div className="flex items-center gap-2">
                            {isTitle && isFeatured && <Star size={14} className="fill-amber-400 text-amber-400" />}
                            <span className={!isTitle ? "tabular-nums" : ""}>{formatEmail(String(value || ""))}</span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-slate-50 p-4 text-slate-300">
                <Users size={32} strokeWidth={1} />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-400">No records found in this zone.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
