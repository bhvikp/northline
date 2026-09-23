import { useId, useState, type ReactNode } from 'react'
import Icon from './Icon'

export interface PasswordInputProps {
  label?: ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  hint?: ReactNode
  id?: string
  autoComplete?: string
}

// Input's password-specific variant - a trailing eye/eye-off button toggles
// between masked and plain text, same label/hint/error shape as Input.
export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  hint,
  id,
  autoComplete = 'current-password',
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <div className="password-input">
        <input
          id={inputId}
          className="field__input password-input__field"
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error || undefined}
        />
        <button
          type="button"
          className="password-input__toggle"
          aria-label={visible ? 'Hide password' : 'Show password'}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
        >
          <Icon name={visible ? 'eye-off' : 'eye'} size={16} />
        </button>
      </div>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}
