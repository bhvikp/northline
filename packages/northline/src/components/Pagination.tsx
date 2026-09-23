import Icon from './Icon'

// Page-number list with prev/next, collapsing to ellipses once pageCount
// grows past what's worth spelling out in full (always shows first, last,
// current, and a neighbor on each side).
function pageList(page: number, pageCount: number): (number | string)[] {
  const pages = new Set([1, pageCount, page, page - 1, page + 1])
  return [...pages]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b)
    .reduce<(number | string)[]>((acc, p, i, arr) => {
      const prev = arr[i - 1]
      if (i > 0 && prev !== undefined && p - prev > 1) acc.push('ellipsis-' + p)
      acc.push(p)
      return acc
    }, [])
}

export interface PaginationProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export default function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null
  const pages = pageList(page, pageCount)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__nav"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <Icon name="chevron-left" size={14} />
      </button>
      {pages.map((p) =>
        typeof p === 'number' ? (
          <button
            key={p}
            type="button"
            className={`pagination__page${p === page ? ' pagination__page--active' : ''}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={p} className="pagination__ellipsis">…</span>
        ),
      )}
      <button
        type="button"
        className="pagination__nav"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <Icon name="chevron-right" size={14} />
      </button>
    </nav>
  )
}
