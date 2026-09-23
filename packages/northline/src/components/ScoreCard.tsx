import type { ReactNode } from 'react'
import Sparkline from './Sparkline'

export interface ScoreCardProps {
  label: ReactNode
  value: ReactNode
  accent: 'indigo' | 'green' | 'rose' | 'cyan'
  sub?: ReactNode
  direction?: 'up' | 'down'
  trend?: number[]
}

export default function ScoreCard({ label, value, accent, sub, direction, trend }: ScoreCardProps) {
  return (
    <div className={`score-card score-card--${accent}`}>
      <span className="score-card__label">{label}</span>
      <span className="score-card__value">{value}</span>
      {sub && (
        <span className={`score-card__sub${direction ? ` score-card__sub--${direction}` : ''}`}>{sub}</span>
      )}
      {trend && <Sparkline data={trend} color="var(--accent)" />}
    </div>
  )
}
