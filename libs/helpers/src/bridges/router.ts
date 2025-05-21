import qs, { type ParsedQuery } from 'query-string'

export const universalRouter = {
  pushVue(path: string, query?: ParsedQuery) {
    const route = qs.stringifyUrl({ url: path, query })
    if (window.vueRouter) {
      window.vueRouter.push({ path: route, query })
    } else {
      window.location.href = route
    }
  },
}
