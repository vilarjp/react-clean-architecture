import { SaveAccessToken } from '@/domain/usecases'
import { LocalStorageSaveAccessToken } from '@/data/usecases/save-access-token/localstorage-save-access-token'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localstorage-adapter-factory'

export const makeLocalStorageSaveAccessToken = (): SaveAccessToken => {
  return new LocalStorageSaveAccessToken(makeLocalStorageAdapter())
}
