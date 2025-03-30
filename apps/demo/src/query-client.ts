import { QueryClient } from '@tanstack/vue-query'
import conforms from 'lodash/fp/conforms'
import identity from 'lodash/fp/identity'
import inRange from 'lodash/fp/inRange'
import negate from 'lodash/fp/negate'

const shouldRetry = conforms<unknown>({
  isAxiosError: identity,
  response: conforms({
    status: negate(inRange(400, 500)),
  }),
})

const MAX_RETRY_COUNT = 3

// https://tanstack.com/query/v5/docs/framework/vue/guides/important-defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000,
      retry: (failureCount, error) => {
        return failureCount < MAX_RETRY_COUNT - 1 && shouldRetry(error)
      },
    },
  },
})

export default queryClient
