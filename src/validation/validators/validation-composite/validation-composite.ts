import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(fieldName: string, input: object): string {
    const error = this.validators
      .filter(validator => validator.field === fieldName)
      .find(validator => validator.validate(input))
    if (error) return error.validate(input).message
    return null
  }
}
