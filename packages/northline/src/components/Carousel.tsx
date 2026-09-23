import { useEffect, useState, type ReactNode } from 'react'
import Icon from './Icon'

export interface CarouselProps {
  items: ReactNode[]
  autoPlay?: boolean
  interval?: number
}

// Single-item-at-a-time carousel with prev/next controls and dot
// indicators. Renders only the active item (no slide-track transform math),
// with a plain fade between slides.
export default function Carousel({ items, autoPlay = false, interval = 4000 }: CarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  if (!items.length) return null

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length)

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <div key={index} className="carousel__slide">{items[index]}</div>
        {items.length > 1 && (
          <>
            <button type="button" className="carousel__nav carousel__nav--prev" aria-label="Previous slide" onClick={() => go(-1)}>
              <Icon name="chevron-left" size={18} />
            </button>
            <button type="button" className="carousel__nav carousel__nav--next" aria-label="Next slide" onClick={() => go(1)}>
              <Icon name="chevron-right" size={18} />
            </button>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div className="carousel__dots" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel__dot${i === index ? ' carousel__dot--active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
