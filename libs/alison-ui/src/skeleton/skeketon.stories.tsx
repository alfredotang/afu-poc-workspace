import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from '.'

export default {
  component: Skeleton,
  title: 'feedback/skeleton',
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>

export const Default: StoryObj<typeof Skeleton> = {
  args: {
    className: 'h-6 w-full',
  },
}

export const Overview = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="size-6 rounded-full" />
    <Skeleton className="h-16 w-24" />
    <Skeleton className="h-6 w-full" />
  </div>
)
