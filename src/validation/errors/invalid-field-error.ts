export class InvalidFieldError extends Error {
  constructor(errorMessage = 'Valor inválido') {
    super(errorMessage)
    this.name = 'InvalidFieldError'
  }
}
