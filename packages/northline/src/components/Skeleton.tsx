import type { CSSProperties } from 'react'

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect'
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  radius?: CSSProperties['borderRadius']
}

// Content-shaped loading placeholder. `variant` picks the base shape:
// 'text' (a line, defaults to font-height), 'circle' (avatar/icon), or
// 'rect' (card/image block) - width/height override the defaults for any.
export default function Skeleton({ variant = 'text', width, height, radius }: SkeletonProps) {
  const style: CSSProperties = {
    width: width ?? (variant === 'circle' ? 32 : '100%'),
    height: height ?? (variant === 'circle' ? 32 : variant === 'rect' ? 120 : 14),
    borderRadius: radius ?? (variant === 'circle' ? '50%' : variant === 'rect' ? 8 : 4),
  }

  return <span className="skeleton" style={style} aria-hidden="true" />
}
