import type { ReactNode } from 'react'

export interface BottomNavItem {
  id: string
  label: ReactNode
  icon: ReactNode
  onClick?: () => void
}

export interface BottomNavProps {
  items: BottomNavItem[]
  activeId?: string
}

// Fixed bottom tab bar for mobile primary navigation - hidden above the
// `sm` breakpoint by default (desktop/tablet use Navbar/Sidebar instead).
// Pair with Canvas, which reserves bottom padding so page content doesn't
// sit underneath it. Each item needs an `icon` since a bottom nav is
// icon-led with a small label underneath, not a text-only list.
export default function BottomNav({ items, activeId }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav__item${item.id === activeId ? ' bottom-nav__item--active' : ''}`}
          aria-current={item.id === activeId ? 'page' : undefined}
          onClick={item.onClick}
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
