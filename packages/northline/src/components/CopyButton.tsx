import { useState } from 'react'
import Icon from './Icon'

export interface CopyButtonProps {
  text: string
  label?: string
}

// Icon button that copies `text` to the clipboard and shows brief "Copied"
// feedback - pairs with IDs/API keys/URLs shown in a Table or Card.
export default function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API can be unavailable (permissions, insecure context) -
      // fail silently rather than throwing in the caller's click handler.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" className="copy-button" aria-label={copied ? 'Copied' : label} onClick={onClick}>
      <Icon name={copied ? 'check' : 'copy'} size={14} />
    </button>
  )
}
