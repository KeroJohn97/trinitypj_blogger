import { formatEmail } from "@/lib/helpers"

// Suitable name: OfficeBearersTable
type TableColumn = {
  header: string
  accessor: string
}

type TableProps = {
  title: string
  columns: TableColumn[]
  data: Record<string, string>[]
}

function formatCellValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

export default function Table({ title, columns, data }: TableProps) {
  return (
    <div className="w-full">
      <h2 className="text-primary mb-6 text-center text-2xl font-bold">{title}</h2>

      <div className="mx-auto w-full px-4 pb-12">
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="bg-card min-w-full border-collapse">
            <caption className="sr-only">{title}</caption>

            <thead className="bg-primary text-primary-foreground hidden sm:table-header-group">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} scope="col" className="px-6 py-4 text-left text-sm font-semibold">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-border divide-y">
              {data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="group border-border sm:hover:bg-muted/50 block border-b last:border-b-0 sm:table-row sm:border-b-0 sm:transition-colors"
                >
                  {columns.map((col, colIdx) => {
                    const value = formatCellValue(row[col.accessor])

                    return (
                      <td key={colIdx} className="block px-4 py-3 sm:table-cell sm:px-6 sm:py-4">
                        <div className="flex justify-between gap-4 sm:block">
                          <span className="text-muted-foreground font-medium sm:hidden">{col.header}:</span>
                          <span className={`text-foreground text-right`}>{formatEmail(value)}</span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="bg-card text-muted-foreground px-6 py-12 text-center">No data available</div>
          )}
        </div>
      </div>
    </div>
  )
}
