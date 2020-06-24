import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class InvalidMatchField implements FieldValidation {
  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validateMatchValues(value: string, matchValue: string): Error {
    return value === matchValue ? this.validate(true) : this.validate(false)
  }

  validate(value: boolean): Error {
    return value ? null : new InvalidFieldError()
  }
}
