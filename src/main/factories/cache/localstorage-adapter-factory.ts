import { LocalStorageAdapter } from '@/infra/cache/localstorage-adapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
