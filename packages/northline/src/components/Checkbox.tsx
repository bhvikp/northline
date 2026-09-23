import { useId, type ReactNode } from 'react'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
}

// Standalone checkbox (Select has its own embedded one for multi-mode menus).
// The native input stays in the DOM (visually hidden) for free keyboard/SR
// behavior; the visible box is themed CSS driven by :checked.
export default function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  const inputId = useId()

  return (
    <label htmlFor={inputId} className={`checkbox${disabled ? ' checkbox--disabled' : ''}`}>
      <input
        id={inputId}
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="checkbox__box" aria-hidden="true" />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}
