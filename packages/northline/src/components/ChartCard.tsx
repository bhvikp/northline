import { useEffect, useRef, type DragEvent, type ReactNode } from 'react'
import InfoTooltip from './InfoTooltip'
import Icon from './Icon'

export interface ChartCardSize {
  width: number
  height: number
}

export interface ChartCardProps {
  id: string
  title: ReactNode
  info?: string
  height?: number | string
  width?: number | string
  children: ReactNode
  onDragStart?: (e: DragEvent<HTMLDivElement>, id: string) => void
  onDragOver?: (id: string) => void
  onDrop?: (id: string) => void
  onDragEnd?: () => void
  onResize?: (id: string, size: ChartCardSize) => void
  registerRef?: (id: string, node: HTMLDivElement | null) => void
  isDragOver?: boolean
  isDragging?: boolean
  draggable?: boolean
}

// A dashboard widget: the whole card (not just the chart) can be resized by
// dragging its bottom-right corner, and reordered by dragging it onto another
// card - both native browser/DOM behaviors, no extra library. Size changes
// are reported via onResize so the parent can persist them.
export default function ChartCard({
  id,
  title,
  info,
  height = 320,
  width,
  children,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onResize,
  registerRef,
  isDragOver,
  isDragging,
  draggable = true,
}: ChartCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  // Keep the latest callback without making the effect below re-run on every
  // render - onResize is a fresh function each render, and ResizeObserver
  // fires an initial callback as soon as observe() is called, so depending on
  // onResize directly would tear down/recreate the observer forever.
  const onResizeRef = useRef(onResize)
  onResizeRef.current = onResize

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      // Read border-box size, matching the border-box width/height we set via
      // inline style (global box-sizing: border-box) - contentRect would be
      // smaller by the padding/border.
      const box = entry.borderBoxSize?.[0]
      const w = box ? box.inlineSize : el.getBoundingClientRect().width
      const h = box ? box.blockSize : el.getBoundingClientRect().height
      // A hidden tab (display: none) collapses its cards to 0x0 - that's not
      // a real resize, and persisting it would corrupt the saved layout the
      // next time this tab becomes visible again.
      if (w === 0 && h === 0) return
      onResizeRef.current?.(id, { width: Math.round(w), height: Math.round(h) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return (
    <div
      ref={(node) => {
        cardRef.current = node
        registerRef?.(id, node)
      }}
      className={`card chart-card${isDragOver ? ' chart-card--drag-over' : ''}${isDragging ? ' chart-card--dragging' : ''}`}
      style={{ height, width, flex: '0 0 auto' }}
      draggable={draggable}
      onDragStart={draggable && onDragStart ? (e) => onDragStart(e, id) : undefined}
      onDragOver={
        draggable && onDragOver
          ? (e) => {
              e.preventDefault()
              onDragOver(id)
            }
          : undefined
      }
      onDrop={
        draggable && onDrop
          ? (e) => {
              e.preventDefault()
              onDrop(id)
            }
          : undefined
      }
      onDragEnd={draggable && onDragEnd ? onDragEnd : undefined}
    >
      <h2 className="chart-card__title">
        {draggable && (
          <span className="chart-card__handle" title="Drag to reorder">
            <Icon name="drag-handle" size={14} />
          </span>
        )}
        {title}
        <InfoTooltip text={info} />
      </h2>
      <div className="chart-card__body">{children}</div>
    </div>
  )
}
