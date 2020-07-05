import faker from 'faker'
import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength)

describe('MinLengthValidation', () => {
  it('should return error if field length is less than min length', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const sut = makeSut(field, minLength)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength - 1)
    })
    expect(error).toEqual(new MinLengthFieldError(minLength))
  })

  it('should return falsy if field length is equal to min length', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const sut = makeSut(field, minLength)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength)
    })
    expect(error).toBeFalsy()
  })

  it('should return falsy if field length is greater than min length', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const sut = makeSut(field, minLength)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength + 1)
    })
    expect(error).toBeFalsy()
  })
})
