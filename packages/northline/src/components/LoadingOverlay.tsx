import type { ReactNode } from 'react'
import Spinner from './Spinner'

export interface LoadingOverlayProps {
  active: boolean
  children: ReactNode
  label?: string
}

// Dims and blocks a section while `active`, with a centered Spinner on top -
// distinct from a bare Spinner, which doesn't manage the underlying content.
// Wraps `children` in a relatively-positioned container so the overlay
// covers exactly that area, not the whole page.
export default function LoadingOverlay({ active, children, label = 'Loading' }: LoadingOverlayProps) {
  return (
    <div className="loading-overlay">
      {children}
      {active && (
        <div className="loading-overlay__veil" role="status" aria-label={label}>
          <Spinner />
        </div>
      )}
    </div>
  )
}
