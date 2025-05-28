import { useState } from 'react'

import { Button } from '@alison-ui/button'

import type { Meta } from '@storybook/react'

import { Stepper, type StepperOption } from '.'

export default {
  component: Stepper,
  title: 'ui/stepper',
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    options: {
      control: 'object',
      table: {
        type: {
          summary: 'StepperOption[]',
          detail: `
            {
              step: number
              label?: React.ReactNode
              description?: React.ReactNode
            }[]
          `,
        },
      },
    },
  },
} satisfies Meta<typeof Stepper>

const optionsDict = {
  Default: [
    {
      step: 1,
    },
    {
      step: 2,
    },
    {
      step: 3,
    },
  ] satisfies StepperOption[],
  WithTitle: [
    {
      step: 1,
      title: 'Step 1',
    },
    {
      step: 2,
      title: 'Step 2',
    },
    {
      step: 3,
      title: 'Step 3',
    },
  ] satisfies StepperOption[],
  WithDescription: [
    {
      step: 1,
      title: 'Step 1',
      description: 'Description for Step 1',
    },
    {
      step: 2,
      title: 'Step 2',
      description: 'Description for Step 2',
    },
    {
      step: 3,
      title: 'Step 3',
      description: 'Description for Step 3',
    },
  ] satisfies StepperOption[],
  loading: [
    {
      step: 1,
    },
    {
      step: 2,
      loading: true,
    },
    {
      step: 3,
    },
  ] satisfies StepperOption[],
  disabled: [
    {
      step: 1,
    },
    {
      step: 2,
      disabled: true,
    },
    {
      step: 3,
    },
  ] satisfies StepperOption[],
}

export const Overview = () => (
  <div className="space-y-6">
    <Default />
    <Loading />
    <Disabled />
    <WithTitle />
    <WithDescription />
    <Vertical />
  </div>
)

export const Default = () => (
  <Stepper options={optionsDict.Default} defaultValue={2} />
)

export const Loading = () => (
  <Stepper options={optionsDict.loading} defaultValue={2} />
)

export const Disabled = () => (
  <Stepper options={optionsDict.disabled} defaultValue={1} />
)

export const WithTitle = () => (
  <Stepper options={optionsDict.WithTitle} defaultValue={2} />
)

export const WithDescription = () => (
  <Stepper options={optionsDict.WithDescription} defaultValue={2} />
)

export const Vertical = () => (
  <Stepper
    options={optionsDict.WithDescription}
    orientation="vertical"
    defaultValue={2}
  />
)

export const Controlled = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="space-y-6">
      <Stepper options={optionsDict.WithDescription} value={step} />
      <div className="flex w-full justify-between gap-4">
        <Button
          onClick={() => setStep(current => current - 1)}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          disabled={step === optionsDict.WithDescription.length}
          onClick={() => setStep(current => current + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
