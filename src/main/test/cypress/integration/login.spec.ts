import faker from 'faker'
import * as FormHelper from '../utils/form-helper'
import * as Helper from '../utils/helpers'

const path = /login/

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/login')
  })

  it('should load page with correct initial state', () => {
    FormHelper.testFieldState('email', '', 'Campo obrigatório')
    FormHelper.testFieldState('password', '', 'Campo obrigatório')

    FormHelper.testButtonIsDisabled('button-wrap', true, 'Entrar')
  })

  it('should present error state if form is invalid', () => {
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

    FormHelper.testButtonIsDisabled('button-wrap', true, 'Entrar')
  })

  it('should present valid state if form is valid', () => {
    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    FormHelper.testButtonIsDisabled('button-wrap', false, 'Entrar')
  })

  it('should display error modal if authentication fails', () => {
    cy.route({
      method: 'POST',
      url: path,
      status: 401,
      delay: 500,
      response: {
        error: faker.random.words()
      }
    })

    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    FormHelper.testButtonIsLoading('button-wrap', true)
    cy.getByTestId('modal-text').should('contain.text', 'Credenciais inválidas')
    FormHelper.testButtonIsLoading('button-wrap', false)
  })

  it('should save account and redirects user if authentication succeeds', () => {
    cy.route({
      method: 'POST',
      url: path,
      status: 200,
      delay: 500,
      response: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    })

    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    FormHelper.testButtonIsLoading('button-wrap', true)
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should show modal error if unknow error occours', () => {
    cy.route({
      method: 'POST',
      url: path,
      status: 500,
      delay: 500,
      response: {}
    })

    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    FormHelper.testButtonIsLoading('button-wrap', true)
    cy.getByTestId('modal-text').should(
      'contain.text',
      'Algo de errado aconteceu, por favor tente novamente.'
    )
    FormHelper.testButtonIsLoading('button-wrap', false)
  })

  it('should submit form if press enter', () => {
    cy.route({
      method: 'POST',
      url: path,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    }).as('loginRequest')

    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    cy.getByTestId('password-input').type('{enter}')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: path,
      status: 200,
      response: {}
    }).as('loginRequest')

    FormHelper.testFieldState('email', faker.internet.email())
    FormHelper.testFieldState('password', faker.random.alphaNumeric(5))

    cy.getByTestId('button-wrap').dblclick()
    cy.wait('@loginRequest')
    cy.get('@loginRequest.all').should('have.length', 1)
  })
})
