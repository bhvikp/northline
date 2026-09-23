import type { ReactNode } from 'react'

export interface SidebarItem {
  id: string
  label: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

export interface SidebarProps {
  items: SidebarItem[]
  activeId?: string
  collapsed?: boolean
  header?: ReactNode
}

// Persistent side navigation rail - distinct from Drawer, which is an
// overlay meant to be opened/closed. `collapsed` shrinks it to icon-only
// width (pass `icon` on each item for that to look right).
export default function Sidebar({ items, activeId, collapsed = false, header }: SidebarProps) {
  return (
    <nav className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>
      {header && <div className="sidebar__header">{header}</div>}
      <ul className="sidebar__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`sidebar__item${item.id === activeId ? ' sidebar__item--active' : ''}`}
              onClick={item.onClick}
              title={collapsed && typeof item.label === 'string' ? item.label : undefined}
            >
              {item.icon && <span className="sidebar__icon">{item.icon}</span>}
              {!collapsed && <span className="sidebar__label">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
