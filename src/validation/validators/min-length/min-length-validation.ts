import { RequiredFieldValidation } from '@/validation/validators'
import { MinLengthFieldError } from '@/validation/errors'

export class MinLengthValidation implements RequiredFieldValidation {
  constructor(readonly field: string, private readonly length: number) {}

  validate(input: object): Error {
    return input[this.field].length >= this.length
      ? null
      : new MinLengthFieldError(this.length)
  }
}
