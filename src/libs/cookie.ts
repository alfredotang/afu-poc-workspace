import cookie from 'js-cookie'

class Cookies {
  private readonly _prefix = 'a-p-v-'

  private _getPrefixedKey(key: string) {
    return `${this._prefix}${key}`
  }

  public get(key: string) {
    return cookie.get(this._getPrefixedKey(key))
  }

  public set(key: string, value: string, options: typeof cookie.attributes) {
    return cookie.set(this._getPrefixedKey(key), value, {
      ...options,
      path: '/',
    })
  }

  public remove(key: string) {
    return cookie.remove(this._getPrefixedKey(key), {
      path: '/',
    })
  }

  public clear() {
    const keys = cookie.get()
    if (!keys) return
    const ownKeys = Object.keys(keys).filter(key =>
      key.startsWith(this._prefix)
    )

    if (!ownKeys.length) return

    ownKeys.forEach(key => {
      cookie.remove(key, {
        path: '/',
      })
    })
  }
}
const cookies = new Cookies()
export default cookies
