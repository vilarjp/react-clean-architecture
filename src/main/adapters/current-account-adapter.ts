import { AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localstorage-adapter-factory'

export const saveCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken || !account?.name) throw new UnexpectedError()
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
