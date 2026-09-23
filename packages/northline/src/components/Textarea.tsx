import { useId, type ReactNode, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value' | 'id'> {
  label?: ReactNode
  value: string
  onChange: (value: string) => void
  error?: boolean
  hint?: ReactNode
  id?: string
}

// Multi-line counterpart to Input - same label/hint/error shape.
export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  hint,
  rows = 4,
  id,
  ...rest
}: TextareaProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <textarea
        id={inputId}
        className="field__input field__input--textarea"
        rows={rows}
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
