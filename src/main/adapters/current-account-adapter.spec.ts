import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/localstorage-adapter'
import { saveCurrentAccountAdapter } from './current-account-adapter'

jest.mock('@/infra/cache/localstorage-adapter')

describe('CurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    saveCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
