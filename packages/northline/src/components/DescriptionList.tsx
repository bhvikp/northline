import type { ReactNode } from 'react'

export interface DescriptionItem {
  label: ReactNode
  value: ReactNode
}

export interface DescriptionListProps {
  items: DescriptionItem[]
  columns?: number
}

// Label/value pairs grid - detail panels, Drawer contents, record summaries.
export default function DescriptionList({ items, columns = 1 }: DescriptionListProps) {
  return (
    <dl className="description-list" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, i) => (
        <div key={i} className="description-list__item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
