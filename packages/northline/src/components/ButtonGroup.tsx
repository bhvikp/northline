import type { ReactNode } from 'react'

export interface ButtonGroupProps {
  children: ReactNode
}

// Visually merges adjacent Buttons into one segmented-looking group (shared
// border, squared-off inner corners) - distinct from SegmentedControl,
// which carries single-value selection state. This is purely a visual
// wrapper around independent Button actions.
export default function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className="button-group">{children}</div>
}
