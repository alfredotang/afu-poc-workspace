import type { LayoutType } from './NestedLayout.vue'
import camelCase from 'lodash/fp/camelCase'

const LAYOUT_LIST: LayoutType[] = [
  'default',
  'auth',
  'cart',
  'userConsole',
  'empty',
]

export const covertRoutePathToLayoutType = (path: string): LayoutType[] => {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) {
    return []
  }
  const layouts = segments.map(camelCase)
  return layouts
    .map(item => {
      if (LAYOUT_LIST.includes(item as LayoutType)) {
        return item
      }
      return ''
    })
    .filter(Boolean) as LayoutType[]
}
