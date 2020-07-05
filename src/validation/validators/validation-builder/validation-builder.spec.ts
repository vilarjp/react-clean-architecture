import faker from 'faker'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldValidation
} from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('should return MinLengthValidation', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const validations = sut.field(field).min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(field, minLength)])
  })

  it('should return CompareFieldValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).compare(fieldToCompare).build()
    expect(validations).toEqual([
      new CompareFieldValidation(field, fieldToCompare)
    ])
  })

  it('should return a list of validations', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const minLength = faker.random.number()
    const validations = sut
      .field(field)
      .required()
      .email()
      .min(minLength)
      .compare(fieldToCompare)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, minLength),
      new CompareFieldValidation(field, fieldToCompare)
    ])
  })
})
