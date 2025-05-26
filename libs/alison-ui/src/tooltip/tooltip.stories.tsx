import { Button } from '@alison-ui/button'

import type { Meta } from '@storybook/react'

import * as Tooltip from '.'

export default {
  title: 'ui/tooltip',
  component: Tooltip.Root,
} as Meta

export const Default = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button>Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>This is a tooltip</Tooltip.Content>
    </Tooltip.Root>
  )
}

export const Overview = () => {
  return (
    <main>
      <section className="grid grid-cols-[repeat(3,100px)] gap-8">
        <div />
        {/* Top */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button>Top</Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="top">Tooltip on the top</Tooltip.Content>
        </Tooltip.Root>
        <div />
      </section>
      <section className="grid grid-cols-[repeat(3,100px)] gap-8">
        {/* Left */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button>Left</Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">Tooltip on the left</Tooltip.Content>
        </Tooltip.Root>
        <div />
        {/* Right */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button>Right</Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Tooltip on the right</Tooltip.Content>
        </Tooltip.Root>
      </section>
      <section className="grid grid-cols-[repeat(3,100px)] gap-8">
        <div />
        {/* Bottom */}
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button>Bottom</Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">Tooltip on the bottom</Tooltip.Content>
        </Tooltip.Root>
        <div />
      </section>
    </main>
  )
}
