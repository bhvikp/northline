import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function parseISO(iso?: string | null): Date | null {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (y === undefined || m === undefined || d === undefined) return null
  return new Date(y, m - 1, d)
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatShort(iso?: string | null): string {
  const date = parseISO(iso)
  if (!date) return ''
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${m}/${d}/${date.getFullYear()}`
}

export interface DatePickerProps {
  value?: string | null
  min?: string | null
  max?: string | null
  onChange: (date: string) => void
  label?: string
  placeholder?: string
}

// Single-date counterpart to DateRangePicker - same trigger+panel mechanics,
// one click commits a date instead of a from/to pair.
export default function DatePicker({ value, min, max, onChange, label = 'Date', placeholder = 'Select date' }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const selected = parseISO(value)
  const minDate = parseISO(min)
  const maxDate = parseISO(max)
  const [viewDate, setViewDate] = useState<Date>(() => selected ?? new Date())
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setViewDate(selected ?? new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const isDisabled = (date: Date) => Boolean((minDate && date < minDate) || (maxDate && date > maxDate))
  const isSelected = (date: Date) => Boolean(selected && date.toDateString() === selected.toDateString())
  const isToday = (date: Date) => date.toDateString() === new Date().toDateString()
  const goMonth = (delta: number) => setViewDate(new Date(year, month + delta, 1))

  const pick = (date: Date) => {
    onChange(toISO(date))
    setOpen(false)
  }

  return (
    <div className="datepicker" ref={rootRef}>
      <button
        type="button"
        className="select__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{value ? formatShort(value) : placeholder}</span>
        <span className="datepicker__icon" aria-hidden="true" />
      </button>
      {open && (
        <div className="datepicker__panel" role="dialog" aria-label={label}>
          <div className="datepicker__header">
            <button type="button" className="datepicker__nav" onClick={() => goMonth(-1)} aria-label="Previous month"><Icon name="chevron-left" size={14} /></button>
            <span className="datepicker__title">{MONTH_NAMES[month]} {year}</span>
            <button type="button" className="datepicker__nav" onClick={() => goMonth(1)} aria-label="Next month"><Icon name="chevron-right" size={14} /></button>
          </div>
          <div className="datepicker__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="datepicker__grid">
            {cells.map((date, i) =>
              date ? (
                <button
                  key={i}
                  type="button"
                  disabled={isDisabled(date)}
                  className={[
                    'datepicker__day',
                    isSelected(date) && 'datepicker__day--selected',
                    isToday(date) && 'datepicker__day--today',
                  ].filter(Boolean).join(' ')}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
