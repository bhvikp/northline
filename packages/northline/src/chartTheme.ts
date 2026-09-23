// Shared Chart.js styling/helpers, reused across every sub-tab's charts so
// they read as one consistent system rather than each hand-rolling options.
import type { ChartOptions } from 'chart.js'

// Minimal light-dashboard palette: pastel blue/teal/purple/orange, matching
// flat white cards with thin borders rather than a saturated brand theme.
// Kept identical across themes - these pastels read fine on both light and
// dark surfaces, unlike grid lines/tooltips/axis text below.
export const PALETTE = ['#8FB4F5', '#7FD8C9', '#C9A8F0', '#F5C88F', '#F19A9A', '#A9B4F0', '#8FCBEE', '#F5AFD1', '#B9DE9E']

export const AXIS_TICK_FONT = { size: 11, family: "'IBM Plex Mono', monospace" }

export interface ChartColors {
  gridColor: string
  axisColor: string
  tooltip: {
    backgroundColor: string
    titleColor: string
    bodyColor: string
    borderColor: string
  }
}

const LIGHT_CHART_COLORS: ChartColors = {
  gridColor: '#F1F2F5',
  axisColor: '#9CA3AF',
  tooltip: {
    backgroundColor: '#FFFFFF',
    titleColor: '#0B0D12',
    bodyColor: '#4B5563',
    borderColor: '#E7E9EE',
  },
}

// Canvas fillStyle/strokeStyle can't resolve CSS custom properties the way
// DOM styles can, so Chart.js needs actual resolved colors. This reads
// Northline's current theme tokens (light or dark, whichever is active on
// <html> right now) via getComputedStyle and returns plain color strings -
// call it fresh whenever you (re)build chart options, not once at import
// time, so it reflects the theme active at that moment.
export function getChartColors(): ChartColors {
  if (typeof document === 'undefined') return LIGHT_CHART_COLORS
  const styles = getComputedStyle(document.documentElement)
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback

  return {
    gridColor: read('--neutral-100', LIGHT_CHART_COLORS.gridColor),
    axisColor: read('--neutral-400', LIGHT_CHART_COLORS.axisColor),
    tooltip: {
      backgroundColor: read('--neutral-0', LIGHT_CHART_COLORS.tooltip.backgroundColor),
      titleColor: read('--neutral-1000', LIGHT_CHART_COLORS.tooltip.titleColor),
      bodyColor: read('--neutral-600', LIGHT_CHART_COLORS.tooltip.bodyColor),
      borderColor: read('--card-border', LIGHT_CHART_COLORS.tooltip.borderColor),
    },
  }
}

// Snapshot of getChartColors() at module-load time - convenient for a
// one-off chart built before the page ever toggles theme, but it will NOT
// update on a later theme change. Prefer getChartColors() (or just
// dualAxisOptions(), which calls it internally) for anything long-lived.
export const AXIS_COLOR = getChartColors().axisColor
export const GRID_COLOR = getChartColors().gridColor

export const TOOLTIP_OPTS = {
  ...getChartColors().tooltip,
  borderWidth: 1,
  padding: 8,
  cornerRadius: 8,
  titleFont: { size: 12, weight: 600, family: "'Space Grotesk', sans-serif" },
  bodyFont: { size: 12, family: "'IBM Plex Mono', monospace" },
}

function buildTooltipOpts() {
  return {
    ...getChartColors().tooltip,
    borderWidth: 1,
    padding: 8,
    cornerRadius: 8,
    titleFont: { size: 12, weight: 600, family: "'Space Grotesk', sans-serif" },
    bodyFont: { size: 12, family: "'IBM Plex Mono', monospace" },
  }
}

const LEGEND_LABELS = { boxWidth: 10, font: { size: 11, family: "'IBM Plex Mono', monospace" } }

// Notifies `callback` whenever the active theme flips - either the OS/browser
// `prefers-color-scheme` or an explicit `data-theme` attribute on <html> (see
// the README's dark mode section). Use it to rebuild/re-apply chart options
// (dualAxisOptions() + TOOLTIP_OPTS reread the current theme each call) and
// call `chart.update()` so already-rendered charts repaint. Returns an
// unsubscribe function.
export function onThemeChange(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', callback)

  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  return () => {
    media.removeEventListener('change', callback)
    observer.disconnect()
  }
}

export interface DualAxisOptionsOpts {
  rotateXTicks?: boolean
  maxTicks?: number
  longLabels?: boolean
}

// Shared options for count/value-bars + percentage-line combo charts (Weekly
// Trend, Failure Pareto, Cost run-rate): left axis is a raw value, right
// axis is 0-100%. Returned as `ChartOptions<'bar'>` since that's the widest
// type callers pass to <Chart type="bar" ... /> for a bar+line combo. Reads
// the active theme's colors fresh on every call - call this again (and
// chart.update()) after a theme change rather than reusing a stale result.
export function dualAxisOptions(
  rightUnit: string,
  { rotateXTicks = false, maxTicks, longLabels = false }: DualAxisOptionsOpts = {},
): ChartOptions<'bar'> {
  const { gridColor, axisColor } = getChartColors()

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { bottom: rotateXTicks ? 8 : 0 } },
    animation: { duration: 500, easing: 'easeOutQuad' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom', labels: LEGEND_LABELS },
      tooltip: buildTooltipOpts(),
    },
    scales: {
      x: {
        ticks: {
          font: AXIS_TICK_FONT,
          color: axisColor,
          autoSkip: true,
          // Long category names get a free-fitting rotation (Chart.js picks
          // the smallest angle, up to 90°, that avoids overlap) instead of a
          // fixed angle that only suits short labels.
          ...(longLabels
            ? { maxRotation: 90, minRotation: 0 }
            : rotateXTicks
              ? { maxRotation: 35, minRotation: 35 }
              : {}),
          ...(maxTicks ? { maxTicksLimit: maxTicks } : {}),
        },
        grid: { color: gridColor },
      },
      y: {
        position: 'left',
        beginAtZero: true,
        ticks: { font: AXIS_TICK_FONT, color: axisColor },
        grid: { color: gridColor },
      },
      y1: {
        position: 'right',
        min: 0,
        max: 100,
        ticks: { font: AXIS_TICK_FONT, color: axisColor, callback: (v: number | string) => `${v}${rightUnit}` },
        grid: { drawOnChartArea: false },
      },
    },
  } as ChartOptions<'bar'>
}

export interface DonutOptionsOpts {
  cutout?: string | number
  showLegend?: boolean
}

// Options for a donut/pie chart (Distribution-by-type widgets). Pair with
// `<Pie type="doughnut" .../>` or react-chartjs-2's `<Doughnut />`.
export function donutOptions({ cutout = '65%', showLegend = true }: DonutOptionsOpts = {}): ChartOptions<'doughnut'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout,
    animation: { duration: 500, easing: 'easeOutQuad' },
    plugins: {
      legend: showLegend ? { position: 'bottom', labels: LEGEND_LABELS } : { display: false },
      tooltip: buildTooltipOpts(),
    },
  } as ChartOptions<'doughnut'>
}

export interface HorizontalBarOptionsOpts {
  maxTicks?: number
  beginAtZero?: boolean
}

// Options for a horizontal bar chart (ranked lists - top failure reasons,
// slowest jobs, etc). Pair with `<Bar options={...} />` and `indexAxis: 'y'`
// is already set here, so datasets don't need to repeat it.
export function horizontalBarOptions({ maxTicks, beginAtZero = true }: HorizontalBarOptionsOpts = {}): ChartOptions<'bar'> {
  const { gridColor, axisColor } = getChartColors()

  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: 'easeOutQuad' },
    plugins: {
      legend: { display: false },
      tooltip: buildTooltipOpts(),
    },
    scales: {
      x: {
        beginAtZero,
        ticks: { font: AXIS_TICK_FONT, color: axisColor, ...(maxTicks ? { maxTicksLimit: maxTicks } : {}) },
        grid: { color: gridColor },
      },
      y: {
        ticks: { font: AXIS_TICK_FONT, color: axisColor },
        grid: { display: false },
      },
    },
  } as ChartOptions<'bar'>
}

export interface AreaOptionsOpts {
  maxTicks?: number
  beginAtZero?: boolean
  unit?: string
}

// Options for a single filled-line/area trend chart - simpler than
// dualAxisOptions when there's just one series and no combo axis. Pair with
// a line dataset that sets `fill: true`.
export function areaOptions({ maxTicks, beginAtZero = true, unit = '' }: AreaOptionsOpts = {}): ChartOptions<'line'> {
  const { gridColor, axisColor } = getChartColors()

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: 'easeOutQuad' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: buildTooltipOpts(),
    },
    scales: {
      x: {
        ticks: { font: AXIS_TICK_FONT, color: axisColor, autoSkip: true, ...(maxTicks ? { maxTicksLimit: maxTicks } : {}) },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero,
        ticks: { font: AXIS_TICK_FONT, color: axisColor, callback: (v: number | string) => `${v}${unit}` },
        grid: { color: gridColor },
      },
    },
  } as ChartOptions<'line'>
}

export interface StackedBarOptionsOpts {
  maxTicks?: number
  rotateXTicks?: boolean
}

// Options for a stacked bar chart (composition-over-time - volume by status,
// spend by category). Sets `stacked: true` on both axes so datasets don't
// need to repeat it.
export function stackedBarOptions({ maxTicks, rotateXTicks = false }: StackedBarOptionsOpts = {}): ChartOptions<'bar'> {
  const { gridColor, axisColor } = getChartColors()

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: 'easeOutQuad' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom', labels: LEGEND_LABELS },
      tooltip: buildTooltipOpts(),
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: AXIS_TICK_FONT,
          color: axisColor,
          autoSkip: true,
          ...(rotateXTicks ? { maxRotation: 35, minRotation: 35 } : {}),
          ...(maxTicks ? { maxTicksLimit: maxTicks } : {}),
        },
        grid: { color: gridColor },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { font: AXIS_TICK_FONT, color: axisColor },
        grid: { color: gridColor },
      },
    },
  } as ChartOptions<'bar'>
}

// Options for a radar/spider chart (multi-dimensional comparisons - e.g.
// this segment's scores across several metrics at once).
export function radarOptions(): ChartOptions<'radar'> {
  const { gridColor, axisColor } = getChartColors()

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500, easing: 'easeOutQuad' },
    plugins: {
      legend: { position: 'bottom', labels: LEGEND_LABELS },
      tooltip: buildTooltipOpts(),
    },
    scales: {
      r: {
        angleLines: { color: gridColor },
        grid: { color: gridColor },
        pointLabels: { font: AXIS_TICK_FONT, color: axisColor },
        ticks: { font: AXIS_TICK_FONT, color: axisColor, backdropColor: 'transparent' },
      },
    },
  } as ChartOptions<'radar'>
}

// Trailing rolling average of series[i][key] over the last windowSize points.
export function rollingAverage<T extends Record<string, unknown>>(
  series: T[],
  key: keyof T,
  windowSize: number,
): (number | null)[] {
  return series.map((_, i) => {
    const start = Math.max(0, i - windowSize + 1)
    const window = series.slice(start, i + 1).filter((d) => d[key] != null)
    if (!window.length) return null
    const avg = window.reduce((sum, d) => sum + (d[key] as number), 0) / window.length
    return Number(avg.toFixed(1))
  })
}
