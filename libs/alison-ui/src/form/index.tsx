import { cn } from '@libs/helpers/className'
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField as PrimitiveFormField,
} from './components'

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  className?: string
  label?: React.ReactNode
  description?: React.ReactNode
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  label,
  description,
  render,
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <PrimitiveFormField
      {...props}
      render={renderProps => (
        <FormItem className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(renderProps)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { Form, FormField, useFormField }
