import { Component, type ErrorInfo, type ReactNode } from 'react'
import Alert from './Alert'
import Button from './Button'

export interface ErrorBoundaryProps {
  children: ReactNode
  /** Custom fallback UI. Given the caught error and a `reset()` to retry. */
  fallback?: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  error: Error | null
}

// React error boundaries must be class components - hooks can't implement
// getDerivedStateFromError/componentDidCatch. Wrap a section of the app
// that might throw during render (a risky third-party widget, a route) so
// one broken subtree doesn't blank the whole page.
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    if (this.props.fallback) return this.props.fallback(error, this.reset)

    return (
      <Alert tone="danger" title="Something went wrong">
        <div className="error-boundary__message">{error.message}</div>
        <div className="error-boundary__actions">
          <Button variant="secondary" size="sm" onClick={this.reset}>Try again</Button>
        </div>
      </Alert>
    )
  }
}
