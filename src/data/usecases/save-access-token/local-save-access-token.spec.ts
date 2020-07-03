import faker from 'faker'
import { SetStorageSpy } from '@/data/test/mock-set-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  setStorageSpy: SetStorageSpy
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    setStorageSpy,
    sut
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call setStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.uuid()
    sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
