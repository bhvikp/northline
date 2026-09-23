import type { CSSProperties, ReactNode } from 'react'

export interface StackProps {
  direction?: 'row' | 'column'
  gap?: number
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
  children: ReactNode
  className?: string
}

// Flex layout primitive with a consistent gap - the reusable base behind
// VStack/HStack, instead of hand-rolled `style={{ display: 'flex' }}`.
export default function Stack({ direction = 'column', gap = 12, align, justify, wrap = false, children, className }: StackProps) {
  return (
    <div
      className={`nl-stack${className ? ` ${className}` : ''}`}
      style={{
        display: 'flex',
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
      }}
    >
      {children}
    </div>
  )
}

export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack {...props} direction="column" />
}

export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack {...props} direction="row" />
}
