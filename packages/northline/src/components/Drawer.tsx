import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

export interface DrawerProps {
  open: boolean
  onClose?: () => void
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  side?: 'left' | 'right'
  width?: number
}

// Slide-in side panel - Modal's counterpart for content that reads better
// anchored to an edge (filters, record detail, forms) than centered.
export default function Drawer({ open, onClose, title, children, footer, side = 'right', width = 380 }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="drawer-backdrop" onMouseDown={() => onClose?.()}>
      <div
        className={`drawer drawer--${side}`}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button type="button" className="modal__close" aria-label="Close" onClick={() => onClose?.()}>
              <Icon name="close" size={16} />
            </button>
          </div>
        )}
        <div className="drawer__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
