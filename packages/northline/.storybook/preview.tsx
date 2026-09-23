import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import { installCharts } from '../src/chartSetup'
import '../src/theme.css'

installCharts()

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Northline theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light'
      useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.body.style.background = 'var(--neutral-0)'
        document.body.style.transition = 'background 0.2s ease'
      }, [theme])
      return <Story />
    },
  ],
}

export default preview
