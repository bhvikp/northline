import type { Meta, StoryObj } from '@storybook/react-vite'
import Avatar from '../src/components/Avatar'
import AvatarGroup from '../src/components/AvatarGroup'

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Jane Doe' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const Large: Story = { args: { size: 48 } }
export const Small: Story = { args: { size: 24 } }
export const WithImage: Story = { args: { name: 'Jane Doe', src: 'https://i.pravatar.cc/64?img=5' } }

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[{ name: 'Jane Doe' }, { name: 'Sam Osei' }, { name: 'Priya Raman' }, { name: 'Kenji Ito' }, { name: 'Ana Silva' }]}
      max={3}
    />
  ),
}
