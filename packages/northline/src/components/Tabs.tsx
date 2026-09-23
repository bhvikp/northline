import type { ReactNode } from 'react'

export interface Tab {
  id: string
  label: ReactNode
  comingSoon?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          disabled={tab.comingSoon}
          className={`tab${active === tab.id ? ' tab--active' : ''}`}
          onClick={() => !tab.comingSoon && onChange(tab.id)}
        >
          {tab.label}
          {tab.comingSoon && <span className="tab__badge">Soon</span>}
        </button>
      ))}
    </div>
  )
}
