import type { CSSProperties, ReactNode } from 'react'

export interface CanvasProps {
  children: ReactNode
  className?: string
  /** Escape hatch, e.g. to constrain height when embedding a Canvas demo inside another layout. */
  style?: CSSProperties
}

// Full-viewport app shell wrapper: sets the page background and a min-height
// flex column so a Navbar/BottomNav and scrollable content stack correctly,
// with safe-area padding for notches/home-indicators on mobile. Distinct
// from Container, which only constrains content width - Canvas is the
// outermost root most single-page apps mount into (wrap it around
// <Navbar/>, your routed content, and <BottomNav/>).
export default function Canvas({ children, className, style }: CanvasProps) {
  return (
    <div className={`nl-canvas${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </div>
  )
}
