import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(value: string): Error {
    return this.error
  }
}
