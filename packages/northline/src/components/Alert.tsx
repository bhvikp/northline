import type { ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  onDismiss?: () => void
}

const ICONS: Record<AlertTone, IconName> = { info: 'info', success: 'check', warning: 'warning', danger: 'close' }

// Persistent inline status banner - distinct from Toast (transient,
// floating) and Badge (a tiny pill). Use this for "there's a warning sitting
// in the page" rather than a one-off notification.
export default function Alert({ tone = 'info', title, children, onDismiss }: AlertProps) {
  return (
    <div className={`alert alert--${tone}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="alert__icon" aria-hidden="true">
        <Icon name={ICONS[tone]} size={12} color="var(--neutral-0)" />
      </span>
      <div className="alert__body">
        {title && <div className="alert__title">{title}</div>}
        {children && <div className="alert__message">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="alert__dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  )
}
