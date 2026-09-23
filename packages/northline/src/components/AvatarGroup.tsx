import Avatar, { type AvatarProps } from './Avatar'

export interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: number
}

// Overlapping stack of avatars with a "+N" overflow badge once there are
// more than `max`.
export default function AvatarGroup({ avatars, max = 4, size = 32 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - visible.length

  return (
    <div className="avatar-group">
      {visible.map((props, i) => (
        <div key={i} className="avatar-group__item" style={{ zIndex: visible.length - i }}>
          <Avatar {...props} size={props.size ?? size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className="avatar-group__item avatar-group__overflow" style={{ width: size, height: size, fontSize: Math.round(size * 0.35) }}>
          +{overflow}
        </div>
      )}
    </div>
  )
}
