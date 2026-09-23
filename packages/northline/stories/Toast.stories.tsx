import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from '../src/components/Button'
import { ToastProvider, useToast } from '../src/components/Toast'

function Demo() {
  const { show } = useToast()
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="secondary" onClick={() => show('Saved changes')}>Neutral</Button>
      <Button variant="secondary" onClick={() => show('Sync complete', { tone: 'green' })}>Success</Button>
      <Button variant="secondary" onClick={() => show('Ingest degraded', { tone: 'orange' })}>Warning</Button>
      <Button variant="secondary" onClick={() => show('Failed to save', { tone: 'red', duration: 6000 })}>Error</Button>
    </div>
  )
}

const meta: Meta = {
  title: 'Overlays/Toast',
  tags: ['autodocs'],
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
}
export default meta

type Story = StoryObj

export const Default: Story = { render: () => <Demo /> }
