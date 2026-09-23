import type { ReactNode } from 'react'
import type { BadgeTone } from './Badge'

export interface ProgressBarProps {
  value: number
  max?: number
  tone?: Exclude<BadgeTone, 'neutral'>
  label?: ReactNode
}

// Linear progress/quota bar. value/max define the fill percentage; `tone`
// picks the fill color (same tones as Badge). `label` renders a caption row
// with the value shown as a percentage on the right.
export default function ProgressBar({ value, max = 100, tone = 'blue', label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div className="progress">
      {label && (
        <div className="progress__label-row">
          <span className="progress__label">{label}</span>
          <span className="progress__value">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="progress__track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className={`progress__fill progress__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
