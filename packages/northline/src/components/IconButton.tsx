import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  label: string
}

// Icon-only button - Button's square counterpart, with its own compact
// padding (a plain Button with an icon child ends up with lopsided
// horizontal padding). `label` is required and becomes aria-label since
// there's no visible text.
export default function IconButton({ children, variant = 'ghost', size = 'md', label, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`icon-button icon-button--${variant} icon-button--${size}`}
      {...rest}
    >
      {children}
    </button>
  )
}
