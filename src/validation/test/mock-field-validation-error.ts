import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  input: object

  constructor(readonly field: string) {}

  validate(input: object): Error {
    this.input = input
    return this.error
  }
}
