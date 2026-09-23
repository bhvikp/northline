import { useState } from 'react'
import Icon from './Icon'

export interface RatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  readOnly?: boolean
}

// Star rating input/display. Omit onChange (or pass readOnly) to render a
// static rating rather than an editable one.
export default function Rating({ value, onChange, max = 5, readOnly = false }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const isInteractive = !readOnly && !!onChange
  const displayValue = hovered ?? value

  return (
    <div
      className={`rating${isInteractive ? '' : ' rating--readonly'}`}
      role={isInteractive ? 'radiogroup' : 'img'}
      aria-label={`${value} out of ${max} stars`}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={`rating__star${n <= displayValue ? ' rating__star--filled' : ''}`}
          onMouseEnter={() => isInteractive && setHovered(n)}
          onClick={() => isInteractive && onChange?.(n)}
          role={isInteractive ? 'radio' : undefined}
          aria-checked={isInteractive ? n === value : undefined}
          aria-hidden={isInteractive ? undefined : true}
        >
          <Icon name="star" size={20} filled={n <= displayValue} />
        </span>
      ))}
    </div>
  )
}
