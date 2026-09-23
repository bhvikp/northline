import type { ReactNode } from 'react'
import type { BadgeTone } from './Badge'

export interface GaugeProps {
  value: number
  max?: number
  tone?: Exclude<BadgeTone, 'neutral'>
  size?: number
  label?: ReactNode
}

// Circular counterpart to ProgressBar - a ring plus the value/label centered
// inside it. Pure SVG, no library, sized via `size`.
export default function Gauge({ value, max = 100, tone = 'blue', size = 96, label }: GaugeProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct / 100)

  return (
    <div className="gauge" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--neutral-100)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`var(--chart-${tone})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="gauge__center">
        <span className="gauge__value">{Math.round(pct)}%</span>
        {label && <span className="gauge__label">{label}</span>}
      </div>
    </div>
  )
}
