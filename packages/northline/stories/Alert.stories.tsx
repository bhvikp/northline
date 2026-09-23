import type { Meta, StoryObj } from '@storybook/react-vite'
import Alert from '../src/components/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { title: 'Ingest degraded', children: '3 of 12 sources are reporting stale data.' },
}
export default meta

type Story = StoryObj<typeof Alert>

export const Info: Story = { args: { tone: 'info' } }
export const Success: Story = { args: { tone: 'success', title: 'Sync complete', children: 'All sources are up to date.' } }
export const Warning: Story = { args: { tone: 'warning' } }
export const Danger: Story = { args: { tone: 'danger', title: 'Something went wrong', children: 'The last sync attempt failed.' } }
export const Dismissible: Story = { args: { tone: 'warning', onDismiss: () => {} } }
