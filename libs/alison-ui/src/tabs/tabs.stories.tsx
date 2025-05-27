import type { Meta } from '@storybook/react'

import * as Tabs from '.'

export default {
  component: Tabs.Root,
  title: 'ui/tabs',
  argTypes: {
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof Tabs.Root>

export const Default = () => (
  <Tabs.Root defaultValue="tab1">
    <Tabs.List>
      <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1">Content 1</Tabs.Content>
    <Tabs.Content value="tab2">Content 2</Tabs.Content>
    <Tabs.Content value="tab3">Content 3</Tabs.Content>
  </Tabs.Root>
)
