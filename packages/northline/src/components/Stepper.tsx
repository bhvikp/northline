import type { ReactNode } from 'react'
import Icon from './Icon'

export interface StepperStep {
  id: string
  label: ReactNode
}

export interface StepperProps {
  steps: StepperStep[]
  activeId: string
  completedIds?: string[]
}

// Horizontal multi-step progress indicator (wizard/setup flows) - purely
// presentational, pair it with your own step-switching state.
export default function Stepper({ steps, activeId, completedIds = [] }: StepperProps) {
  const activeIndex = steps.findIndex((s) => s.id === activeId)

  return (
    <div className="stepper" role="list">
      {steps.map((step, i) => {
        const isCompleted = completedIds.includes(step.id) || i < activeIndex
        const isActive = step.id === activeId

        return (
          <div
            key={step.id}
            role="listitem"
            className={`stepper__step${isActive ? ' stepper__step--active' : ''}${isCompleted ? ' stepper__step--completed' : ''}`}
          >
            <span className="stepper__dot" aria-hidden="true">{isCompleted ? <Icon name="check" size={13} /> : i + 1}</span>
            <span className="stepper__label">{step.label}</span>
            {i < steps.length - 1 && <span className="stepper__connector" aria-hidden="true" />}
          </div>
        )
      })}
    </div>
  )
}
