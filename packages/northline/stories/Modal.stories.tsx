import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Button from '../src/components/Button'
import Modal from '../src/components/Modal'

function Demo({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title="Delete ingest source?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        This will permanently remove the ingest source and stop any scheduled runs.
      </Modal>
    </>
  )
}

const meta: Meta = {
  title: 'Overlays/Modal',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Small: Story = { render: () => <Demo size="sm" /> }
export const Medium: Story = { render: () => <Demo size="md" /> }
export const Large: Story = { render: () => <Demo size="lg" /> }
