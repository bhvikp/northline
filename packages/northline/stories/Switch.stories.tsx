import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Switch, { type SwitchProps } from '../src/components/Switch'

function Controlled({ checked, ...rest }: SwitchProps) {
  const [value, setValue] = useState(checked)
  return <Switch {...rest} checked={value} onChange={setValue} />
}

const meta: Meta<typeof Controlled> = {
  title: 'Forms/Switch',
  component: Controlled,
  tags: ['autodocs'],
  args: { label: 'Email notifications' },
}
export default meta

type Story = StoryObj<typeof Controlled>

export const Off: Story = { args: { checked: false } }
export const On: Story = { args: { checked: true } }
export const Disabled: Story = { args: { checked: false, disabled: true } }
export const DisabledOn: Story = { args: { checked: true, disabled: true } }
