import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { cleanup } from '@testing-library/react'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageSaveCurrentAccount } from './localstorage-save-current-account'

type SutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalStorageSaveCurrentAccount
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalStorageSaveCurrentAccount(setStorageMock)
  return {
    setStorageMock,
    sut
  }
}

describe('LocalSaveCurrentAccount', () => {
  beforeEach(() => {
    cleanup()
  })
  it('should call setStorage with correct value', () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  it('should throw error if accessToken or name is falsy', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.save(undefined)
    }).toThrow(new UnexpectedError())
  })
})
