import { Fragment } from 'react'

import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components'

export type SelectOption = {
  label: React.ReactNode
  value: string
}

export type SelectGroupOption = {
  groupLabel?: React.ReactNode
  options: SelectOption[]
}

export type SelectProps = {
  options: SelectGroupOption[]
  onChange?: (value: string) => void
  value?: string
  placeholder?: string
  size?: 'sm' | 'default'
  className?: string
  disabled?: boolean
  invalid?: boolean
} & Omit<
  React.ComponentProps<typeof SelectTrigger>,
  'children' | 'onChange' | 'value' | 'asChild'
>

function Select({
  options,
  onChange,
  value,
  placeholder,
  size,
  className,
  disabled,
  invalid,
  ...props
}: SelectProps) {
  return (
    <SelectRoot value={value} onValueChange={onChange}>
      <SelectTrigger
        size={size}
        className={className}
        disabled={disabled}
        invalid={invalid}
        {...props}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton />
        {options.map((group, index) => (
          <Fragment key={`group-${index}`}>
            <SelectGroup key={`group-${index}`}>
              {group.groupLabel && (
                <SelectLabel>{group.groupLabel}</SelectLabel>
              )}
              {group.options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
            {index < options.length - 1 && <SelectSeparator />}
          </Fragment>
        ))}
        <SelectScrollDownButton />
      </SelectContent>
    </SelectRoot>
  )
}

export { Select }
