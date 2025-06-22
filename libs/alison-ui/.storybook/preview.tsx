import './storybook.css'

import React from 'react'

import type { Preview } from '@storybook/react'

import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
    },
  },
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </>
    ),
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'dark',
    }),
  ],
}

export default preview
