import Icon from './Icon'

export interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  disabled?: boolean
}

// Quantity input with +/- buttons around a numeric field, clamped to
// [min, max].
export default function NumberStepper({ value, onChange, min = -Infinity, max = Infinity, step = 1, label, disabled = false }: NumberStepperProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  const set = (v: number) => onChange(clamp(v))

  return (
    <div className="number-stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="number-stepper__btn"
        aria-label="Decrease"
        disabled={disabled || value <= min}
        onClick={() => set(value - step)}
      >
        <Icon name="minus" size={13} />
      </button>
      <input
        className="number-stepper__field"
        type="number"
        value={value}
        min={min === -Infinity ? undefined : min}
        max={max === -Infinity ? undefined : max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const next = Number(e.target.value)
          if (!Number.isNaN(next)) set(next)
        }}
      />
      <button
        type="button"
        className="number-stepper__btn"
        aria-label="Increase"
        disabled={disabled || value >= max}
        onClick={() => set(value + step)}
      >
        <Icon name="plus" size={13} />
      </button>
    </div>
  )
}
