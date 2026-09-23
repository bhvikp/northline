import type { ReactElement } from 'react'

export type IconName =
  | 'close'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'kebab'
  | 'drag-handle'
  | 'copy'
  | 'trash'
  | 'plus'
  | 'minus'
  | 'upload'
  | 'star'
  | 'info'
  | 'warning'
  | 'settings'
  | 'inbox'
  | 'search'
  | 'calendar'
  | 'eye'
  | 'eye-off'
  | 'menu'
  | 'home'

// Stroke-based (24x24 viewBox) paths - sized/colored via the `size`/`color`
// props, not baked into the path data, so one path works at any size/tone.
const PATHS: Record<IconName, ReactElement> = {
  close: <path d="M6 6L18 18M18 6L6 18" />,
  check: <path d="M5 12.5L9.5 17L19 7" />,
  'chevron-left': <path d="M15 6L9 12L15 18" />,
  'chevron-right': <path d="M9 6L15 12L9 18" />,
  kebab: (
    <>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  'drag-handle': (
    <>
      <circle cx="9" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </>
  ),
  plus: <path d="M12 5V19M5 12H19" />,
  minus: <path d="M5 12H19" />,
  upload: (
    <>
      <path d="M12 4V15" />
      <path d="M7 9L12 4L17 9" />
      <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
    </>
  ),
  star: <path d="M12 3l2.6 5.8 6.2.6-4.7 4.2 1.4 6.2L12 16.9 6.5 19.8l1.4-6.2L3.2 9.4l6.2-.6L12 3z" strokeLinejoin="round" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3L22 20H2L12 3z" strokeLinejoin="round" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.067-.395.1-.796.1-1.2z" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 12h4l2 3h4l2-3h4" />
      <path d="M6 5h12l2 7v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6l2-7z" strokeLinejoin="round" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5L15 15" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4M16 3v4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'eye-off': (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.3M6.6 6.6A15.7 15.7 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 3.4-.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1V9.5" strokeLinejoin="round" />
    </>
  ),
}

export interface IconProps {
  name: IconName
  size?: number
  color?: string
  filled?: boolean
}

// Single inline-SVG icon component covering every glyph the kit needs -
// used instead of emoji or unicode symbol characters, which render
// inconsistently (color emoji fonts, missing glyphs, baseline misalignment)
// across platforms. `color` defaults to inheriting text color; `filled`
// switches to a solid fill (used by Rating's star).
export default function Icon({ name, size = 16, color = 'currentColor', filled = false }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
