import { useEffect, useRef, useState, type ReactNode } from 'react'
import Icon from './Icon'

export interface MenuItem {
  label: string
  onClick?: () => void
  danger?: boolean
  disabled?: boolean
}

export interface MenuProps {
  items: MenuItem[]
  label?: string
  trigger?: ReactNode
}

// A lightweight popover action list - e.g. a kebab menu for Table row
// actions - distinct from Select, which is a full listbox for picking a
// value. items: [{ label, onClick, danger, disabled }].
export default function Menu({ items, label = 'Actions', trigger }: MenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="menu" ref={rootRef}>
      {trigger ? (
        <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      ) : (
        <button
          type="button"
          className="menu__kebab"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={label}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="kebab" size={16} />
        </button>
      )}
      {open && (
        <ul className="menu__list" role="menu" aria-label={label}>
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={`menu__item${item.danger ? ' menu__item--danger' : ''}`}
                onClick={() => {
                  setOpen(false)
                  item.onClick?.()
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
