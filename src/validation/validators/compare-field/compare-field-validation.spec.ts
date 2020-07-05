import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column())

describe('CompareFieldValidation', () => {
  it('should return error if match is invalid', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate(value, faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate(value, value)
    expect(error).toBeFalsy()
  })
})
