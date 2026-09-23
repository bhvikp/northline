import type { ReactNode } from 'react'

export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: ReactNode
  className?: string
}

// Centered max-width content wrapper - the outermost layout primitive most
// pages start from.
export default function Container({ size = 'lg', children, className }: ContainerProps) {
  return <div className={`nl-container nl-container--${size}${className ? ` ${className}` : ''}`}>{children}</div>
}
