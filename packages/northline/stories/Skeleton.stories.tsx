import type { Meta, StoryObj } from '@storybook/react-vite'
import Skeleton from '../src/components/Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Text: Story = { args: { variant: 'text', width: 200 } }
export const Circle: Story = { args: { variant: 'circle' } }
export const Rect: Story = { args: { variant: 'rect', width: 240 } }

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <Skeleton variant="circle" />
      <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
}
