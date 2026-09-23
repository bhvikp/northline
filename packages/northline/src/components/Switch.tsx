import { useId, type ReactNode } from 'react'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
}

// Themed toggle switch. The native checkbox stays in the DOM (visually
// hidden) so keyboard/screen-reader behavior comes for free.
export default function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  const inputId = useId()

  return (
    <label
      htmlFor={inputId}
      className={`switch${checked ? ' switch--checked' : ''}${disabled ? ' switch--disabled' : ''}`}
    >
      <input
        id={inputId}
        type="checkbox"
        className="switch__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="switch__control" aria-hidden="true" />
      {label && <span className="switch__label">{label}</span>}
    </label>
  )
}
