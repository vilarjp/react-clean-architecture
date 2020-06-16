import faker from 'faker'
import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from './length-validation'

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  it('should return error if field length is less than min length', () => {
    const minLength = faker.random.number()
    const sut = makeSut(minLength)
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1))
    expect(error).toEqual(new MinLengthFieldError(minLength))
  })

  it('should return falsy if field length is equal to min length', () => {
    const minLength = faker.random.number()
    const sut = makeSut(minLength)
    const error = sut.validate(faker.random.alphaNumeric(minLength))
    expect(error).toBeFalsy()
  })

  it('should return falsy if field length is greater than min length', () => {
    const minLength = faker.random.number()
    const sut = makeSut(minLength)
    const error = sut.validate(faker.random.alphaNumeric(minLength + 1))
    expect(error).toBeFalsy()
  })
})
