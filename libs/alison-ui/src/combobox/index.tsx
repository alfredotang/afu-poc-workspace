'use client'

import * as React from 'react'

import { Button } from '@alison-ui/button'
import * as Command from '@alison-ui/command/components'
import * as Popover from '@alison-ui/popover/components'
import { ScrollArea } from '@alison-ui/scroll-area'

import { cn } from '@libs/helpers/className'
import { Check, ChevronsUpDown } from 'lucide-react'

export type ComboboxOption = {
  value: string
  label: React.ReactNode
}

export type ComboboxProps = {
  placeholder?: string
  options: ComboboxOption[]
  value?: string
  emptyMessage?: React.ReactNode
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
  invalid?: boolean
  onChange?: (value: string) => void
}

const getComboboxValue = ({
  value,
  placeholder,
  selectedOption,
}: {
  value?: string
  placeholder?: string
  selectedOption?: ComboboxOption
}) => {
  if (!selectedOption && value) return null
  return selectedOption?.label || placeholder
}

export function Combobox({
  placeholder = 'Select an option',
  options,
  value,
  emptyMessage = 'Not Found',
  searchPlaceholder = 'Search...',
  className,
  disabled,
  invalid,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selectedOption = options.find(option => option.value === value)
  const selectedOptionRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (open) {
        selectedOptionRef.current?.scrollIntoView({
          behavior: 'auto',
        })
      }
    }, 1)
    return () => clearTimeout(timeoutId)
  }, [open])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between', className, {
            '!border-destructive text-destructive': invalid,
          })}
          disabled={disabled}
        >
          <span
            className={cn('truncate font-normal', {
              'text-muted-foreground': !selectedOption,
              'text-destructive': invalid,
            })}
          >
            {getComboboxValue({
              value,
              selectedOption: selectedOption,
              placeholder,
            })}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="min-w-(--radix-popover-trigger-width) p-0">
        <Command.Root>
          <Command.Input placeholder={searchPlaceholder} className="h-9" />
          <Command.List>
            <Command.Empty>{emptyMessage}</Command.Empty>
            <Command.Group>
              <ScrollArea className="h-[200px]">
                {options.map(option => (
                  <Command.Item
                    key={option.value}
                    value={option.value}
                    ref={option.value === value ? selectedOptionRef : undefined}
                    onSelect={currentValue => {
                      const newValue =
                        currentValue === value ? '' : currentValue
                      onChange?.(newValue)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </Command.Item>
                ))}
              </ScrollArea>
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  )
}
