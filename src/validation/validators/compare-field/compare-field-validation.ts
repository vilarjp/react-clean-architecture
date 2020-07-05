import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string, secondValue: string): Error {
    return value === secondValue ? null : new InvalidFieldError()
  }
}
