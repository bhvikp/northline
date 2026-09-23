import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Select from '../src/components/Select'

const OPTIONS = [
  { value: 'all', label: 'All regions' },
  { value: 'na', label: 'North America' },
  { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' },
]

function SingleDemo() {
  const [value, setValue] = useState('all')
  return <Select label="Region" value={value} onChange={setValue} options={OPTIONS} />
}

function MultiDemo() {
  const [value, setValue] = useState<string[]>(['all'])
  return <Select multiple label="Regions" value={value} onChange={setValue} options={OPTIONS} />
}

const meta: Meta = {
  title: 'Forms/Select',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Single: Story = { render: () => <SingleDemo /> }
export const Multiple: Story = { render: () => <MultiDemo /> }
