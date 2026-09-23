import type { ReactNode } from 'react'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: 'top' | 'bottom'
}

// Generic tooltip - wraps any single child element, shown on hover/focus of
// that child. InfoTooltip is the fixed "(i) icon" special case of this;
// reach for Tooltip when the trigger isn't that icon.
export default function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  return (
    <span className="tooltip-wrapper">
      {children}
      <span className={`tooltip-wrapper__bubble tooltip-wrapper__bubble--${placement}`} role="tooltip">
        {content}
      </span>
    </span>
  )
}
