import { useEffect, type RefObject } from 'react'

// The click-outside/Escape-to-close pattern used internally by Select,
// Menu, Popover, Combobox, DateRangePicker, and DatePicker - exported so a
// custom overlay you build on top of Northline doesn't have to
// reimplement it again. Those built-in components keep their own inline
// copies (predating this hook) rather than being refactored onto it, to
// avoid touching several working, well-tested components for no behavior
// change.
export function useClickOutside(ref: RefObject<HTMLElement | null>, onOutside: () => void, active = true): void {
  useEffect(() => {
    if (!active) return
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOutside()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref, onOutside, active])
}
