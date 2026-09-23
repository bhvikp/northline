export interface MiniBarProps {
  data?: number[]
  color?: string
  height?: number
}

// Minimal inline SVG bar sparkline - the bar-chart counterpart to Sparkline,
// same no-axes/no-library approach for a compact inline trend.
export default function MiniBar({ data, color = '#8FB4F5', height = 36 }: MiniBarProps) {
  if (!data || data.length === 0) return null

  const width = 200
  const max = Math.max(...data, 0) || 1
  const gap = 2
  const barWidth = width / data.length - gap

  return (
    <svg className="score-card__sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const barHeight = Math.max((v / max) * height, 1)
        const x = i * (barWidth + gap)
        const y = height - barHeight
        return <rect key={i} x={x} y={y} width={barWidth} height={barHeight} fill={color} rx={1} />
      })}
    </svg>
  )
}
