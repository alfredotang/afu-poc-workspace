import { cn } from '@libs/helpers/className'

import * as StepperPrimitive from './components'

export type StepperOption = {
  step: number
  title?: React.ReactNode
  description?: React.ReactNode
  loading?: boolean
  disabled?: boolean
}

type StepperProps = React.ComponentProps<typeof StepperPrimitive.Root> & {
  options: StepperOption[]
}

/**
 * @see https://originui.com/stepper
 */
const Stepper = ({ options, ...props }: StepperProps) => {
  return (
    <StepperPrimitive.Root {...props}>
      {options.map((item, index) => {
        const isLast = index === options.length - 1
        const hasLabel = Boolean(item.title) || Boolean(item.description)
        return (
          <StepperPrimitive.Item
            key={item.step}
            step={item.step}
            className={cn('flex flex-1', {
              'flex-col items-baseline':
                hasLabel && props.orientation !== 'vertical',
              'items-start': props.orientation === 'vertical',
            })}
            loading={item.loading}
            disabled={item.disabled}
          >
            <StepperPrimitive.Trigger>
              <StepperPrimitive.Indicator />
              {hasLabel && (
                <div className="text-left">
                  {item.title && (
                    <StepperPrimitive.Title>
                      {item.title}
                    </StepperPrimitive.Title>
                  )}
                  {item.description && (
                    <StepperPrimitive.Description>
                      {item.description}
                    </StepperPrimitive.Description>
                  )}
                </div>
              )}
            </StepperPrimitive.Trigger>
            {!isLast && (
              <StepperPrimitive.Separator
                className={cn({
                  'mx-4': hasLabel && props.orientation !== 'vertical',
                  'ml-2.5': props.orientation === 'vertical',
                })}
              />
            )}
          </StepperPrimitive.Item>
        )
      })}
    </StepperPrimitive.Root>
  )
}

export { Stepper }
