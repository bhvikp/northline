import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  label?: string
  align?: 'left' | 'right'
}

// A generic anchored popover - same click-outside/Escape mechanics as Menu,
// but holds arbitrary content instead of a fixed action list.
export default function Popover({ trigger, children, label = 'More', align = 'left' }: PopoverProps) {
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
    <div className="popover" ref={rootRef}>
      <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      {open && (
        <div className={`popover__panel popover__panel--${align}`} role="dialog" aria-label={label}>
          {children}
        </div>
      )}
    </div>
  )
}
