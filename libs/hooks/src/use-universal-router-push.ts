import qs, { type ParsedQuery } from 'query-string'

export function useUniversalRouterPush() {
  return {
    push: ({ path, query }: { path: string; query?: ParsedQuery }) => {
      console.log('push', path, query)
      const queryString = qs.stringify(query)
      window.history.pushState({}, path, queryString)
    },
    replace: ({ path, query }: { path: string; query?: ParsedQuery }) => {
      const queryString = qs.stringify(query)
      window.history.replaceState({}, path, queryString)
    },
  }
}
