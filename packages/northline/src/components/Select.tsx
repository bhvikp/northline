import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface SelectOption {
  value: string
  label: ReactNode
}

interface SelectBaseProps {
  options: SelectOption[]
  label?: string
}

export interface SingleSelectProps extends SelectBaseProps {
  multiple?: false
  value: string
  onChange: (value: string) => void
}

export interface MultiSelectProps extends SelectBaseProps {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

export type SelectProps = SingleSelectProps | MultiSelectProps

// A fully custom dropdown - native <select> option popups are an OS-level
// overlay that CSS can't restyle in most browsers, so the whole menu is
// built here as regular themed DOM instead.
//
// Single-select: value is a scalar, onChange(newValue), menu closes on pick.
// Multi-select (multiple prop): value is an array, onChange(newArray), menu
// stays open so several options can be toggled in one pass. The first option
// is treated as an "all" clear-state: picking it deselects everything else,
// and picking anything else drops it.
export default function Select(props: SelectProps) {
  const { options, label, multiple = false } = props
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

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

  const allValue = options[0]?.value
  const selectedValues = props.multiple ? props.value : [props.value]

  const triggerLabel = (): ReactNode => {
    if (!props.multiple) return options.find((o) => o.value === props.value)?.label ?? props.value
    const value = props.value
    if (!value.length || value.includes(allValue as string)) return options[0]?.label
    if (value.length === 1) return options.find((o) => o.value === value[0])?.label ?? value[0]
    return `${value.length} selected`
  }

  const toggle = (optionValue: string) => {
    if (!props.multiple) {
      props.onChange(optionValue)
      setOpen(false)
      return
    }
    if (optionValue === allValue) {
      props.onChange([allValue as string])
      return
    }
    const withoutAll = props.value.filter((v) => v !== allValue)
    const next = withoutAll.includes(optionValue)
      ? withoutAll.filter((v) => v !== optionValue)
      : [...withoutAll, optionValue]
    props.onChange(next.length ? next : [allValue as string])
  }

  return (
    <div className="select" ref={rootRef}>
      <button
        type="button"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{triggerLabel()}</span>
        <span className="select__chevron" aria-hidden="true" />
      </button>
      {open && (
        <ul className="select__menu" role="listbox" aria-multiselectable={multiple} aria-label={label}>
          {options.map((o) => {
            const isSelected = selectedValues.includes(o.value)
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={isSelected}
                className={`select__option${isSelected ? ' select__option--selected' : ''}${multiple ? ' select__option--multi' : ''}`}
                onClick={() => toggle(o.value)}
              >
                {multiple && <span className={`select__checkbox${isSelected ? ' select__checkbox--checked' : ''}`} aria-hidden="true" />}
                {o.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
