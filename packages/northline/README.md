# Northline

A flat, mono-labeled dashboard theme: thin-bordered white cards, big
Space Grotesk numbers, IBM Plex Mono micro-labels, sparklines, and a
blue/teal/purple/orange Chart.js palette. Extracted from the Audience
Performance dashboard so it can be reused in other apps.

## Install

Run `npm run build` in this package first (produces `dist/index.js`,
`dist/theme.css`, and `.d.ts` declarations - see **Building** below), then
depend on it from another repo as a `file:` dependency:

```json
{ "dependencies": { "northline": "file:../northline/packages/northline" } }
```

or publish it (private npm / GitHub Packages) and install normally.

## Building

```bash
npm run build   # from this package, or `npm run build --workspace=northline` from the repo root
```

This is a Vite library-mode build (`vite.config.ts`): it compiles `src/` to
a single ES module (`dist/index.js`) with source maps, extracts `theme.css`
as a separate asset, and generates flat `.d.ts` declarations per component
via `vite-plugin-dts`. React/react-dom/chart.js/react-chartjs-2/
chartjs-plugin-datalabels stay external (peer dependencies), not bundled.

Re-run this after any source change - a `file:` dependency does not rebuild
automatically, so a consuming app only sees changes once `dist/` is
regenerated. The `playground` package is the exception: its Vite config
aliases `northline`/`northline/theme.css` straight to `src/`, so it keeps
instant HMR without a build step.

**Note on peer deps and duplicate modules:** because `northline` typically
lives outside the consuming app's own `node_modules` (a sibling repo via
`file:`), a consumer's bundler can resolve peer dependencies (React,
Chart.js, ...) against *this* repo's `node_modules` instead of its own,
creating two separate module instances (e.g. two Chart.js registries -
`installCharts()` registers scales on one copy while charts render with the
other, throwing `"category" is not a registered scale"`). If you hit that,
add a `resolve.dedupe` entry for the affected package(s) in the consumer's
Vite config.

## Storybook

```bash
npm run storybook          # dev server at http://localhost:6006
npm run build-storybook    # static build to storybook-static/
```

Config lives in `.storybook/` (`main.ts`, `preview.tsx`, `preview-head.html`
for the Google Fonts link); stories live in `stories/`, one file per
component, outside `src/` so they never end up in the published `dist/`.
`preview.tsx` registers Chart.js, imports `theme.css`, and adds a
light/dark toolbar toggle wired to the same `data-theme` attribute the rest
of the theme reads.

Stories exist for a representative set of ~22 components spanning every
category (actions, forms, feedback, overlays, data display, navigation,
disclosure), each with its meaningful states (disabled, error, empty,
open/closed, etc) - not literally all 72+ components. Add a
`ComponentName.stories.tsx` under `stories/` for anything else that needs
one; copy the shape of an existing story for the pattern (plain
presentational components take `args` directly, anything with
internal/controlled state needs a small wrapper component that owns
`useState` and is passed to `render`).

## Setup

1. Load the fonts (once, in `index.html`):

   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
     rel="stylesheet"
   />
   ```

2. Register Chart.js once, before any chart renders (e.g. top of `main.jsx`):

   ```js
   import { installCharts } from 'northline'
   installCharts()
   ```

3. Import the theme CSS once (pulls in tokens + base styles for every component):

   ```js
   import 'northline/theme.css'
   ```

   This must be a separate, explicit import - the built package's JS entry
   does *not* pull in the CSS as a side effect (Vite's library build strips
   CSS imports out of the compiled JS).

## Dark mode

Follows the OS/browser preference automatically (`prefers-color-scheme`).
To override it explicitly - e.g. an in-app theme toggle - set
`data-theme` on the `<html>` element:

```js
document.documentElement.dataset.theme = 'dark' // or 'light'
```

Leaving `data-theme` unset falls back to the system preference. All
component surfaces, borders, text, and status tones (`Badge`/`Avatar`/
`Toast`) repaint via CSS custom properties - no component code needs to
know which theme is active.

**Known gap:** Chart.js canvases (`ChartCard` contents) are drawn with the
colors in `PALETTE`/`TOOLTIP_OPTS`/`dualAxisOptions` from `chartTheme.js`,
which are plain hex strings, not CSS variables - they don't repaint on
theme change. If you need charts to follow the theme too, re-create the
chart (or update its options) when `data-theme`/`prefers-color-scheme`
changes.

## Responsiveness

One breakpoint, 640px (roughly phone-width), covers the patterns that
actually needed it:

- `ScoreCard`'s grid (`.scorecards`) drops from a fixed 4 columns to
  `auto-fit` (min 150px) instead of squishing.
- `Table`/`.nl-table-wrap` scrolls horizontally instead of clipping content.
- `Navbar`'s `items` menu collapses behind a hamburger toggle instead of
  wrapping/overflowing; `BottomNav` appears (it's `display: none` above the
  breakpoint).
- `ChartCard` drops its 320px `min-width` floor so it doesn't force page-level
  horizontal scroll.
- `Modal`/`Drawer` go full-bleed; `Pagination`/`SegmentedControl` wrap;
  `Stepper` scrolls horizontally rather than overflowing.

For the mobile primary-navigation pattern, pair `Canvas` + `Navbar` (brand +
actions only, or omit `items` since `BottomNav` is the primary nav on
phones) + `BottomNav`, rather than `Sidebar` (a persistent rail doesn't fit
a phone viewport - it isn't auto-hidden for you, since some apps do want it
on tablet-width screens; hide/show it yourself based on viewport if needed).

Everything else - `Stack`/`Grid`/`Container` sizes, flex-wrapping button
rows, etc - was already responsive by construction (flexbox/grid with
sensible min-widths), not by a breakpoint override.

## Components

| Component | Purpose |
|---|---|
| `ScoreCard` | KPI card: label, big value, colored delta, optional sparkline trend |
| `Sparkline` | Standalone inline SVG trend line |
| `ChartCard` | Draggable/resizable widget wrapper around a Chart.js chart, with an info tooltip |
| `Select` | Themed dropdown (single or `multiple` checkbox mode) — native `<option>` popups can't be restyled, so this is a full custom menu |
| `DateRangePicker` | Single-trigger calendar for picking a from/to range |
| `InfoTooltip` | Small (i) badge revealing a hover/focus tooltip |
| `Tabs` | Horizontal tab bar with an optional `comingSoon` disabled + badge state |
| `Button` | `primary` / `secondary` / `ghost` / `danger` variants, `sm` size |
| `Badge` | Status pill with pastel tones (`blue`, `teal`, `purple`, `orange`, `red`, `green`) and optional dot |
| `Input` | Labeled text field with hint/error state |
| `Switch` | Themed toggle backed by a native checkbox |
| `Table` | Plain data table: `columns` (`key`, `header`, `align`, `render`) + `rows`, optional row click |
| `Modal` | Portal-rendered dialog: `open`, `onClose`, `title`, `footer`, `size` (`sm`/`md`/`lg`) |
| `ToastProvider` / `useToast` | Wrap the app once, then call `show(message, { tone, duration })` from anywhere |
| `Checkbox` | Standalone themed checkbox |
| `RadioGroup` (+ `Radio`) | Themed radio group from an `options` list, or compose individual `Radio`s |
| `Textarea` | Multi-line counterpart to `Input`, same label/hint/error shape |
| `Skeleton` | Loading placeholder: `text` / `circle` / `rect` variants |
| `Menu` | Kebab-style popover action list (row actions, etc.) - lighter than `Select` |
| `Pagination` | Page-number list with prev/next, collapsing to ellipses for large page counts |
| `Breadcrumbs` | Location trail from an `items` list; last item renders as current page |
| `ProgressBar` | Linear quota/progress bar with optional label + percentage |
| `Gauge` | Circular counterpart to `ProgressBar`, value/label centered in the ring |
| `Avatar` | Image avatar, or a deterministic pastel initials badge when no `src` |
| `Card` | Plain flat bordered panel - the shared surface `ScoreCard`/`ChartCard` build on |
| `EmptyState` | Centered zero-data placeholder: icon, title, description, action |
| `Spinner` | Small themed loading spinner |
| `Accordion` | Expandable section list, single- or multi-open, controlled or uncontrolled |
| `SegmentedControl` | Button-group toggle for a small fixed set of options - lighter than `Tabs` |
| `ChartLegend` | Themed HTML legend to pair with a canvas chart whose own legend is switched off |
| `MiniBar` | Inline SVG bar sparkline - the bar-chart counterpart to `Sparkline` |
| `BulletChart` | Compact target-vs-actual bullet graph (fill + target tick in one track) |
| `Slider` | Themed range input (native `<input type="range">`, styled thumb/track) |
| `Stepper` | Horizontal multi-step progress indicator for wizard/setup flows |
| `Drawer` | Slide-in side panel - `Modal`'s edge-anchored counterpart |
| `Popover` | Generic anchored popover - arbitrary content, vs. `Menu`'s fixed action list |
| `TagInput` | Multi-value chip input: Enter/comma to add, Backspace to remove the last |
| `SearchInput` | Text input with a search icon and a clear button once there's a value |
| `CopyButton` | Icon button that copies text to the clipboard with brief "Copied" feedback |
| `StatusDot` | Bare colored indicator dot with optional label and `pulse` for a "live" state |
| `DescriptionList` | Label/value pairs grid for detail panels and drawers |

Generic, non-dashboard-specific primitives (typography/layout, feedback, remaining form inputs, data display, app shell) - for any app built on Northline, not just dashboards:

| Component | Purpose |
|---|---|
| `Text` | Generic text primitive: `size`, `weight`, `color`, `mono` |
| `Heading` | `level` 1-4 heading with Northline's display type scale |
| `Container` | Centered max-width content wrapper (`sm`/`md`/`lg`/`xl`/`full`) |
| `Stack` (+ `VStack`/`HStack`) | Flex layout with a consistent `gap` |
| `Grid` | Responsive-ish column grid (`columns`, `gap`) |
| `Divider` | Visual separator, plain or with a centered `label` |
| `Link` | Themed anchor, `external` adds `target="_blank"` safely |
| `Alert` | Persistent inline status banner (`info`/`success`/`warning`/`danger`), optional `onDismiss` |
| `IconButton` | Icon-only button, `Button`'s square counterpart |
| `Tooltip` | Generic hover/focus tooltip wrapping any single child element |
| `Fieldset` | The label+hint+error chrome `Input`/`Textarea` bake in, for custom controls |
| `Combobox` | Searchable/filterable select (free-text narrows the option list) |
| `NumberStepper` | Quantity input with +/- buttons, clamped to `min`/`max` |
| `FileUpload` | Drag-and-drop dropzone backed by a native file input |
| `DatePicker` | Single-date counterpart to `DateRangePicker` |
| `Rating` | Star rating, interactive or `readOnly` |
| `List` | Generic styled list, lighter than `Table` |
| `Timeline` | Vertical activity/event feed with a connected dot rail |
| `AvatarGroup` | Overlapping avatar stack with a "+N" overflow badge |
| `CodeBlock` | Monospace code snippet frame with optional language tag + copy button |
| `Kbd` | Keyboard-shortcut chip |
| `Tree` | Nested expandable hierarchy (file trees, category trees) |
| `Canvas` | Full-viewport app shell wrapper (background + flex column) - mount `Navbar`/routed content/`BottomNav` inside it |
| `Navbar` | App header bar: brand, an optional `items` nav menu (collapses behind a hamburger under 640px), and arbitrary actions |
| `BottomNav` | Fixed mobile bottom tab bar (icon + label), hidden above 640px - the mobile counterpart to `Navbar`'s menu/`Sidebar` |
| `Sidebar` | Persistent side navigation rail, with a `collapsed` icon-only mode |
| `ButtonGroup` | Visually merges adjacent `Button`s into one segmented-looking group |
| `ColorPicker` | Preset swatch grid plus a native color input for anything else |
| `Icon` | Inline-SVG icon set (`name`, `size`, `color`, `filled`) - see Icons below |
| `PasswordInput` | `Input`'s password variant with a show/hide eye toggle |
| `OTPInput` | Segmented verification-code input, auto-advancing with paste support |
| `LoadingOverlay` | Dims and blocks a section while `active`, with a centered `Spinner` |
| `ErrorBoundary` | Class-component error boundary with a themed fallback `Alert` and retry |
| `Carousel` | Single-item-at-a-time carousel with prev/next controls and dot indicators |
| `Portal` | Renders into `document.body` - the mechanism `Modal`/`Drawer`/`Toast` use internally |
| `useClickOutside` (hook) | The click-outside/Escape pattern used internally by several overlay components |

## Icons

Northline only ever uses inline SVG for icons - no emoji, no unicode symbol
characters, no icon fonts. They render inconsistently across platforms
(color-emoji fonts, missing glyphs, baseline misalignment) and can't be
recolored to match the theme. Every icon-shaped bit of UI in the kit (Modal's
close button, Menu's kebab, Pagination's chevrons, CopyButton, Alert's status
icons, etc) is built on the shared `Icon` component:

```jsx
import { Icon } from 'northline'

<Icon name="trash" size={16} />
<Icon name="star" filled />
```

`color` defaults to `currentColor`, so an icon inside a themed button/link
inherits that element's color automatically. If you need an icon `Icon`
doesn't have yet, add a path to the `PATHS` map in
`src/components/Icon.tsx` rather than reaching for an emoji or a separate
one-off icon component.

## Chart helpers

`chartTheme.js` exports `PALETTE`, `TOOLTIP_OPTS`, `getChartColors()` and
`onThemeChange()` (see Dark mode above), plus one options builder per chart
shape - each reads the active theme's colors fresh on every call:

| Helper | Chart shape |
|---|---|
| `dualAxisOptions(rightUnit, opts)` | Bar+line combo, left axis raw value / right axis 0-100% |
| `donutOptions(opts)` | Pie/donut (`cutout`, `showLegend`) |
| `horizontalBarOptions(opts)` | Ranked horizontal bars |
| `areaOptions(opts)` | Single filled-line trend |
| `stackedBarOptions(opts)` | Stacked bars (composition over time) |
| `radarOptions()` | Radar/spider, multi-metric comparison |

Plus `rollingAverage` for moving-average series.

## What's app-specific (not in this package)

Filter *logic* (which fields exist, how they combine) and page layout
(`.app`, `.filters` container, breadcrumb, `.data-table`) stay in the
consuming app — only the reusable visual system lives here.
