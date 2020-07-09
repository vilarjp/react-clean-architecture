import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './localstorage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localstorage setItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{}>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  it('should call localstorage removeItem if value is null or undefined', () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  it('should call localstorage getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{}>()
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
