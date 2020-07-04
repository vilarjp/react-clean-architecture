export class EmailInUseError extends Error {
  constructor() {
    super('E-mail já está em uso')
    this.name = 'EmailInUseError'
  }
}
