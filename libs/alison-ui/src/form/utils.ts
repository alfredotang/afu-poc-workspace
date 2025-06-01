import type { FieldError } from 'react-hook-form'

export const getFormFieldError = (error: FieldError) => {
  try {
    if (!error) return null
    if (error.message) return error.message
    if (!error.message) {
      const messages: string[] = []
      Object.keys(error).forEach(key => {
        if (error[key]) {
          const message = getFormFieldError(error[key])
          if (message) messages.push(message)
        }
      })

      return messages.filter(Boolean).join(', ')
    }
    return null
  } catch (error) {
    return null
  }
}
