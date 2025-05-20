export const universalStore = {
  get: (key: string) => {
    return localStorage.getItem(key)
  },
}
