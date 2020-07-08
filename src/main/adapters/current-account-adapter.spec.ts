import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/localstorage-adapter'
import { UnexpectedError } from '@/domain/errors'
import {
  saveCurrentAccountAdapter,
  getCurrentAccountAdapter
} from './current-account-adapter'

jest.mock('@/infra/cache/localstorage-adapter')

describe('CurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    saveCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  it('should thrown UnexpectedError if incorrect values provided', () => {
    expect(() => {
      saveCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  it('should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel()
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)
    const result = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(account).toEqual(result)
  })
})
