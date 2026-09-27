# Northline

A flat, mono-labeled dashboard theme and component kit: thin-bordered white
cards, big Space Grotesk numbers, IBM Plex Mono micro-labels, sparklines,
and a blue/teal/purple/orange Chart.js palette.

**[→ Browse the live, interactive component explorer](https://bhvikp.github.io/northline/)**
(Storybook - every component, every state, light/dark toggle included)

This is a standalone workspace for maturing the theme in isolation - no
dashboard app required to develop it.

## Structure

```
packages/
  northline/   the actual theme + component library
  playground/   a small Vite + React app that imports it, for visual dev
```

## Getting started

```bash
npm install
npm run dev     # starts the playground at http://localhost:5174
```

Edit anything in `packages/northline/src` and the playground hot-reloads
(it's a workspace symlink, not a copy).

## Components

See [`packages/northline/README.md`](packages/northline/README.md) for
the full component list and integration notes.
