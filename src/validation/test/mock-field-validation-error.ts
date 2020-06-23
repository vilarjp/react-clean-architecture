import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  readonly field: string

  constructor(field: string) {
    this.field = field
  }

  validate(): Error {
    return this.error
  }
}
