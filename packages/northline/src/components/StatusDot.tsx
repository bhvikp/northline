import type { ReactNode } from 'react'
import type { BadgeTone } from './Badge'

export interface StatusDotProps {
  tone?: Exclude<BadgeTone, 'neutral'>
  label?: ReactNode
  pulse?: boolean
}

// A bare colored indicator dot, with an optional label - denser than Badge
// for table cells/lists where a full pill would be too wide. `pulse` adds a
// soft glow animation for a "live" state.
export default function StatusDot({ tone = 'green', label, pulse = false }: StatusDotProps) {
  return (
    <span className="status-dot">
      <span className={`status-dot__dot status-dot__dot--${tone}${pulse ? ' status-dot__dot--pulse' : ''}`} aria-hidden="true" />
      {label && <span className="status-dot__label">{label}</span>}
    </span>
  )
}
