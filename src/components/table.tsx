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

export default function Table({ title, columns, data }: TableProps) {
  return (
    <div>
      <h2 className="text-primary mb-4 text-center text-2xl font-bold">{title}</h2>

      <div className="mx-auto w-full bg-white px-4 pb-12">
        <table className="min-w-full border-collapse overflow-hidden rounded-xl bg-white shadow-md">
          <thead className="bg-primary text-white">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3 text-left font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-800">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col, cidx) => (
                  <td key={cidx} className="px-6 py-3">
                    {formatEmail(`${row[col.accessor]}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
