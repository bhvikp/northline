// Chart.js registration for the Northline theme. Call installCharts() once,
// at app startup, before any chart renders (e.g. top of main.jsx).
import { Chart as ChartJS, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

let installed = false

export function installCharts() {
  if (installed) return
  installed = true
  ChartJS.register(...registerables, ChartDataLabels)
  // Datalabels would otherwise render on every chart by default; opt in per-chart instead.
  ChartJS.defaults.set('plugins.datalabels', { display: false })
}

export default ChartJS
