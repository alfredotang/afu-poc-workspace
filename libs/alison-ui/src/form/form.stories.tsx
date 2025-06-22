import { useState } from 'react'

import { Button } from '@alison-ui/button'
import * as Card from '@alison-ui/card'
import { Checkbox } from '@alison-ui/checkbox'
import { DayTimeRangePicker } from '@alison-ui/day-time-range-picker'
import * as Dialog from '@alison-ui/dialog'
import { Input } from '@alison-ui/input'
import { RadioGroup } from '@alison-ui/radio-group'
import { Select } from '@alison-ui/select'
import { Slider } from '@alison-ui/slider'

import type { Meta } from '@storybook/react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as y from 'yup'

import { Form, FormField } from '.'

export default {
  component: FormField,
  title: 'forms/form',
} satisfies Meta<typeof FormField>

const SIZE_OPTIONS = ['small', 'medium', 'large'] as const

const schema = y.object({
  name: y.string().required(),
  isChecked: y.boolean().required(),
  size: y.mixed<(typeof SIZE_OPTIONS)[number]>().oneOf(SIZE_OPTIONS).required(),
  dateRange: y
    .object({
      from: y.string().required('Start date is required'),
      to: y.string().required('End date is required'),
    })
    .required('Date range is required'),
  age: y.number().required(),
  slider: y.array(y.number()).required(),
  rangeSlider: y.array(y.number()).required(),
})

type FormValues = y.InferType<typeof schema>

export const Default = () => {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<FormValues | null>(null)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      rangeSlider: [1, 100],
    },
  })

  const onSubmit = (data: FormValues) => {
    setResult(data)
    setOpen(true)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-[1fr_300px] gap-6"
        >
          <Card.Root>
            <Card.Header>
              <Card.Title>Form</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                label="Container Name"
                render={() => (
                  <Input {...form.register('name')} className="w-[200px]" />
                )}
              />
              <FormField
                control={form.control}
                name="isChecked"
                render={({ field }) => (
                  <Checkbox {...field} label="Hello World" />
                )}
              />
              <FormField
                control={form.control}
                name="size"
                label="Size"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    options={SIZE_OPTIONS.map(size => ({
                      label: size,
                      value: size,
                    }))}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                label="Date Range"
                render={({ field }) => (
                  <DayTimeRangePicker
                    {...field}
                    className="w-[200px]"
                    enableTime
                  />
                )}
              />
              <FormField
                control={form.control}
                name="age"
                label="Age"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value?.toString()}
                    className="w-[200px]"
                    options={[
                      {
                        options: Array.from({ length: 100 }, (_, i) => ({
                          label: `Option ${i + 1}`,
                          value: i.toString(),
                        })),
                      },
                    ]}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="slider"
                label="Slider"
                render={({ field }) => <Slider {...field} />}
              />
              <FormField
                control={form.control}
                name="rangeSlider"
                label="Range Slider"
                render={({ field }) => <Slider {...field} />}
              />
            </Card.Content>
          </Card.Root>
          <Card.Root className="h-fit">
            <Card.Header>
              <Card.Title>Actions</Card.Title>
            </Card.Header>
            <Card.Content>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </Card.Content>
          </Card.Root>
        </form>
      </Form>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
        closable
        title="Form Result"
      >
        <Dialog.Content>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="outline">Close</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
