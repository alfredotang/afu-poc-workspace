import * as React from 'react'

import { cn } from '@libs/helpers/className'

type InputProps = React.ComponentProps<'input'> & {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  invalid?: boolean
}

function Input({
  className,
  type,
  leading,
  trailing,
  invalid,
  ...props
}: InputProps) {
  return (
    <div className="relative inline-flex items-center">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:border-destructive',
          { 'ps-8': Boolean(leading) },
          { 'pe-8': Boolean(trailing) },
          { 'border-destructive': invalid },
          className
        )}
        {...props}
      />
      {leading && (
        <span className="absolute inset-y-0 start-3 flex items-center">
          {React.cloneElement(
            leading as React.ReactElement<{ className: string }>,
            {
              className: 'size-4 text-muted-foreground ',
            }
          )}
        </span>
      )}
      {trailing && (
        <span className="absolute inset-y-0 end-3 flex items-center">
          {React.cloneElement(
            trailing as React.ReactElement<{ className: string }>,
            {
              className: 'size-4 text-muted-foreground ',
            }
          )}
        </span>
      )}
    </div>
  )
}

export { Input }
