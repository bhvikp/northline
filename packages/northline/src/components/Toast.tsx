import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import type { BadgeTone } from './Badge'
import Icon from './Icon'

export interface ToastOptions {
  tone?: BadgeTone
  duration?: number
}

export interface ToastContextValue {
  show: (message: ReactNode, options?: ToastOptions) => number
  dismiss: (id: number) => void
}

interface ToastEntry {
  id: number
  message: ReactNode
  tone: BadgeTone
}

const ToastContext = createContext<ToastContextValue | null>(null)

let idCounter = 0

// Wrap the app once (e.g. alongside installCharts, at the top of main.jsx)
// to get a `show(message, opts)` toast function anywhere via useToast().
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const show = useCallback((message: ReactNode, { tone = 'neutral', duration = 4000 }: ToastOptions = {}) => {
    const id = (idCounter += 1)
    setToasts((prev) => [...prev, { id, message, tone }])
    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration)
      timers.current.set(id, timer)
    }
    return id
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div className="toast-stack" role="status" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className={`toast${t.tone !== 'neutral' ? ` toast--${t.tone}` : ''}`}>
              <span className="toast__message">{t.message}</span>
              <button type="button" className="toast__close" aria-label="Dismiss" onClick={() => dismiss(t.id)}>
                <Icon name="close" size={14} />
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

// Returns { show(message, { tone, duration }), dismiss(id) }. `tone` is one
// of neutral/blue/teal/purple/orange/red/green (same tones as Badge).
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
