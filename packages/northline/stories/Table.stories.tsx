import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from '../src/components/Badge'
import Table from '../src/components/Table'

interface Row {
  name: string
  status: string
  tone: 'green' | 'orange' | 'red'
  volume: string
}

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', render: (r: Row) => <Badge tone={r.tone} dot>{r.status}</Badge> },
  { key: 'volume', header: 'Volume', align: 'right' as const },
]

const rows: Row[] = [
  { name: 'Ingest A', status: 'Healthy', tone: 'green', volume: '12,480' },
  { name: 'Ingest B', status: 'Degraded', tone: 'orange', volume: '3,204' },
  { name: 'Ingest C', status: 'Failed', tone: 'red', volume: '0' },
]

const meta: Meta = {
  title: 'Data Display/Table',
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = { render: () => <Table columns={columns} rows={rows} /> }
export const Empty: Story = { render: () => <Table columns={columns} rows={[]} /> }
export const Clickable: Story = {
  render: () => <Table columns={columns} rows={rows} onRowClick={(r) => alert(`Clicked ${r.name}`)} />,
}
