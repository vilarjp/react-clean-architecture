export interface FieldValidation {
  field: string
  validate(value: string | boolean): Error
}
