import type { ReactNode } from 'react'

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4
  children: ReactNode
  className?: string
}

// Generic heading primitive with Northline's display type scale - distinct
// from ScoreCard/Card's own hardcoded h2 sizing, which stays as-is for those
// specific components.
export default function Heading({ level = 2, children, className }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  return <Tag className={`nl-heading nl-heading--${level}${className ? ` ${className}` : ''}`}>{children}</Tag>
}
