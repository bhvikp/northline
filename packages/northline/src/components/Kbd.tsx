import type { ReactNode } from 'react'

export interface KbdProps {
  children: ReactNode
}

// Keyboard-shortcut chip, e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>.
export default function Kbd({ children }: KbdProps) {
  return <kbd className="kbd">{children}</kbd>
}
