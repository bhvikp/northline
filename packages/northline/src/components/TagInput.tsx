import { useId, useState, type KeyboardEvent } from 'react'

export interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
}

// Multi-value chip input - type and press Enter/comma to add a tag,
// Backspace on an empty field removes the last one.
export default function TagInput({ value, onChange, label, placeholder = 'Add a tag...', disabled = false }: TagInputProps) {
  const [draft, setDraft] = useState('')
  const inputId = useId()

  const commit = () => {
    const tag = draft.trim()
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setDraft('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Backspace' && !draft && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <div className={`tag-input${disabled ? ' tag-input--disabled' : ''}`}>
        {value.map((tag, i) => (
          <span key={tag} className="tag-input__tag">
            {tag}
            {!disabled && (
              <button type="button" aria-label={`Remove ${tag}`} onClick={() => removeAt(i)}>×</button>
            )}
          </span>
        ))}
        <input
          id={inputId}
          className="tag-input__field"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={commit}
          placeholder={value.length ? '' : placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
