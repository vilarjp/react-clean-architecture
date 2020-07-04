import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (fieldToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column(), fieldToCompare)

describe('CompareFieldValidation', () => {
  it('should return error if match is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const value = faker.random.word()
    const sut = makeSut(value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
