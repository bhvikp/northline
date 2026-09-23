import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'> {
  label?: ReactNode
  value: string
  onChange: (value: string) => void
  error?: boolean
  hint?: ReactNode
  id?: string
}

// Plain themed text field with an optional label and hint/error line.
// `error` shows the hint (if any) in the error tone and gives the input an
// error border, independent of whether `hint` is also passed.
export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  error = false,
  hint,
  id,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        className="field__input"
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error || undefined}
        {...rest}
      />
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}
