import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(value: string): Error {
    return new InvalidFieldError()
  }
}
