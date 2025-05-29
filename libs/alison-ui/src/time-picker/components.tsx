import { Button } from '@alison-ui/button'

import { cn } from '@libs/helpers/className'
import dayjs from 'dayjs'
import { ClockIcon, CheckIcon } from 'lucide-react'

import type { TimeOption } from './types'

export const TimeItem = ({
  option,
  selected,
  onSelect,
  className,
  disabled,
}: {
  option: TimeOption
  selected: boolean
  onSelect: (option: TimeOption) => void
  className?: string
  disabled?: boolean
}) => {
  return (
    <Button
      variant="ghost"
      className={cn('flex justify-center px-1 ps-1 pe-2', className)}
      onClick={() => onSelect(option)}
      disabled={disabled}
    >
      <div className="w-4">
        {selected && <CheckIcon className="my-auto size-4" />}
      </div>
      <span className="ms-2">{option.label}</span>
    </Button>
  )
}

export const DisplayButton = ({
  value,
  enableSeconds,
  disabled,
  placeholder,
  invalid,
  open,
  className,
  onClick,
}: {
  value?: string
  enableSeconds?: boolean
  disabled?: boolean
  placeholder?: string
  invalid?: boolean
  open?: boolean
  className?: string
  onClick?: () => void
}) => {
  return (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      className={cn(
        'flex items-center justify-normal gap-2 font-normal',
        {
          '!border-destructive text-destructive': invalid,
        },
        className
      )}
      onClick={onClick}
    >
      <ClockIcon className="size-4" />
      <span
        className={cn('truncate font-normal', {
          'text-muted-foreground': !value,
          'text-destructive': invalid,
        })}
      >
        {value
          ? dayjs(value).format(enableSeconds ? 'HH:mm:ss' : 'HH:mm')
          : placeholder}
      </span>
    </Button>
  )
}
