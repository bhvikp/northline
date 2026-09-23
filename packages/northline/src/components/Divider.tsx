import type { ReactNode } from 'react'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: ReactNode
}

// Plain visual separator - every gap in the kit was faking this with a raw
// border-bottom; this is the reusable version, with an optional centered
// label (e.g. "OR").
export default function Divider({ orientation = 'horizontal', label }: DividerProps) {
  if (orientation === 'vertical') return <span className="nl-divider nl-divider--vertical" role="separator" />
  if (!label) return <hr className="nl-divider" />

  return (
    <div className="nl-divider--labeled" role="separator">
      <span className="nl-divider--labeled__line" />
      <span className="nl-divider--labeled__text">{label}</span>
      <span className="nl-divider--labeled__line" />
    </div>
  )
}
