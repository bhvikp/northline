import type { Meta, StoryObj } from '@storybook/react-vite'
import Accordion from '../src/components/Accordion'

const ITEMS = [
  { id: 'a', title: 'What counts as a failure?', content: 'Any run that exits non-zero or times out.' },
  { id: 'b', title: 'How often does this sync?', content: 'Every 15 minutes, on the hour and quarter-hour.' },
  { id: 'c', title: 'Can I export this table?', content: 'Not yet - CSV export is on the roadmap.' },
]

const meta: Meta = {
  title: 'Disclosure/Accordion',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const SingleOpen: Story = { render: () => <Accordion items={ITEMS} defaultOpenIds={['a']} /> }
export const MultipleOpen: Story = { render: () => <Accordion items={ITEMS} allowMultiple defaultOpenIds={['a', 'b']} /> }
export const AllClosed: Story = { render: () => <Accordion items={ITEMS} /> }
