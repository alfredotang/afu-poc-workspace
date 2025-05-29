'use client'

import * as React from 'react'

import { cn } from '@libs/helpers/className'
import * as LabelPrimitive from '@radix-ui/react-label'

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  invalid?: boolean
  disabled?: boolean
}

function Label({ className, invalid, disabled, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        {
          'text-destructive': invalid,
          'text-muted-foreground cursor-not-allowed': disabled,
        },
        className
      )}
      {...props}
    />
  )
}

export { Label }
