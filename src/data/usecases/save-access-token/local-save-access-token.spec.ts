import faker from 'faker'
import { SetStorageMock } from '@/data/test/mock-set-storage'
import { LocalStorageSaveAccessToken } from './localstorage-save-access-token'

type SutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalStorageSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalStorageSaveAccessToken(setStorageMock)
  return {
    setStorageMock,
    sut
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()
    sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
