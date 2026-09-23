import type { ReactNode } from 'react'

export interface FieldsetProps {
  label?: ReactNode
  hint?: ReactNode
  error?: boolean
  htmlFor?: string
  children: ReactNode
}

// The label+hint+error chrome that Input/Textarea each bake in already -
// reach for Fieldset when wrapping a custom or third-party control that
// needs the same shape without reimplementing it.
export default function Fieldset({ label, hint, error = false, htmlFor, children }: FieldsetProps) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      {label && (
        <label className="field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}
