import type { Meta, StoryObj } from '@storybook/react-vite'
import ScoreCard from '../src/components/ScoreCard'

const TREND = [12, 18, 14, 22, 19, 27, 24, 31, 28, 35]

const meta: Meta<typeof ScoreCard> = {
  title: 'Data Display/ScoreCard',
  component: ScoreCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ScoreCard>

export const Default: Story = { args: { label: 'Total Volume', value: '12,480', accent: 'indigo', trend: TREND } }
export const TrendUp: Story = {
  args: { label: 'Success Rate', value: '94.2%', accent: 'green', sub: '97.2% success rate', direction: 'up', trend: TREND.map((v) => v + 4) },
}
export const TrendDown: Story = {
  args: { label: 'Errors', value: '212', accent: 'rose', sub: '1.7% of total', direction: 'down', trend: TREND.map((v) => 40 - v) },
}
export const NoTrend: Story = { args: { label: 'Distinct Segments', value: '9', accent: 'cyan' } }
