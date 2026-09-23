import type { BadgeTone } from './Badge'

type AvatarTone = Exclude<BadgeTone, 'neutral'>

const TONES: AvatarTone[] = ['blue', 'teal', 'purple', 'orange', 'red', 'green']

// Deterministic tone from the name, so the same person always gets the same
// color without needing a `tone` prop passed in from data.
function toneFor(name: string): AvatarTone {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return TONES[sum % TONES.length] as AvatarTone
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0] ?? ''
  if (parts.length === 1) return first.slice(0, 2).toUpperCase()
  const last = parts[parts.length - 1] ?? ''
  return (first[0] ?? '') .concat(last[0] ?? '').toUpperCase()
}

export interface AvatarProps {
  name?: string
  src?: string
  size?: number
  tone?: AvatarTone
}

// Renders `src` if given, otherwise a pastel initials badge derived from
// `name`. `size` is the diameter in px.
export default function Avatar({ name, src, size = 32, tone }: AvatarProps) {
  const resolvedTone = tone ?? toneFor(name ?? '')
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) }

  if (src) {
    return <img className="avatar" style={style} src={src} alt={name ?? ''} />
  }

  return (
    <span className={`avatar avatar--${resolvedTone}`} style={style} title={name}>
      {name ? initials(name) : '?'}
    </span>
  )
}
