export interface ChartLegendItem {
  label: string
  color: string
}

export interface ChartLegendProps {
  items: ChartLegendItem[]
  hidden?: string[]
  onToggle?: (label: string) => void
}

// A themed HTML legend to pair with a Chart.js canvas whose own legend is
// switched off (`legend: { display: false }` in the chart's options) -
// canvas-drawn legends can't pick up hover/focus styling or the rest of the
// component kit's interaction language. Click a swatch to toggle a series
// (wire `onToggle` to `chart.setDatasetVisibility` + `chart.update()`).
export default function ChartLegend({ items, hidden = [], onToggle }: ChartLegendProps) {
  return (
    <ul className="chart-legend" role="list">
      {items.map((item) => {
        const isHidden = hidden.includes(item.label)
        return (
          <li key={item.label}>
            <button
              type="button"
              className={`chart-legend__item${isHidden ? ' chart-legend__item--hidden' : ''}${onToggle ? '' : ' chart-legend__item--static'}`}
              onClick={onToggle ? () => onToggle(item.label) : undefined}
              disabled={!onToggle}
            >
              <span className="chart-legend__swatch" style={{ background: item.color }} aria-hidden="true" />
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
