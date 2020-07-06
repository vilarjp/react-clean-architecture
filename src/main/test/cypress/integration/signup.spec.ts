import faker from 'faker'
import * as FormHelper from '../support/form-helper'

const populateValidFields = (): void => {
  FormHelper.testFieldState('name', faker.name.findName())
  FormHelper.testFieldState('email', faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  FormHelper.testFieldState('password', password)
  FormHelper.testFieldState('passwordConfirmation', password)
}

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
    populateValidFields()
    FormHelper.testButtonIsDisabled('button-wrap', false, 'Criar')
  })

  it('should display error modal if addaccount fails', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 403,
      delay: 500,
      response: {
        error: faker.random.words()
      }
    })

    populateValidFields()

    FormHelper.testButtonIsLoading('button-wrap', true)
    cy.getByTestId('modal-text').should('contain.text', 'E-mail já está em uso')
    FormHelper.testButtonIsLoading('button-wrap', false)
    FormHelper.testButtonIsDisabled('button-wrap', false, 'Criar')
  })

  it('should save accessToken and redirects user if addaccount succeeds', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      delay: 500,
      response: { accessToken: faker.random.uuid() }
    })

    populateValidFields()

    FormHelper.testButtonIsLoading('button-wrap', true)
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should show modal error if unknow error occours', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 500,
      delay: 500,
      response: {}
    })

    populateValidFields()

    FormHelper.testButtonIsLoading('button-wrap', true)
    cy.getByTestId('modal-text').should(
      'contain.text',
      'Algo de errado aconteceu, por favor tente novamente.'
    )
    FormHelper.testButtonIsLoading('button-wrap', false)
    FormHelper.testButtonIsDisabled('button-wrap', false, 'Criar')
  })

  it('should submit form if press enter', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: { accessToken: faker.random.uuid() }
    })

    populateValidFields()

    cy.getByTestId('passwordConfirmation-input').type('{enter}')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: {}
    }).as('signupRequest')

    populateValidFields()

    cy.getByTestId('button-wrap').dblclick()
    cy.get('@signupRequest.all').should('have.length', 1)
  })
})