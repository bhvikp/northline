import { useId, type ReactNode } from 'react'

export interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: ReactNode
  disabled?: boolean
  /** Formats the value shown next to the label, e.g. `(v) => `${v}%`` */
  formatValue?: (value: number) => ReactNode
}

// Themed range slider - stays a native <input type="range"> (styled via
// ::-webkit-slider-thumb/::-moz-range-thumb in theme.css) rather than a
// from-scratch drag implementation, so keyboard/touch behavior comes free.
export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  formatValue,
}: SliderProps) {
  const inputId = useId()
  const pct = ((value - min) / (max - min || 1)) * 100

  return (
    <div className="field">
      {label && (
        <div className="progress__label-row">
          <label className="field__label" htmlFor={inputId}>{label}</label>
          <span className="progress__value">{formatValue ? formatValue(value) : value}</span>
        </div>
      )}
      <input
        id={inputId}
        type="range"
        className="slider"
        style={{ ['--slider-fill' as string]: `${pct}%` }}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
