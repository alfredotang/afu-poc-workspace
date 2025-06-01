'use client'

import * as React from 'react'

import { Label } from '@alison-ui/label'

import { cn } from '@libs/helpers/className'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

export type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  'checked' | 'onCheckedChange' | 'value' | 'onChange'
> & {
  value?: boolean | 'indeterminate'
  onChange?: (checked: boolean | 'indeterminate') => void
  invalid?: boolean
  label?: React.ReactNode
  labelClassName?: string
}

/**
 * @see https://www.radix-ui.com/primitives/docs/components/checkbox
 */
function Checkbox({
  className,
  invalid,
  value,
  onChange,
  label,
  labelClassName,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = React.useId()
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={id || checkboxId}
        data-slot="checkbox"
        className={cn(
          'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          'cursor-pointer',
          'aria-invalid:border-destructive',
          {
            'border-destructive': invalid,
          },
          className
        )}
        aria-invalid={invalid}
        checked={value}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label htmlFor={id || checkboxId} className={labelClassName}>
          {label}
        </Label>
      )}
    </div>
  )
}

export { Checkbox }
