export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

// Text input with a leading search icon and a clear button that appears
// once there's something to clear - the thing that sits above every Table.
export default function SearchInput({ value, onChange, placeholder = 'Search...', disabled = false }: SearchInputProps) {
  return (
    <div className="search-input">
      <span className="search-input__icon" aria-hidden="true" />
      <input
        className="search-input__field"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {value && (
        <button type="button" className="search-input__clear" aria-label="Clear search" onClick={() => onChange('')}>
          ×
        </button>
      )}
    </div>
  )
}
