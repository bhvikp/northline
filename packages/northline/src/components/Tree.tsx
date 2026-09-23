import { useState, type ReactNode } from 'react'

export interface TreeNode {
  id: string
  label: ReactNode
  children?: TreeNode[]
}

export interface TreeProps {
  nodes: TreeNode[]
  defaultExpandedIds?: string[]
  onSelect?: (id: string) => void
  selectedId?: string
}

function TreeItem({
  node,
  expanded,
  toggle,
  onSelect,
  selectedId,
}: {
  node: TreeNode
  expanded: Set<string>
  toggle: (id: string) => void
  onSelect?: (id: string) => void
  selectedId?: string
}) {
  const hasChildren = !!node.children?.length
  const isExpanded = expanded.has(node.id)

  return (
    <li className="tree__item">
      <div
        className={`tree__row${node.id === selectedId ? ' tree__row--selected' : ''}`}
        onClick={() => {
          if (hasChildren) toggle(node.id)
          onSelect?.(node.id)
        }}
      >
        {hasChildren ? (
          <span className={`tree__chevron${isExpanded ? ' tree__chevron--open' : ''}`} aria-hidden="true" />
        ) : (
          <span className="tree__chevron tree__chevron--leaf" aria-hidden="true" />
        )}
        <span className="tree__label">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul className="tree__children">
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} expanded={expanded} toggle={toggle} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </ul>
      )}
    </li>
  )
}

// Nested expandable hierarchy - file trees, category trees, org charts.
export default function Tree({ nodes, defaultExpandedIds = [], onSelect, selectedId }: TreeProps) {
  const [expanded, setExpanded] = useState(new Set(defaultExpandedIds))

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <ul className="tree" role="tree">
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} expanded={expanded} toggle={toggle} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </ul>
  )
}
