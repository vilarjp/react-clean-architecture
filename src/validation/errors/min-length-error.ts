export class MinLengthFieldError extends Error {
  constructor(length: number) {
    super(`O campo deve conter pelo menos ${length} dígitos`)
    this.name = 'MinLengthFieldError'
  }
}
