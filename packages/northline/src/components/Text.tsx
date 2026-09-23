import type { ElementType, ReactNode } from 'react'

export interface TextProps {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'accent' | 'danger'
  mono?: boolean
  children: ReactNode
  className?: string
}

// Generic text primitive - the reusable base every other component's own
// label/value text is a specific case of. Use this for arbitrary page copy
// instead of hand-rolling font-family/size/color inline.
export default function Text({
  as = 'p',
  size = 'md',
  weight = 'regular',
  color = 'default',
  mono = false,
  children,
  className,
}: TextProps) {
  const Tag = as as ElementType
  return (
    <Tag
      className={`nl-text nl-text--${size} nl-text--${weight} nl-text--${color}${mono ? ' nl-text--mono' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}
