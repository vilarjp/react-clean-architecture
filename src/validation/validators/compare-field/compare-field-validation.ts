import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error {
    return input[this.field] === input[this.fieldToCompare]
      ? null
      : new InvalidFieldError()
  }
}
