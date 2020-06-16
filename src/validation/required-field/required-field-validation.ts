import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
