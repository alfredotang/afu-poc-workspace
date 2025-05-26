import { useMemo, useState } from 'react'

import type { Meta } from '@storybook/react'

import * as DropdownMenu from '.'

import { Button } from '../button'

export default {
  component: DropdownMenu.Root,
  title: 'ui/dropdown-menu',
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
} satisfies Meta<typeof DropdownMenu.Root>

export const Overview = () => (
  <div className="flex gap-4">
    <Default />
    <Checkbox />
    <Radio />
  </div>
)

export const Default = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <Button>Open dropdown</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item variant="destructive">Log out</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export const Checkbox = () => {
  const options = useMemo(
    () =>
      [
        {
          label: 'Status Bar',
          value: 'status-bar',
          disabled: false,
        },
        {
          label: 'Activity Bar',
          value: 'activity-bar',
        },
        {
          label: 'Panel',
          value: 'panel',
        },
      ] as const,
    []
  )

  const [selected, setSelected] = useState<
    Array<(typeof options)[number]['value']>
  >([])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Checkbox</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Appearance</DropdownMenu.Label>
        <DropdownMenu.Separator />
        {options.map(option => (
          <DropdownMenu.CheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={checked => {
              if (checked) {
                setSelected(current => [...current, option.value])
              } else {
                setSelected(current =>
                  current.filter(value => value !== option.value)
                )
              }
            }}
          >
            {option.label}
          </DropdownMenu.CheckboxItem>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export const Radio = () => {
  const [position, setPosition] = useState('bottom')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary">Radio</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
