import { useState, type ReactNode } from 'react'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  /** Controlled: which item ids are open. Omit to let Accordion manage its own state. */
  openIds?: string[]
  onChange?: (openIds: string[]) => void
  /** Allow more than one section open at once. Default: false (single-open). */
  allowMultiple?: boolean
  defaultOpenIds?: string[]
}

// Expandable section list. Uncontrolled by default (pass defaultOpenIds to
// seed it); pass openIds + onChange to control it from outside.
export default function Accordion({
  items,
  openIds,
  onChange,
  allowMultiple = false,
  defaultOpenIds = [],
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenIds)
  const open = openIds ?? internalOpen

  const toggle = (id: string) => {
    const isOpen = open.includes(id)
    const next = isOpen
      ? open.filter((i) => i !== id)
      : allowMultiple
        ? [...open, id]
        : [id]
    onChange ? onChange(next) : setInternalOpen(next)
  }

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`}>
            <button
              type="button"
              className="accordion__header"
              aria-expanded={isOpen}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
            >
              <span className="accordion__chevron" aria-hidden="true" />
              {item.title}
            </button>
            {isOpen && <div className="accordion__panel">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
