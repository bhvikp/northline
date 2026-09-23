import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'blue' | 'teal' | 'purple' | 'orange' | 'red' | 'green'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  dot?: boolean
}

// Small status pill. `tone` picks the pastel background/text pair; `dot`
// prepends a filled circle (e.g. for live/online indicators).
export default function Badge({ children, tone = 'neutral', dot = false }: BadgeProps) {
  return (
    <span className={`badge${tone !== 'neutral' ? ` badge--${tone}` : ''}`}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
