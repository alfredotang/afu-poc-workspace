'use client'

import * as React from 'react'

import { Button, buttonVariants } from '@alison-ui/button'
import * as DropdownMenu from '@alison-ui/dropdown-menu'
import { ScrollArea } from '@alison-ui/scroll-area'

import { cn } from '@libs/helpers/className'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DayPicker,
  type DropdownOption,
  type DateRange,
  type DayPickerProps,
} from 'react-day-picker'

export type CalendarProps = DayPickerProps

const CalendarDropdown = ({
  options,
  value,
  onChange,
}: {
  options?: DropdownOption[]
  value?: string | number | readonly string[] | undefined
  onChange?: (value: DropdownOption['value']) => void
}) => {
  const isYearsDropdown = options?.some(option => option.value === 1999)
  const dropdownOptions = isYearsDropdown
    ? options?.slice().sort((a, b) => b.value - a.value)
    : options
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="sm" className="font-normal">
          {options?.find(option => option.value === value)?.label}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild>
        <ScrollArea className="h-[200px]">
          {dropdownOptions?.map(option => (
            <DropdownMenu.Item
              key={option.value}
              disabled={option.disabled}
              onClick={() => onChange?.(option.value)}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </ScrollArea>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

/**
 * @see https://daypicker.dev/
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  navLayout = 'around',
  captionLayout = 'dropdown',
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn('w-fit p-3', className)}
      classNames={{
        months: cn('flex gap-2 relative w-fit sm:flex-row flex-col'),
        month: cn('flex flex-col gap-4'),
        month_caption: cn('flex justify-center items-center gap-2'),
        caption_label: cn('text-sm font-medium hidden'),
        nav: cn('flex items-center gap-1'),
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-0'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-0'
        ),
        table: cn('w-full border-collapse space-x-1'),
        weekdays: cn('flex'),
        weekday: cn(
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]'
        ),
        week: cn('flex w-full mt-2'),
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 group',
          {
            'aria-selected:rounded-md': props.mode !== 'range',
          },
          {
            '[.day-range-end]:rounded-r-md [&.day-range-start]:rounded-l-md':
              props.mode == 'range',
          }
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal',
          'group-aria-selected:hover:bg-primary group-aria-selected:hover:text-primary-foreground'
        ),
        range_start: cn(
          'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground'
        ),
        range_end: cn(
          'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground'
        ),
        selected: cn(
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
        ),
        today: cn(
          'not-aria-selected:rounded-md not-aria-selected:text-primary'
        ),
        outside: cn(
          'day-outside text-muted-foreground aria-selected:text-muted-foreground'
        ),
        disabled: cn('text-muted-foreground opacity-50'),
        range_middle: cn(
          'aria-selected:bg-accent aria-selected:text-accent-foreground'
        ),
        hidden: cn('invisible'),
        ...classNames,
      }}
      components={{
        Chevron: props => {
          if (props.orientation === 'left') {
            return (
              <ChevronLeft className={cn('size-4', className)} {...props} />
            )
          }
          return <ChevronRight className={cn('size-4', className)} {...props} />
        },
        Dropdown: props => (
          <CalendarDropdown
            value={props.value}
            options={props.options}
            onChange={value => {
              props.onChange?.({
                target: { value },
              } as unknown as React.ChangeEvent<HTMLSelectElement>)
            }}
          />
        ),
      }}
      navLayout={navLayout}
      {...props}
    />
  )
}

export { Calendar }
export type { DateRange }
