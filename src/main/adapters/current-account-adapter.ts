import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localstorage-adapter-factory'

export const saveCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
