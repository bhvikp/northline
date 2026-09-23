import Icon from './Icon'

export interface InfoTooltipProps {
  text?: string
}

// Small (i) affordance that reveals a formula/explanation on hover or focus.
// Keyboard accessible: tabbable span, shown on focus as well as hover.
export default function InfoTooltip({ text }: InfoTooltipProps) {
  if (!text) return null
  return (
    <span className="info-tooltip" tabIndex={0} role="note" aria-label={text}>
      <span className="info-tooltip__icon">
        <Icon name="info" size={11} />
      </span>
      <span className="info-tooltip__bubble">{text}</span>
    </span>
  )
}
