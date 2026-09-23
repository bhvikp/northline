import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Checkbox, { type CheckboxProps } from '../src/components/Checkbox'

function Controlled({ checked, ...rest }: CheckboxProps) {
  const [value, setValue] = useState(checked)
  return <Checkbox {...rest} checked={value} onChange={setValue} />
}

const meta: Meta<typeof Controlled> = {
  title: 'Forms/Checkbox',
  component: Controlled,
  tags: ['autodocs'],
  args: { label: 'Notify me on failures' },
}
export default meta

type Story = StoryObj<typeof Controlled>

export const Unchecked: Story = { args: { checked: false } }
export const Checked: Story = { args: { checked: true } }
export const Disabled: Story = { args: { checked: false, disabled: true } }
export const DisabledChecked: Story = { args: { checked: true, disabled: true } }
