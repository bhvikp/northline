import type { ReactNode } from 'react'

export interface CardProps {
  title?: ReactNode
  children: ReactNode
  className?: string
}

// Plain flat card - the same surface ScoreCard/ChartCard build on, exposed
// directly for anything that just needs a bordered white/dark panel.
export default function Card({ title, children, className }: CardProps) {
  return (
    <div className={`card${className ? ` ${className}` : ''}`}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}
