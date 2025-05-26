import { useId } from 'react'

import { Button } from '@alison-ui/button'

import type { Meta } from '@storybook/react'

import { Toaster, toast } from '.'

export default {
  component: Toaster,
  title: 'ui/toast',
} satisfies Meta

export const Default = () => {
  const toastId = useId()
  return (
    <>
      <Toaster containerId={toastId} />
      <Button
        onClick={() =>
          toast('This is a default toast', { containerId: toastId })
        }
      >
        Show Default Toast
      </Button>
    </>
  )
}

export const Overview = () => {
  const toastId = useId()
  return (
    <>
      <Toaster containerId={toastId} />
      <div className="flex gap-4">
        <Button
          onClick={() =>
            toast('This is a default toast', { containerId: toastId })
          }
        >
          Default
        </Button>
        <Button
          onClick={() =>
            toast.success('Operation successful!', { containerId: toastId })
          }
          variant="outline"
        >
          Success
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error('Something went wrong')}
        >
          Error
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.warning('Please be careful', { containerId: toastId })
          }
        >
          Warning
        </Button>
        <Button
          onClick={() =>
            toast.info('Here is some information', { containerId: toastId })
          }
        >
          Info
        </Button>
        <Button
          onClick={() =>
            toast.promise(
              new Promise(resolve => setTimeout(resolve, 3000)),
              {
                error: 'Error!',
                success: 'Loaded!',
                pending: 'Loading...',
              },
              {
                containerId: toastId,
              }
            )
          }
        >
          Promise
        </Button>
      </div>
    </>
  )
}

export const WithAction = () => {
  const toastId = useId()
  return (
    <>
      <Toaster containerId={toastId} />
      <Button
        onClick={() =>
          toast(
            <div className="flex w-full flex-col gap-2">
              <p className="font-medium">Successfully added to cart</p>
              <div className="flex w-full justify-end gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    toast.info('Hello', { containerId: toastId })
                  }}
                >
                  Go to cart
                </Button>
              </div>
            </div>,
            {
              closeOnClick: true,
              hideProgressBar: true,
              containerId: toastId,
            }
          )
        }
      >
        Show Toast with Action
      </Button>
    </>
  )
}
