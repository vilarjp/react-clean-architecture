import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { MinLengthFieldError } from '@/validation/errors'

export class MinLengthValidation implements RequiredFieldValidation {
  readonly field: string

  private readonly length: number

  constructor(field: string, length: number) {
    this.field = field
    this.length = length
  }

  validate(value: string): Error {
    return value.length >= this.length
      ? null
      : new MinLengthFieldError(this.length)
  }
}
