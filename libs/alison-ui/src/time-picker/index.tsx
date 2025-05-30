import { useEffect } from 'react'

import * as Popover from '@alison-ui/popover'
import { ScrollArea } from '@alison-ui/scroll-area'

import { DisplayButton, TimeItem } from './components'
import { useTimePickerState } from './use-time-picker-state'
import { buildTime } from './utils'

export type TimePickerProps = {
  /**
   * ISO 8601 time string
   */
  value?: string
  /**
   * ISO 8601 time string
   */
  min?: string
  /**
   * ISO 8601 time string
   */
  max?: string
  disabled?: boolean
  invalid?: boolean
  enableSeconds?: boolean
  placeholder?: string
  className?: string
  /**
   * Step in minutes
   */
  step?: number
  onChange?: (date: string) => void
}

export function TimePicker({
  value,
  invalid,
  min,
  max,
  disabled,
  enableSeconds,
  placeholder = 'Select time',
  className,
  step,
  onChange,
}: TimePickerProps) {
  const {
    isPopoverVisible,
    timeItems,
    hour,
    minute,
    second,
    onChangePopoverVisible,
  } = useTimePickerState({ value, min, max, enableSeconds, step })

  useEffect(() => {
    const newValue = buildTime({
      value,
      hour,
      minute,
      second,
    })
    onChange?.(newValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, second, value])

  return (
    <Popover.Root
      open={disabled ? false : isPopoverVisible}
      onOpenChange={onChangePopoverVisible}
    >
      <Popover.Trigger asChild>
        <div className="h-fit w-fit">
          <DisplayButton
            className={className}
            value={value}
            enableSeconds={enableSeconds}
            disabled={disabled}
            placeholder={placeholder}
            invalid={invalid}
            open={isPopoverVisible}
          />
        </div>
      </Popover.Trigger>
      <Popover.Content className="p-0" side="top">
        <div className="flex-col gap-2 p-2">
          <div className="flex h-56 grow">
            {timeItems.map(item => (
              <ScrollArea className="h-full flex-grow" key={item.key}>
                <div className="flex grow flex-col items-stretch overflow-y-auto pe-2">
                  {item.options.map(option => (
                    <div
                      ref={
                        option.value === item.currentValue
                          ? item.ref
                          : undefined
                      }
                      key={option.value}
                    >
                      <TimeItem
                        option={option}
                        selected={option.value === item.currentValue}
                        onSelect={item.onSelect}
                        disabled={option.disabled}
                        className="h-8"
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
