import type { Meta } from '@storybook/react'

import { ScrollArea } from '.'

export default {
  component: ScrollArea,
  title: 'layout/scroll-area',
} satisfies Meta<typeof ScrollArea>

export const Default = () => (
  <ScrollArea className="h-72 w-48 rounded-md border">
    <ul className="divide-y">
      {Array.from({ length: 100 }, (_, i) => i).map(i => (
        <li key={i} className="text-center">
          {i}
        </li>
      ))}
    </ul>
  </ScrollArea>
)
