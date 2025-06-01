import { Button } from '@alison-ui/button'
import { Calendar } from '@alison-ui/calendar'
import * as Popover from '@alison-ui/popover'
import { TimePicker } from '@alison-ui/time-picker'
import type { TimeStep } from '@alison-ui/time-picker/types'
import { mapCalendarMinMax } from '@alison-ui/utils'

import { cn } from '@libs/helpers/className'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { CalendarIcon } from 'lucide-react'

import { getDisplayValue, mapChangeValue } from './utils'

dayjs.extend(timezone)
dayjs.extend(utc)

export type DayTimePickerProps = {
  /**
   * ISO 8601 date string
   */
  value?: {
    from?: string
    to?: string
  }
  /**
   * ISO 8601 date string
   */
  min?: string
  /**
   * ISO 8601 date string
   */
  max?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  placeholder?: string
  /**
   * Step in minutes
   * @default 1
   * @optional 1, 5, 10, 15, 30
   */
  minuteStep?: TimeStep
  timeZone?: string
  enableTime?: boolean
  enableSeconds?: boolean
  timePlaceholder?: string
  formatter?: (date: string) => string
  onChange?: (date: { from?: string; to?: string }) => void
} & Omit<
  React.ComponentProps<typeof Button>,
  'children' | 'variant' | 'size' | 'onChange' | 'value'
>

export function DayTimeRangePicker({
  value,
  min,
  max,
  disabled,
  invalid,
  className,
  timeZone = dayjs.tz.guess(),
  placeholder = 'Select',
  minuteStep = 1,
  enableTime = false,
  enableSeconds = false,
  timePlaceholder,
  formatter,
  onChange,
  ...props
}: DayTimePickerProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'justify-between',
            {
              '!border-destructive text-destructive': invalid,
            },
            className
          )}
          {...props}
        >
          <span
            className={cn('truncate font-normal', {
              'text-muted-foreground': !value,
              'text-destructive': invalid,
            })}
          >
            {getDisplayValue({
              value,
              formatter,
              enableTime,
              enableSeconds,
              placeholder,
              timeZone,
            })}
          </span>
          <CalendarIcon className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto">
        <div className="flex flex-col gap-4">
          <Calendar
            mode="range"
            selected={
              value
                ? {
                    from: value.from ? dayjs(value.from).toDate() : undefined,
                    to: value.to ? dayjs(value.to).toDate() : undefined,
                  }
                : undefined
            }
            onSelect={date =>
              onChange?.(
                mapChangeValue({
                  value,
                  newValue: date,
                  enableTime,
                  min,
                  max,
                  minuteStep,
                })
              )
            }
            disabled={mapCalendarMinMax({ min, max })}
            numberOfMonths={2}
            timeZone={timeZone}
            showOutsideDays={false}
          />
          {enableTime && (
            <div className="flex w-full justify-between gap-4">
              <TimePicker
                className="w-full"
                value={value?.from}
                onChange={date =>
                  onChange?.({
                    from: date,
                    to: value?.to,
                  })
                }
                enableSeconds={enableSeconds}
                placeholder={timePlaceholder}
                step={minuteStep}
                timeZone={timeZone}
                min={min}
                max={max}
              />
              <TimePicker
                className="w-full"
                value={value?.to}
                onChange={date =>
                  onChange?.({
                    from: value?.from,
                    to: date,
                  })
                }
                enableSeconds={enableSeconds}
                placeholder={timePlaceholder}
                step={minuteStep}
                timeZone={timeZone}
                min={min}
                max={max}
              />
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
