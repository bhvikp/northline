import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react'
import Icon from './Icon'

export interface FileUploadProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  label?: ReactNode
  hint?: ReactNode
}

// Drag-and-drop file dropzone, backed by a native file input for the
// click-to-browse path - stays stateless about the selected files
// themselves (just reports them via onFiles) so the caller decides how to
// show/manage the list.
export default function FileUpload({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  label = 'Drag files here or click to browse',
  hint,
}: FileUploadProps) {
  const [isDragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return
    onFiles(Array.from(fileList))
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (!disabled) handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      className={`file-upload${isDragOver ? ' file-upload--drag-over' : ''}${disabled ? ' file-upload--disabled' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="file-upload__input"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <span className="file-upload__icon" aria-hidden="true"><Icon name="upload" size={22} /></span>
      <span className="file-upload__label">{label}</span>
      {hint && <span className="file-upload__hint">{hint}</span>}
    </div>
  )
}
