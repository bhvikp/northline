export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

// items: [{ label, onClick }] - the last item renders as plain (current
// page) text; every earlier one renders as a clickable crumb.
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="breadcrumbs__item">
            {isLast ? (
              <span className="breadcrumbs__current" aria-current="page">{item.label}</span>
            ) : (
              <button type="button" className="breadcrumbs__link" onClick={item.onClick}>
                {item.label}
              </button>
            )}
            {!isLast && <span className="breadcrumbs__sep" aria-hidden="true">/</span>}
          </span>
        )
      })}
    </nav>
  )
}
