import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from '../src/components/Button'
import InfoTooltip from '../src/components/InfoTooltip'
import Tooltip from '../src/components/Tooltip'

const meta: Meta = {
  title: 'Disclosure/Tooltip',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const GenericTooltip: Story = {
  render: () => (
    <Tooltip content="Refreshes the current view">
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  ),
}

export const InfoIcon: Story = {
  render: () => (
    <p style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      Success rate <InfoTooltip text="Successful runs divided by total runs in the selected range." />
    </p>
  ),
}
