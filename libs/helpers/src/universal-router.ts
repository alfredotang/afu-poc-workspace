import qs, { type ParsedQuery } from 'query-string'

class UniversalRouter {
  pushVue({ path, query }: { path: string; query?: ParsedQuery }) {
    const route = qs.stringifyUrl({ url: path, query })
    // @ts-expect-error - for testing
    window.vueRouter.push({ path: route, query })
  }
}

export const universalRouter = new UniversalRouter()
