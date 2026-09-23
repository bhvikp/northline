export interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  swatches?: string[]
  label?: string
}

const DEFAULT_SWATCHES = ['#8FB4F5', '#7FD8C9', '#C9A8F0', '#F5C88F', '#F19A9A', '#8FCB9E']

// Preset swatch grid plus a native color input for anything outside the
// palette - the native input keeps full OS color-picker behavior for free.
export default function ColorPicker({ value, onChange, swatches = DEFAULT_SWATCHES, label = 'Color' }: ColorPickerProps) {
  return (
    <div className="color-picker" role="group" aria-label={label}>
      {swatches.map((color) => (
        <button
          key={color}
          type="button"
          className={`color-picker__swatch${color.toLowerCase() === value.toLowerCase() ? ' color-picker__swatch--selected' : ''}`}
          style={{ background: color }}
          aria-label={color}
          aria-pressed={color.toLowerCase() === value.toLowerCase()}
          onClick={() => onChange(color)}
        />
      ))}
      <label className="color-picker__custom">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Custom color" />
      </label>
    </div>
  )
}
