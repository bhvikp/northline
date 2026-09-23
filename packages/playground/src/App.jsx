import { useEffect, useState } from 'react'
import { Bar, Chart, Doughnut, Line, Radar } from 'react-chartjs-2'
import {
  ScoreCard,
  Sparkline,
  ChartCard,
  Select,
  DateRangePicker,
  InfoTooltip,
  Tabs,
  Button,
  Badge,
  Input,
  Switch,
  Table,
  Modal,
  useToast,
  Checkbox,
  RadioGroup,
  Textarea,
  Skeleton,
  Menu,
  Pagination,
  Breadcrumbs,
  ProgressBar,
  Gauge,
  Avatar,
  Card,
  EmptyState,
  Spinner,
  Accordion,
  SegmentedControl,
  ChartLegend,
  MiniBar,
  BulletChart,
  Slider,
  Stepper,
  Drawer,
  Popover,
  TagInput,
  SearchInput,
  CopyButton,
  StatusDot,
  DescriptionList,
  Text,
  Heading,
  Container,
  Stack,
  Grid,
  Divider,
  Link,
  Alert,
  IconButton,
  Tooltip,
  Combobox,
  NumberStepper,
  FileUpload,
  DatePicker,
  Rating,
  List,
  Timeline,
  AvatarGroup,
  CodeBlock,
  Kbd,
  Tree,
  Canvas,
  Navbar,
  BottomNav,
  Sidebar,
  ButtonGroup,
  ColorPicker,
  Icon,
  PasswordInput,
  OTPInput,
  LoadingOverlay,
  ErrorBoundary,
  Carousel,
  PALETTE,
  dualAxisOptions,
  donutOptions,
  horizontalBarOptions,
  areaOptions,
  stackedBarOptions,
  radarOptions,
  onThemeChange,
} from 'northline'
import './playground.css'

function Buggy({ shouldThrow }) {
  if (shouldThrow) throw new Error('Demo error: something broke in here')
  return <Text size="sm">Everything is fine.</Text>
}

const DEMO_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'upcoming', label: 'Upcoming', comingSoon: true },
]

const TREND = [12, 18, 14, 22, 19, 27, 24, 31, 28, 35]

const SELECT_OPTIONS = [
  { value: 'all', label: 'All regions' },
  { value: 'na', label: 'North America' },
  { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [single, setSingle] = useState('all')
  const [multi, setMulti] = useState(['all'])
  const [from, setFrom] = useState('2026-01-01')
  const [to, setTo] = useState('2026-09-16')
  const [name, setName] = useState('')
  const [notify, setNotify] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const { show } = useToast()
  const [agree, setAgree] = useState(false)
  const [freq, setFreq] = useState('weekly')
  const [notes, setNotes] = useState('')
  const [page, setPage] = useState(4)
  const [view, setView] = useState('daily')
  const [budget, setBudget] = useState(60)
  const [step, setStep] = useState('details')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tags, setTags] = useState(['ingest', 'prod'])
  const [search, setSearch] = useState('')
  const [alertVisible, setAlertVisible] = useState(true)
  const [comboValue, setComboValue] = useState('na')
  const [qty, setQty] = useState(3)
  const [singleDate, setSingleDate] = useState('2026-09-16')
  const [rating, setRating] = useState(3)
  const [treeSelected, setTreeSelected] = useState('overview')
  const [sidebarActive, setSidebarActive] = useState('overview')
  const [navActive, setNavActive] = useState('overview')
  const [bottomNavActive, setBottomNavActive] = useState('home')
  const [color, setColor] = useState('#8FB4F5')
  const [password, setPassword] = useState('hunter2')
  const [otp, setOtp] = useState('')
  const [overlayActive, setOverlayActive] = useState(false)
  const [throwError, setThrowError] = useState(false)

  // Charts are canvas-drawn, so they don't repaint on their own when the
  // theme flips - re-render (and rebuild options) whenever it does.
  const [themeTick, setThemeTick] = useState(0)
  useEffect(() => onThemeChange(() => setThemeTick((t) => t + 1)), [])

  // Explicit light/dark override (see Northline's dark mode docs) - falls
  // back to the OS/browser preference until the user picks one here.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'system')
  const effectiveTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme
  const toggleTheme = () => {
    const next = effectiveTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    setTheme(next)
  }

  const chartData = {
    labels: ['W01', 'W02', 'W03', 'W04', 'W05', 'W06', 'W07', 'W08'],
    datasets: [
      { type: 'bar', label: 'Volume', data: [40, 55, 48, 62, 58, 70, 66, 80], backgroundColor: PALETTE[0], borderRadius: 4, yAxisID: 'y' },
      { type: 'line', label: 'Rate', data: [72, 75, 74, 80, 78, 83, 82, 88], borderColor: PALETTE[1], backgroundColor: PALETTE[1], pointRadius: 0, borderWidth: 2.5, tension: 0.3, yAxisID: 'y1' },
    ],
  }

  const pieData = {
    labels: ['Type A', 'Type B', 'Type C', 'Type D'],
    datasets: [{ data: [45, 25, 20, 10], backgroundColor: PALETTE.slice(0, 4), borderColor: '#FFFFFF', borderWidth: 2 }],
  }

  return (
    <div className="pg">
      <div className="pg-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1>Northline Playground</h1>
          <p>Live playground for the Northline component library and theme.</p>
        </div>
        <Button variant="secondary" onClick={toggleTheme}>
          {effectiveTheme === 'dark' ? '☀ Light' : '☾ Dark'}
        </Button>
      </div>

      {/* ================= 1. Typography & Layout ================= */}
      <Heading level={2} className="pg-category">Typography &amp; Layout</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Text / Heading / Divider / Link</h2>
        <Heading level={3}>A generic heading</Heading>
        <Text color="muted">Some muted body copy, set in the display font.</Text>
        <Text mono size="sm" color="accent">A small accented mono line.</Text>
        <Divider label="OR" />
        <Link href="#" onClick={(e) => e.preventDefault()}>A themed link</Link>
      </section>

      <section className="pg-section">
        <h2>Container / Stack / Grid</h2>
        <Stack direction="row" gap={16} align="center">
          <Text>Stack item A</Text>
          <Text>Stack item B</Text>
        </Stack>
        <div style={{ marginTop: 12 }}>
          <Grid columns={3} gap={12}>
            <Card><Text size="sm">Grid cell 1</Text></Card>
            <Card><Text size="sm">Grid cell 2</Text></Card>
            <Card><Text size="sm">Grid cell 3</Text></Card>
          </Grid>
        </div>
      </section>

      {/* ================= 2. Actions ================= */}
      <Heading level={2} className="pg-category">Actions</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Button</h2>
        <div className="pg-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      <section className="pg-section">
        <h2>IconButton / Tooltip</h2>
        <Stack direction="row" gap={12} align="center">
          <IconButton label="Settings" variant="secondary"><Icon name="settings" /></IconButton>
          <IconButton label="Delete" variant="danger"><Icon name="trash" /></IconButton>
          <Tooltip content="Refreshes the current view">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
        </Stack>
      </section>

      <section className="pg-section">
        <h2>ButtonGroup</h2>
        <ButtonGroup>
          <Button variant="secondary" size="sm">Day</Button>
          <Button variant="secondary" size="sm">Week</Button>
          <Button variant="secondary" size="sm">Month</Button>
        </ButtonGroup>
      </section>

      {/* ================= 3. Forms ================= */}
      <Heading level={2} className="pg-category">Forms</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Input / PasswordInput / Textarea</h2>
        <div className="pg-row">
          <div className="pg-variant" style={{ width: 220 }}>
            <Input label="Name" placeholder="Jane Doe" value={name} onChange={setName} />
          </div>
          <div className="pg-variant" style={{ width: 220 }}>
            <Input label="Email" value="not-an-email" onChange={() => {}} error hint="Enter a valid email" />
          </div>
          <div className="pg-variant" style={{ width: 220 }}>
            <Input label="Disabled" value="Locked" onChange={() => {}} disabled />
          </div>
          <div className="pg-variant" style={{ width: 220 }}>
            <PasswordInput label="Password" value={password} onChange={setPassword} />
          </div>
          <div className="pg-variant" style={{ width: 260 }}>
            <Textarea label="Notes" placeholder="Add context..." value={notes} onChange={setNotes} />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Select / Combobox</h2>
        <div className="pg-row">
          <div className="pg-variant">
            <span className="pg-variant__label">Single</span>
            <Select label="Region" value={single} onChange={setSingle} options={SELECT_OPTIONS} />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">Multi</span>
            <Select multiple label="Regions" value={multi} onChange={setMulti} options={SELECT_OPTIONS} />
          </div>
          <div className="pg-variant" style={{ width: 200 }}>
            <Combobox label="Region (searchable)" value={comboValue} onChange={setComboValue} options={SELECT_OPTIONS} />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Checkbox / RadioGroup / Switch</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div className="pg-variant">
            <span className="pg-variant__label">Checkbox</span>
            <Checkbox checked={agree} onChange={setAgree} label="Notify me on failures" />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">RadioGroup</span>
            <RadioGroup
              name="frequency"
              value={freq}
              onChange={setFreq}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">Switch</span>
            <Switch checked={notify} onChange={setNotify} label="Email notifications" />
            <Switch checked={false} onChange={() => {}} label="Disabled" disabled />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Slider / NumberStepper / Rating / ColorPicker</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 240 }}>
            <Slider label="Budget alert threshold" value={budget} onChange={setBudget} formatValue={(v) => `${v}%`} />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">NumberStepper</span>
            <NumberStepper value={qty} onChange={setQty} min={0} max={10} />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">Rating</span>
            <Rating value={rating} onChange={setRating} />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">ColorPicker</span>
            <ColorPicker value={color} onChange={setColor} />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>DatePicker / DateRangePicker</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 200 }}>
            <span className="pg-variant__label">DatePicker</span>
            <DatePicker value={singleDate} onChange={setSingleDate} />
          </div>
          <div>
            <span className="pg-variant__label">DateRangePicker</span>
            <DateRangePicker label="Date range" from={from} to={to} min="2026-01-01" max="2026-12-31" onChange={(f, t) => { setFrom(f); setTo(t) }} />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>TagInput / SearchInput / FileUpload / OTPInput</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 220 }}>
            <TagInput label="Tags" value={tags} onChange={setTags} />
          </div>
          <div style={{ width: 220 }}>
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div>
            <span className="pg-variant__label">OTPInput</span>
            <OTPInput value={otp} onChange={setOtp} />
          </div>
        </div>
        <div style={{ marginTop: 16, width: 320 }}>
          <FileUpload onFiles={(files) => show(`Selected ${files.length} file(s)`)} hint="CSV up to 10MB" />
        </div>
      </section>

      {/* ================= 4. Feedback ================= */}
      <Heading level={2} className="pg-category">Feedback</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Alert</h2>
        {alertVisible && (
          <Alert tone="warning" title="Ingest degraded" onDismiss={() => setAlertVisible(false)}>
            3 of 12 sources are reporting stale data.
          </Alert>
        )}
      </section>

      <section className="pg-section">
        <h2>Toast</h2>
        <div className="pg-row">
          <Button variant="secondary" onClick={() => show('Saved changes')}>Neutral</Button>
          <Button variant="secondary" onClick={() => show('Sync complete', { tone: 'green' })}>Success</Button>
          <Button variant="secondary" onClick={() => show('Ingest degraded', { tone: 'orange' })}>Warning</Button>
          <Button variant="secondary" onClick={() => show('Failed to save', { tone: 'red', duration: 6000 })}>Error</Button>
        </div>
      </section>

      <section className="pg-section">
        <h2>Badge / StatusDot</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div className="pg-row">
            <Badge>Neutral</Badge>
            <Badge tone="blue" dot>Active</Badge>
            <Badge tone="teal">In progress</Badge>
            <Badge tone="purple">Beta</Badge>
            <Badge tone="orange">Pending</Badge>
            <Badge tone="red" dot>Failed</Badge>
            <Badge tone="green">Success</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <StatusDot tone="green" label="Healthy" pulse />
            <StatusDot tone="orange" label="Degraded" />
            <StatusDot tone="red" label="Failed" />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>ProgressBar / Gauge / BulletChart</h2>
        <div className="pg-row" style={{ alignItems: 'center' }}>
          <div className="pg-variant" style={{ width: 240 }}>
            <ProgressBar label="Storage used" value={72} tone="blue" />
          </div>
          <div className="pg-variant" style={{ width: 240 }}>
            <ProgressBar label="Quota" value={94} tone="orange" />
          </div>
          <Gauge value={68} tone="teal" label="Uptime" />
          <div className="pg-variant" style={{ width: 240 }}>
            <BulletChart label="Quota" value={72} target={85} max={100} tone="blue" />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Skeleton / Spinner / LoadingOverlay</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <Skeleton variant="circle" />
          <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="40%" />
          </div>
          <Spinner />
        </div>
        <div style={{ marginTop: 16 }}>
          <Button variant="secondary" size="sm" onClick={() => setOverlayActive((v) => !v)}>
            {overlayActive ? 'Stop loading' : 'Simulate loading'}
          </Button>
          <div style={{ marginTop: 12, width: 300 }}>
            <LoadingOverlay active={overlayActive}>
              <Card title="Report">
                <Text size="sm">This content is dimmed and blocked while loading.</Text>
              </Card>
            </LoadingOverlay>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>ErrorBoundary</h2>
        <Button variant="danger" size="sm" onClick={() => setThrowError(true)}>Trigger error</Button>
        <div style={{ marginTop: 12, maxWidth: 420 }}>
          <ErrorBoundary
            key={throwError}
            fallback={(error, reset) => (
              <Alert
                tone="danger"
                title="Something went wrong"
                onDismiss={() => {
                  reset()
                  setThrowError(false)
                }}
              >
                {error.message}
              </Alert>
            )}
          >
            <Buggy shouldThrow={throwError} />
          </ErrorBoundary>
        </div>
      </section>

      {/* ================= 5. Overlays & Disclosure ================= */}
      <Heading level={2} className="pg-category">Overlays &amp; Disclosure</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Modal / Drawer</h2>
        <div className="pg-row">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete ingest source?"
          footer={(
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setModalOpen(false)}>Delete</Button>
            </>
          )}
        >
          This will permanently remove the ingest source and stop any scheduled runs.
        </Modal>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Ingest A"
          footer={<Button variant="primary" onClick={() => setDrawerOpen(false)}>Done</Button>}
        >
          <DescriptionList
            items={[
              { label: 'Status', value: <Badge tone="green" dot>Healthy</Badge> },
              { label: 'Volume', value: '12,480' },
              { label: 'Owner', value: 'Jane Doe' },
              { label: 'Last run', value: '4 minutes ago' },
            ]}
          />
        </Drawer>
      </section>

      <section className="pg-section">
        <h2>Popover / Menu</h2>
        <Popover trigger={<Button variant="secondary">Filters</Button>}>
          <DescriptionList
            columns={1}
            items={[
              { label: 'Region', value: 'North America' },
              { label: 'Status', value: 'Active only' },
            ]}
          />
        </Popover>
      </section>

      <section className="pg-section">
        <h2>InfoTooltip</h2>
        <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontSize: 14 }}>
          Hover the badge <InfoTooltip text="This is a themed tooltip revealing a formula or explanation." />
        </p>
      </section>

      <section className="pg-section">
        <h2>Accordion</h2>
        <Accordion
          items={[
            { id: 'a', title: 'What counts as a failure?', content: 'Any run that exits non-zero or times out.' },
            { id: 'b', title: 'How often does this sync?', content: 'Every 15 minutes, on the hour and quarter-hour.' },
            { id: 'c', title: 'Can I export this table?', content: 'Not yet - CSV export is on the roadmap.' },
          ]}
          defaultOpenIds={['a']}
        />
      </section>

      {/* ================= 6. Navigation ================= */}
      <Heading level={2} className="pg-category">Navigation</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Tabs / SegmentedControl</h2>
        <Tabs tabs={DEMO_TABS} active={activeTab} onChange={setActiveTab} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--neutral-500)' }}>
          Active: {activeTab}
        </p>
        <SegmentedControl
          label="View"
          value={view}
          onChange={setView}
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />
      </section>

      <section className="pg-section">
        <h2>Breadcrumbs / Pagination / Stepper</h2>
        <Breadcrumbs
          items={[
            { label: 'Dashboards', onClick: () => show('Go to Dashboards') },
            { label: 'Ingest', onClick: () => show('Go to Ingest') },
            { label: 'Ingest A' },
          ]}
        />
        <div style={{ marginTop: 16 }}>
          <Pagination page={page} pageCount={12} onChange={setPage} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Stepper
            steps={[
              { id: 'source', label: 'Source' },
              { id: 'details', label: 'Details' },
              { id: 'review', label: 'Review' },
              { id: 'done', label: 'Done' },
            ]}
            activeId={step}
          />
          <div className="pg-row" style={{ marginTop: 16 }}>
            <Button variant="secondary" size="sm" onClick={() => setStep('source')}>Source</Button>
            <Button variant="secondary" size="sm" onClick={() => setStep('details')}>Details</Button>
            <Button variant="secondary" size="sm" onClick={() => setStep('review')}>Review</Button>
            <Button variant="secondary" size="sm" onClick={() => setStep('done')}>Done</Button>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Canvas / Navbar (menu) / BottomNav</h2>
        <div style={{ marginBottom: 8 }}>
          <Text size="sm" color="muted">
            Resize the viewport narrower than 640px to see the Navbar menu collapse behind a hamburger and BottomNav appear.
          </Text>
        </div>
        <div style={{ border: '1px solid var(--card-border)', borderRadius: 14, overflow: 'hidden', position: 'relative', height: 260 }}>
          <Canvas style={{ minHeight: 0, height: '100%' }}>
            <Navbar
              brand="Northline"
              items={[
                { id: 'overview', label: 'Overview', onClick: () => setNavActive('overview') },
                { id: 'ingest', label: 'Ingest', onClick: () => setNavActive('ingest') },
                { id: 'settings', label: 'Settings', onClick: () => setNavActive('settings') },
              ]}
              activeId={navActive}
            >
              <Button variant="ghost" size="sm">Docs</Button>
              <Avatar name="Jane Doe" size={28} />
            </Navbar>
            <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
              <Text size="sm">Active section: {navActive}</Text>
            </div>
            <BottomNav
              activeId={bottomNavActive}
              items={[
                { id: 'home', label: 'Home', icon: <Icon name="home" size={18} />, onClick: () => setBottomNavActive('home') },
                { id: 'search', label: 'Search', icon: <Icon name="search" size={18} />, onClick: () => setBottomNavActive('search') },
                { id: 'settings', label: 'Settings', icon: <Icon name="settings" size={18} />, onClick: () => setBottomNavActive('settings') },
              ]}
            />
          </Canvas>
        </div>
      </section>

      <section className="pg-section">
        <h2>Sidebar</h2>
        <div style={{ display: 'flex', marginTop: 16, border: '1px solid var(--card-border)', borderRadius: 14, overflow: 'hidden' }}>
          <Sidebar
            items={[{ id: 'overview', label: 'Overview' }, { id: 'ingest', label: 'Ingest' }, { id: 'settings', label: 'Settings' }]}
            activeId={sidebarActive}
            header="Menu"
          />
          <div style={{ padding: 16, flex: 1 }}>
            <Stack gap={12}>
              {['overview', 'ingest', 'settings'].map((id) => (
                <Button key={id} variant="ghost" size="sm" onClick={() => setSidebarActive(id)}>Select "{id}"</Button>
              ))}
            </Stack>
          </div>
        </div>
      </section>

      {/* ================= 7. Data Display ================= */}
      <Heading level={2} className="pg-category">Data Display</Heading>
      <Divider />

      <section className="pg-section">
        <h2>Table</h2>
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'status', header: 'Status', render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
            { key: 'volume', header: 'Volume', align: 'right' },
            {
              key: 'actions',
              header: '',
              align: 'right',
              render: (r) => (
                <Menu
                  label={`Actions for ${r.name}`}
                  items={[
                    { label: 'View details', onClick: () => show(`Viewing ${r.name}`) },
                    { label: 'Retry ingest', onClick: () => show(`Retrying ${r.name}`, { tone: 'blue' }) },
                    { label: 'Delete', danger: true, onClick: () => show(`Deleted ${r.name}`, { tone: 'red' }) },
                  ]}
                />
              ),
            },
          ]}
          rows={[
            { name: 'Ingest A', status: 'Healthy', tone: 'green', volume: '12,480' },
            { name: 'Ingest B', status: 'Degraded', tone: 'orange', volume: '3,204' },
            { name: 'Ingest C', status: 'Failed', tone: 'red', volume: '0' },
          ]}
        />
      </section>

      <section className="pg-section">
        <h2>Card / EmptyState</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 260 }}>
            <Card title="Plain card">
              <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--neutral-600)' }}>
                Just a bordered panel - no chart, no drag/resize.
              </p>
            </Card>
          </div>
          <div style={{ width: 320 }}>
            <EmptyState
              icon={<Icon name="inbox" size={26} />}
              title="No ingests yet"
              description="Connect a source to see data here."
              action={<Button variant="primary" size="sm">Add source</Button>}
            />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>Avatar / AvatarGroup</h2>
        <div className="pg-row" style={{ alignItems: 'center' }}>
          <Avatar name="Jane Doe" />
          <Avatar name="Sam Osei" />
          <Avatar name="Priya Raman" size={40} />
          <Avatar name="Kenji Ito" size={24} />
          <AvatarGroup
            avatars={[{ name: 'Jane Doe' }, { name: 'Sam Osei' }, { name: 'Priya Raman' }, { name: 'Kenji Ito' }, { name: 'Ana Silva' }]}
            max={3}
          />
        </div>
      </section>

      <section className="pg-section">
        <h2>List / Timeline / Tree</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 200 }}>
            <List items={[{ id: 1, content: 'Ingest A' }, { id: 2, content: 'Ingest B' }, { id: 3, content: 'Ingest C' }]} />
          </div>
          <div style={{ width: 260 }}>
            <Timeline
              items={[
                { id: 1, title: 'Sync completed', timestamp: '2m ago', tone: 'green' },
                { id: 2, title: 'Retry scheduled', timestamp: '10m ago', tone: 'orange' },
                { id: 3, title: 'Sync failed', timestamp: '1h ago', tone: 'red', description: 'Auth token expired.' },
              ]}
            />
          </div>
          <div style={{ width: 220 }}>
            <Tree
              nodes={[
                { id: 'overview', label: 'Overview' },
                { id: 'reports', label: 'Reports', children: [{ id: 'weekly', label: 'Weekly' }, { id: 'monthly', label: 'Monthly' }] },
              ]}
              defaultExpandedIds={['reports']}
              selectedId={treeSelected}
              onSelect={setTreeSelected}
            />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>DescriptionList / CodeBlock / Kbd / CopyButton</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 220 }}>
            <DescriptionList
              columns={1}
              items={[
                { label: 'Region', value: 'North America' },
                { label: 'Status', value: 'Active only' },
              ]}
            />
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">Kbd</span>
            <div><Kbd>⌘</Kbd> <Kbd>K</Kbd></div>
          </div>
          <div className="pg-variant">
            <span className="pg-variant__label">CopyButton</span>
            <div className="pg-row" style={{ alignItems: 'center' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>ing_a1b2c3</code>
              <CopyButton text="ing_a1b2c3" />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, maxWidth: 420 }}>
          <CodeBlock language="bash" code={'npm install northline'} />
        </div>
      </section>

      <section className="pg-section">
        <h2>Carousel</h2>
        <div style={{ maxWidth: 420 }}>
          <Carousel
            autoPlay
            items={[
              <Card key="1"><Heading level={4}>Slide 1</Heading><Text size="sm" color="muted">First slide content.</Text></Card>,
              <Card key="2"><Heading level={4}>Slide 2</Heading><Text size="sm" color="muted">Second slide content.</Text></Card>,
              <Card key="3"><Heading level={4}>Slide 3</Heading><Text size="sm" color="muted">Third slide content.</Text></Card>,
            ]}
          />
        </div>
      </section>

      {/* ================= 8. Charts ================= */}
      <Heading level={2} className="pg-category">Charts</Heading>
      <Divider />

      <section className="pg-section">
        <h2>ScoreCard / Sparkline</h2>
        <div className="scorecards" style={{ marginBottom: 16 }}>
          <ScoreCard label="Total Volume" value="12,480" accent="indigo" trend={TREND} />
          <ScoreCard label="Success Rate" value="94.2%" accent="green" sub="97.2% success rate" direction="up" trend={TREND.map((v) => v + 4)} />
          <ScoreCard label="Errors" value="212" accent="rose" sub="1.7% of total" direction="down" trend={TREND.map((v) => 40 - v)} />
          <ScoreCard label="Distinct Segments" value="9" accent="cyan" />
        </div>
        <div className="pg-row">
          <div className="pg-variant" style={{ width: 200 }}>
            <span className="pg-variant__label">Blue</span>
            <Sparkline data={TREND} color={PALETTE[0]} />
          </div>
          <div className="pg-variant" style={{ width: 200 }}>
            <span className="pg-variant__label">Red (declining)</span>
            <Sparkline data={[...TREND].reverse()} color="#F19A9A" />
          </div>
        </div>
      </section>

      <section className="pg-section">
        <h2>ChartCard: combo + donut</h2>
        <div className="widgets-grid">
          <ChartCard id="demo-combo" title="Volume vs Rate" info="Bars = volume (left axis). Line = rate % (right axis)." width={520} height={320}>
            <Chart key={themeTick} type="bar" data={chartData} options={dualAxisOptions('%')} />
          </ChartCard>
          <ChartCard id="demo-pie" title="Distribution" info="Share of total by type." width={420} height={320}>
            <Doughnut key={themeTick} data={pieData} options={donutOptions()} />
          </ChartCard>
        </div>
      </section>

      <section className="pg-section">
        <h2>Chart helpers: horizontal bar / area / stacked / radar</h2>
        <div className="widgets-grid">
          <ChartCard id="demo-hbar" title="Top failure reasons" info="Ranked horizontal bars." width={420} height={280}>
            <Bar
              key={themeTick}
              data={{
                labels: ['Timeout', 'Auth error', 'Rate limited', 'Schema drift', 'Unknown'],
                datasets: [{ data: [38, 26, 19, 12, 7], backgroundColor: PALETTE[3], borderRadius: 4 }],
              }}
              options={horizontalBarOptions()}
            />
          </ChartCard>
          <ChartCard id="demo-area" title="Weekly signups" info="Single filled-line trend." width={420} height={280}>
            <Line
              key={themeTick}
              data={{
                labels: ['W01', 'W02', 'W03', 'W04', 'W05', 'W06'],
                datasets: [{ data: [12, 19, 15, 24, 28, 33], borderColor: PALETTE[0], backgroundColor: `${PALETTE[0]}33`, fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2 }],
              }}
              options={areaOptions()}
            />
          </ChartCard>
          <ChartCard id="demo-stacked" title="Volume by status" info="Stacked bars." width={420} height={280}>
            <Bar
              key={themeTick}
              data={{
                labels: ['W01', 'W02', 'W03', 'W04'],
                datasets: [
                  { label: 'Healthy', data: [30, 34, 32, 38], backgroundColor: PALETTE[5], borderRadius: 4 },
                  { label: 'Degraded', data: [6, 5, 7, 4], backgroundColor: PALETTE[3], borderRadius: 4 },
                  { label: 'Failed', data: [2, 3, 1, 2], backgroundColor: PALETTE[4], borderRadius: 4 },
                ],
              }}
              options={stackedBarOptions()}
            />
          </ChartCard>
          <ChartCard id="demo-radar" title="Segment scores" info="Multi-metric comparison." width={420} height={280}>
            <Radar
              key={themeTick}
              data={{
                labels: ['Speed', 'Accuracy', 'Coverage', 'Freshness', 'Cost'],
                datasets: [{ label: 'This segment', data: [8, 6, 9, 7, 5], borderColor: PALETTE[2], backgroundColor: `${PALETTE[2]}33`, pointBackgroundColor: PALETTE[2] }],
              }}
              options={radarOptions()}
            />
          </ChartCard>
        </div>
      </section>

      <section className="pg-section">
        <h2>ChartLegend / MiniBar</h2>
        <div className="pg-row" style={{ alignItems: 'flex-start' }}>
          <div className="pg-variant">
            <span className="pg-variant__label">ChartLegend</span>
            <ChartLegend items={[{ label: 'Volume', color: PALETTE[0] }, { label: 'Rate', color: PALETTE[1] }]} />
          </div>
          <div className="pg-variant" style={{ width: 200 }}>
            <span className="pg-variant__label">MiniBar</span>
            <MiniBar data={TREND} color={PALETTE[0]} />
          </div>
        </div>
      </section>
    </div>
  )
}
