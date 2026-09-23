import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react'

export interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  label?: string
}

// Segmented verification-code input - one box per character, auto-advancing
// focus as you type, Backspace steps back, and pasting a full code fills
// every box at once.
export default function OTPInput({ length = 6, value, onChange, disabled = false, label = 'Verification code' }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const chars = Array.from({ length }, (_, i) => value[i] ?? '')

  const setChar = (index: number, char: string) => {
    const next = chars.slice()
    next[index] = char
    onChange(next.join('').slice(0, length))
  }

  const onInput = (index: number, raw: string) => {
    const char = raw.slice(-1)
    setChar(index, char)
    if (char && index < length - 1) inputRefs.current[index + 1]?.focus()
  }

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !chars[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').trim().slice(0, length)
    onChange(pasted)
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="otp-input" role="group" aria-label={label}>
      {chars.map((char, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          className="otp-input__box"
          value={char}
          onChange={(e) => onInput(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          disabled={disabled}
          inputMode="text"
          maxLength={1}
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  )
}
