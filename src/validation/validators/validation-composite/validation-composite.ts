import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private readonly validators: FieldValidation[]

  constructor(validators: FieldValidation[]) {
    this.validators = validators
  }

  validate(fieldName: string, fieldValue: string): string {
    const error = this.validators
      .filter(validator => validator.field === fieldName)
      .find(validator => validator.validate(fieldValue))
    if (error) return error.validate(fieldValue).message
    return null
  }
}
