import CopyButton from './CopyButton'

export interface CodeBlockProps {
  code: string
  language?: string
  copyable?: boolean
}

// Plain monospace code snippet display - no syntax highlighting (bring your
// own highlighter and pass the highlighted markup as `code` via
// dangerouslySetInnerHTML upstream if you need that; this just owns the
// themed frame + optional copy button).
export default function CodeBlock({ code, language, copyable = true }: CodeBlockProps) {
  return (
    <div className="code-block">
      {(language || copyable) && (
        <div className="code-block__header">
          {language && <span className="code-block__lang">{language}</span>}
          {copyable && <CopyButton text={code} />}
        </div>
      )}
      <pre className="code-block__body"><code>{code}</code></pre>
    </div>
  )
}
