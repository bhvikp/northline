import { useEffect, useMemo, useRef, useState } from 'react'

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  options: ComboboxOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
}

// A searchable select - free-text filters the option list as you type,
// distinct from Select's fixed listbox. Typing a value with no exact option
// match still calls onChange with the raw text on blur (useful for
// "pick from these or type your own" filters); pick from the menu to commit
// a known option's value and label.
export default function Combobox({ value, onChange, options, label, placeholder = 'Search...', disabled = false }: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  const pick = (option: ComboboxOption) => {
    onChange(option.value)
    setOpen(false)
  }

  return (
    <div className="select combobox" ref={rootRef}>
      {open ? (
        <input
          autoFocus
          className="select__trigger"
          value={query}
          placeholder={selectedLabel || placeholder}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <button
          type="button"
          className="select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          <span>{selectedLabel || <span className="combobox__placeholder">{placeholder}</span>}</span>
          <span className="select__chevron" aria-hidden="true" />
        </button>
      )}
      {open && (
        <ul className="select__menu" role="listbox" aria-label={label}>
          {filtered.length === 0 && <li className="select__option combobox__empty">No matches</li>}
          {filtered.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`select__option${o.value === value ? ' select__option--selected' : ''}`}
              onClick={() => pick(o)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
