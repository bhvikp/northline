export interface SegmentedOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentedControlProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  label?: string
}

// A button-group toggle for a small, always-visible set of mutually
// exclusive options - lighter weight than Tabs (no content-panel switching
// semantics, just a single value).
export default function SegmentedControl({ options, value, onChange, label = 'Options' }: SegmentedControlProps) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          disabled={o.disabled}
          className={`segmented__option${o.value === value ? ' segmented__option--active' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
