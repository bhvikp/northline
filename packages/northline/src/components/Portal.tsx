import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: ReactNode
}

// Renders `children` into document.body - the same mechanism Modal/Drawer/
// Toast use internally, exposed for a custom overlay you build yourself.
export default function Portal({ children }: PortalProps) {
  if (typeof document === 'undefined') return null
  return createPortal(children, document.body)
}
