import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Tabs from '../src/components/Tabs'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'upcoming', label: 'Upcoming', comingSoon: true },
]

function Demo() {
  const [active, setActive] = useState('overview')
  return <Tabs tabs={TABS} active={active} onChange={setActive} />
}

const meta: Meta = {
  title: 'Navigation/Tabs',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = { render: () => <Demo /> }
