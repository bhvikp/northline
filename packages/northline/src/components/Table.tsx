import type { Key, ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: ReactNode
  align?: 'left' | 'right'
  render?: (row: T) => ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  getRowKey?: (row: T) => Key
  onRowClick?: (row: T) => void
  emptyMessage?: ReactNode
}

// Plain themed data table. `columns`: [{ key, header, align, render }].
// `rows`: array of plain objects keyed by column `key`. `getRowKey` defaults
// to row index.
export default function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  emptyMessage = 'No data',
}: TableProps<T>) {
  return (
    <div className="nl-table-wrap">
      <table className={`nl-table${onRowClick ? ' nl-table--hoverable' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} data-align={col.align}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="nl-table__empty" colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={getRowKey ? getRowKey(row) : i} onClick={() => onRowClick?.(row)}>
              {columns.map((col) => (
                <td key={col.key} data-align={col.align}>
                  {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
