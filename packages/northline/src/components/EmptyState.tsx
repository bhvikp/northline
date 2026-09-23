import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

// Centered placeholder for a zero-data view (empty table, no results, etc).
export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}
