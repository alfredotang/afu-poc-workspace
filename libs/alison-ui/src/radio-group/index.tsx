'use client'

import React, { useId } from 'react'

import { Label } from '@alison-ui/label'

import { cn } from '@libs/helpers/className'

import * as RadioGroupPrimitive from './components'

export type RadioGroupProps = {
  id?: string
  className?: string
  itemClassName?: string
  options?: RadioOptions[]
  onChange?: (value: string) => void
  value?: string
  invalid?: boolean
  disabled?: boolean
}

export type RadioOptions = {
  label?: React.ReactNode
  value: string
  disabled?: boolean
}

export function RadioGroup({
  className,
  id,
  itemClassName,
  value,
  options,
  disabled,
  invalid,
  onChange,
}: RadioGroupProps) {
  const radioId = useId()
  return (
    <RadioGroupPrimitive.Root
      id={id}
      className={cn(
        'flex flex-wrap items-center gap-4',
        {
          'cursor-not-allowed': disabled,
        },
        className
      )}
      defaultValue={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      {options?.map((option, index) => (
        <div
          key={`${option.value}-${index}`}
          className={cn(
            'flex cursor-pointer items-center gap-1',
            itemClassName
          )}
        >
          <RadioGroupPrimitive.Item
            id={`${radioId}-${option.value}`}
            invalid={invalid}
            value={option.value}
            disabled={option.disabled}
          />
          {option.label ? (
            <Label
              htmlFor={`${radioId}-${option.value}`}
              disabled={disabled}
              className={cn('font-normal', { 'cursor-pointer': !disabled })}
            >
              {option.label}
            </Label>
          ) : null}
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  )
}
