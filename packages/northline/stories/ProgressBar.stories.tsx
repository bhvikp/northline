import type { Meta, StoryObj } from '@storybook/react-vite'
import ProgressBar from '../src/components/ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { label: 'Storage used', value: 72 },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Blue: Story = { args: { tone: 'blue' } }
export const Orange: Story = { args: { tone: 'orange', label: 'Quota', value: 94 } }
export const Empty: Story = { args: { value: 0 } }
export const Full: Story = { args: { value: 100, tone: 'green', label: 'Complete' } }
