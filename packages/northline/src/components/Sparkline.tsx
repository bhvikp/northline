export interface SparklineProps {
  data?: number[]
  color?: string
  height?: number
}

// Minimal inline SVG sparkline - no axes, no library, just a smoothed polyline
// tracing a short trend under a scorecard value.
export default function Sparkline({ data, color = '#8FB4F5', height = 36 }: SparklineProps) {
  if (!data || data.length < 2) return null

  const width = 200
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const padY = 4

  const points = data.map((v, i): [number, number] => {
    const x = (i / (data.length - 1)) * width
    const y = padY + (1 - (v - min) / range) * (height - padY * 2)
    return [x, y]
  })

  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

  return (
    <svg className="score-card__sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
