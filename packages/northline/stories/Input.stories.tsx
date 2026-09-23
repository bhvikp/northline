import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Input, { type InputProps } from '../src/components/Input'

function Controlled({ initial, ...rest }: Omit<InputProps, 'value' | 'onChange'> & { initial?: string }) {
  const [value, setValue] = useState(initial ?? '')
  return <Input {...rest} value={value} onChange={setValue} />
}

const meta: Meta<typeof Controlled> = {
  title: 'Forms/Input',
  component: Controlled,
  tags: ['autodocs'],
  args: { label: 'Name', placeholder: 'Jane Doe' },
}
export default meta

type Story = StoryObj<typeof Controlled>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Shown to teammates on the card.' } }
export const Error: Story = { args: { label: 'Email', initial: 'not-an-email', error: true, hint: 'Enter a valid email' } }
export const Disabled: Story = { args: { label: 'Locked', initial: 'Read only', disabled: true } }
export const Password: Story = { args: { label: 'Password', type: 'password', initial: 'hunter2' } }
