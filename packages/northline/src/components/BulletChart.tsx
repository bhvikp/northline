import type { ReactNode } from 'react'
import type { BadgeTone } from './Badge'

export interface BulletChartProps {
  value: number
  target: number
  max?: number
  tone?: Exclude<BadgeTone, 'neutral'>
  label?: ReactNode
}

// A compact bullet graph: a filled bar for the actual value plus a tick mark
// for the target, in one horizontal track - reads a target-vs-actual
// comparison (quota attainment, SLA target, etc) faster than a bare
// ProgressBar since the target is a mark on the same scale, not a separate
// number.
export default function BulletChart({ value, target, max, tone = 'blue', label }: BulletChartProps) {
  const scaleMax = max ?? (Math.max(value, target) * 1.2 || 1)
  const valuePct = Math.max(0, Math.min(100, (value / scaleMax) * 100))
  const targetPct = Math.max(0, Math.min(100, (target / scaleMax) * 100))

  return (
    <div className="bullet">
      {label && (
        <div className="bullet__label-row">
          <span className="progress__label">{label}</span>
          <span className="progress__value">{value} / {target}</span>
        </div>
      )}
      <div className="bullet__track">
        <div className={`bullet__fill bullet__fill--${tone}`} style={{ width: `${valuePct}%` }} />
        <div className="bullet__target" style={{ left: `${targetPct}%` }} />
      </div>
    </div>
  )
}
