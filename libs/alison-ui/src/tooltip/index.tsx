import {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from './components'

type TooltipSide = React.ComponentProps<typeof TooltipContent>['side']

export type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  side?: TooltipSide
} & React.ComponentProps<typeof TooltipRoot>

function Tooltip({ children, content, side, ...props }: TooltipProps) {
  return (
    <TooltipRoot {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  )
}

export { Tooltip }
