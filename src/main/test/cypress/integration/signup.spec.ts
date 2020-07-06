import faker from 'faker'
import * as FormHelper from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/signup')
  })

  it('should load page with correct initial state', () => {
    FormHelper.testFieldState('name', '', 'Campo obrigatório')
    FormHelper.testFieldState('email', '', 'Campo obrigatório')
    FormHelper.testFieldState('password', '', 'Campo obrigatório')
    FormHelper.testFieldState('passwordConfirmation', '', 'Campo obrigatório')

    FormHelper.testButtonIsDisabled('button-wrap', true, 'Criar')
  })

  it('should present error state if form is invalid', () => {
    FormHelper.testFieldState('name', '', 'Campo obrigatório')
    FormHelper.testFieldState(
      'email',
      faker.random.word(),
      'Insira um e-mail válido'
    )
    FormHelper.testFieldState(
      'password',
      faker.random.alphaNumeric(4),
      'O campo deve conter pelo menos 5 dígitos'
    )
    FormHelper.testFieldState(
      'passwordConfirmation',
      faker.random.alphaNumeric(4),
      'Valor inválido'
    )

    FormHelper.testButtonIsDisabled('button-wrap', true, 'Criar')
  })

  it('should present valid state if form is valid', () => {
    FormHelper.testFieldState('name', faker.name.findName())
    FormHelper.testFieldState('email', faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    FormHelper.testFieldState('password', password)
    FormHelper.testFieldState('passwordConfirmation', password)

    FormHelper.testButtonIsDisabled('button-wrap', false, 'Criar')
  })
})
