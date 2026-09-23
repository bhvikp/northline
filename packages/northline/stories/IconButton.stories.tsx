import type { Meta, StoryObj } from '@storybook/react-vite'
import IconButton from '../src/components/IconButton'
import Icon from '../src/components/Icon'

const meta: Meta<typeof IconButton> = {
  title: 'Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Settings', children: <Icon name="settings" /> },
}
export default meta

type Story = StoryObj<typeof IconButton>

export const Ghost: Story = { args: { variant: 'ghost' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Primary: Story = { args: { variant: 'primary' } }
export const Danger: Story = { args: { variant: 'danger', label: 'Delete', children: <Icon name="trash" /> } }
export const Small: Story = { args: { variant: 'secondary', size: 'sm' } }
export const Disabled: Story = { args: { variant: 'secondary', disabled: true } }
