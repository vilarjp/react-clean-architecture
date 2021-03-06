import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  it('should return error if match is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = 'any_other_field'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'any_other_field'
    const sut = makeSut(field, fieldToCompare)
    const value = faker.random.word()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
