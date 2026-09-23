import type { Key, ReactNode } from 'react'
import type { BadgeTone } from './Badge'

export interface TimelineItem {
  id: Key
  title: ReactNode
  timestamp?: ReactNode
  description?: ReactNode
  tone?: Exclude<BadgeTone, 'neutral'>
}

export interface TimelineProps {
  items: TimelineItem[]
}

// Vertical activity/event feed - a connected line of dots, one per event.
export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={item.id} className="timeline__item">
          <div className="timeline__rail">
            <span className={`timeline__dot${item.tone ? ` timeline__dot--${item.tone}` : ''}`} />
            {i < items.length - 1 && <span className="timeline__line" />}
          </div>
          <div className="timeline__content">
            <div className="timeline__header">
              <span className="timeline__title">{item.title}</span>
              {item.timestamp && <span className="timeline__timestamp">{item.timestamp}</span>}
            </div>
            {item.description && <div className="timeline__description">{item.description}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
