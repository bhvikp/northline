export interface SpinnerProps {
  size?: number
  label?: string
}

// Small themed loading spinner. `label` is read by screen readers only -
// visually the spinner speaks for itself.
export default function Spinner({ size = 32, label = 'Loading' }: SpinnerProps) {
  return <span className="spinner" role="status" aria-label={label} style={{ width: size, height: size }} />
}
