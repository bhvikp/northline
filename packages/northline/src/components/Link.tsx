import type { AnchorHTMLAttributes, ReactNode } from 'react'

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  children: ReactNode
  external?: boolean
}

// Themed anchor. `external` adds target="_blank" + rel="noopener noreferrer"
// - for an SPA router Link, wrap that component's `as`/render-prop instead
// of using this directly, or copy the "nl-link" className onto it.
export default function Link({ children, external = false, ...rest }: LinkProps) {
  return (
    <a
      className="nl-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
