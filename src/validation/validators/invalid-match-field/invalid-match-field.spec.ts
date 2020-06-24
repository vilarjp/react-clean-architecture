import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { InvalidMatchField } from './invalid-match-field'

const makeSut = (): InvalidMatchField =>
  new InvalidMatchField(faker.database.column())

describe('InvalidMatchField', () => {
  it('should return error if match is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word(), faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if match is valid', () => {
    const value = faker.random.word()
    const sut = makeSut()
    const error = sut.validate(value, value)
    expect(error).toBeFalsy()
  })
})
