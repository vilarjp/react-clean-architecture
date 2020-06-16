import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  it('should return error if e-mail is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
