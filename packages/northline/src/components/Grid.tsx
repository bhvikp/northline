import type { ReactNode } from 'react'

export interface GridProps {
  columns?: number
  gap?: number
  children: ReactNode
  className?: string
}

// Simple responsive-ish column grid - `columns` is the max column count on
// a wide viewport; each column gets a min-width derived from it (assuming a
// ~1200px container) so the grid wraps down on narrow viewports without
// needing explicit breakpoints.
export default function Grid({ columns = 12, gap = 16, children, className }: GridProps) {
  const minColWidth = Math.max(120, Math.floor(1200 / columns))

  return (
    <div
      className={`nl-grid${className ? ` ${className}` : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  )
}
