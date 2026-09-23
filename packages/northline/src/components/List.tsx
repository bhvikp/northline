import type { Key, ReactNode } from 'react'

export interface ListItemData {
  id: Key
  content: ReactNode
  onClick?: () => void
}

export interface ListProps {
  items: ListItemData[]
  bordered?: boolean
}

// Generic styled list - lighter than Table for a plain vertical stack of
// rows (a feed, a simple picklist, etc) that doesn't need columns.
export default function List({ items, bordered = true }: ListProps) {
  return (
    <ul className={`nl-list${bordered ? ' nl-list--bordered' : ''}`}>
      {items.map((item) => (
        <li
          key={item.id}
          className={`nl-list__item${item.onClick ? ' nl-list__item--clickable' : ''}`}
          onClick={item.onClick}
        >
          {item.content}
        </li>
      ))}
    </ul>
  )
}
