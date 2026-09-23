import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from '../src/components/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Label' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'blue', 'teal', 'purple', 'orange', 'red', 'green'] },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Neutral: Story = { args: { tone: 'neutral' } }
export const Blue: Story = { args: { tone: 'blue', children: 'Active', dot: true } }
export const Teal: Story = { args: { tone: 'teal', children: 'In progress' } }
export const Purple: Story = { args: { tone: 'purple', children: 'Beta' } }
export const Orange: Story = { args: { tone: 'orange', children: 'Pending' } }
export const Red: Story = { args: { tone: 'red', children: 'Failed', dot: true } }
export const Green: Story = { args: { tone: 'green', children: 'Success' } }

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge>Neutral</Badge>
      <Badge tone="blue" dot>Active</Badge>
      <Badge tone="teal">In progress</Badge>
      <Badge tone="purple">Beta</Badge>
      <Badge tone="orange">Pending</Badge>
      <Badge tone="red" dot>Failed</Badge>
      <Badge tone="green">Success</Badge>
    </div>
  ),
}
