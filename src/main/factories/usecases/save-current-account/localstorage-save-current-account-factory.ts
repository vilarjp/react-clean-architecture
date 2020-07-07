import { SaveCurrentAccount } from '@/domain/usecases'
import { LocalStorageSaveCurrentAccount } from '@/data/usecases/save-current-account/localstorage-save-current-account'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localstorage-adapter-factory'

export const makeLocalStorageSaveCurrentAccount = (): SaveCurrentAccount => {
  return new LocalStorageSaveCurrentAccount(makeLocalStorageAdapter())
}
