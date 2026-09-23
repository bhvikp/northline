import { useId, type ReactNode } from 'react'

export interface RadioProps {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label?: ReactNode
  disabled?: boolean
}

// A single themed radio. Group several under one `name` and shared
// value/onChange to build a radio group - see RadioGroup for the common case.
export function Radio({ name, value, checked, onChange, label, disabled = false }: RadioProps) {
  const inputId = useId()

  return (
    <label htmlFor={inputId} className={`radio${disabled ? ' radio--disabled' : ''}`}>
      <input
        id={inputId}
        type="radio"
        name={name}
        className="radio__input"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <span className="radio__dot" aria-hidden="true" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  )
}

export interface RadioOption {
  value: string
  label?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  disabled?: boolean
}

export default function RadioGroup({ name, value, onChange, options, disabled = false }: RadioGroupProps) {
  return (
    <div className="radio-group" role="radiogroup">
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          checked={value === o.value}
          onChange={onChange}
          label={o.label}
          disabled={disabled || o.disabled}
        />
      ))}
    </div>
  )
}
