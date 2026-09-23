import type { Meta, StoryObj } from '@storybook/react-vite'
import LoadingOverlay from '../src/components/LoadingOverlay'
import Card from '../src/components/Card'
import Spinner from '../src/components/Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
export const Large: Story = { args: { size: 48 } }
export const Small: Story = { args: { size: 18 } }

export const LoadingOverlayExample: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <LoadingOverlay active>
        <Card title="Report">This content is dimmed and blocked while loading.</Card>
      </LoadingOverlay>
    </div>
  ),
}
