import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class InvalidMatchField implements FieldValidation {
  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(value: string, secondValue: string): Error {
    return value === secondValue ? null : new InvalidFieldError()
  }
}
