import { useState, type ReactNode } from 'react'
import Icon from './Icon'

export interface NavbarItem {
  id: string
  label: ReactNode
  onClick?: () => void
}

export interface NavbarProps {
  brand?: ReactNode
  items?: NavbarItem[]
  activeId?: string
  children?: ReactNode
  sticky?: boolean
}

// App header bar: brand/logo on the left, an optional site-navigation
// `items` menu in the middle, and arbitrary actions (Button, Avatar, ...) on
// the right via `children`. Below the `sm` breakpoint the menu collapses
// behind a hamburger toggle instead of wrapping/overflowing - pair with
// BottomNav for the mobile-first primary navigation pattern instead (a
// hamburger menu buried in a header is easy to miss on a phone).
export default function Navbar({ brand, items, activeId, children, sticky = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`navbar${sticky ? ' navbar--sticky' : ''}`}>
      <div className="navbar__row">
        {brand && <div className="navbar__brand">{brand}</div>}
        {items && items.length > 0 && (
          <button
            type="button"
            className="navbar__menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        )}
        <div className="navbar__actions">{children}</div>
      </div>
      {items && items.length > 0 && (
        <nav className={`navbar__menu${menuOpen ? ' navbar__menu--open' : ''}`} aria-label="Primary">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`navbar__menu-item${item.id === activeId ? ' navbar__menu-item--active' : ''}`}
              onClick={() => {
                setMenuOpen(false)
                item.onClick?.()
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
