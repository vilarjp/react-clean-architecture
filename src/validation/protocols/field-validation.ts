export interface FieldValidation {
  field: string
  validate(value: string, secondValue?: string): Error
}
