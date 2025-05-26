import { useState } from 'react'

import type { Meta } from '@storybook/react'

import * as InputOTP from './index'

export default {
  title: 'forms/input-otp',
  component: InputOTP.Root,
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: 'text',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
    maxLength: {
      control: 'number',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    onChange: {
      action: 'changed',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
} satisfies Meta<typeof InputOTP.Root>

export const Overview = () => (
  <div className="flex flex-col gap-4">
    <InputOTP.Root maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP.Root>

    <InputOTP.Root maxLength={6} disabled>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP.Root>
    <InputOTP.Root maxLength={6} invalid>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP.Root>
    <InputOTP.Root maxLength={6} disabled invalid>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP.Root>
  </div>
)

export const WithSeparator = () => (
  <InputOTP.Root maxLength={6}>
    <InputOTP.Group>
      <InputOTP.Slot index={0} />
      <InputOTP.Slot index={1} />
      <InputOTP.Slot index={2} />
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      <InputOTP.Slot index={3} />
      <InputOTP.Slot index={4} />
      <InputOTP.Slot index={5} />
    </InputOTP.Group>
  </InputOTP.Root>
)

export const Disabled = () => (
  <InputOTP.Root maxLength={6} disabled>
    <InputOTP.Group>
      <InputOTP.Slot index={0} />
      <InputOTP.Slot index={1} />
      <InputOTP.Slot index={2} />
      <InputOTP.Slot index={3} />
      <InputOTP.Slot index={4} />
      <InputOTP.Slot index={5} />
    </InputOTP.Group>
  </InputOTP.Root>
)

export const Invalid = () => (
  <InputOTP.Root maxLength={6} invalid>
    <InputOTP.Group>
      <InputOTP.Slot index={0} />
      <InputOTP.Slot index={1} />
      <InputOTP.Slot index={2} />
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      <InputOTP.Slot index={3} />
      <InputOTP.Slot index={4} />
      <InputOTP.Slot index={5} />
    </InputOTP.Group>
  </InputOTP.Root>
)

export const Controlled = () => {
  const [value, setValue] = useState('123')

  return (
    <>
      <InputOTP.Root maxLength={6} value={value} onChange={setValue}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot index={3} />
          <InputOTP.Slot index={4} />
          <InputOTP.Slot index={5} />
        </InputOTP.Group>
      </InputOTP.Root>
      <p className="mt-4 text-sm">Value: {value}</p>
    </>
  )
}
