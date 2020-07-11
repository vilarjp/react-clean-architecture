import faker from 'faker'
import * as FormHelper from '../utils/form-helper'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'fx:account')

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
    mockEmailInUseError()

    populateValidFields()

    FormHelper.testButtonIsLoading('button-wrap', true)
    cy.getByTestId('modal-text').should('contain.text', 'E-mail já está em uso')
    FormHelper.testButtonIsLoading('button-wrap', false)
    FormHelper.testButtonIsDisabled('button-wrap', false, 'Criar')
  })

  it('should save account and redirects user if addaccount succeeds', () => {
    mockSuccess()
    populateValidFields()

    FormHelper.testButtonIsLoading('button-wrap', true)
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should show modal error if unknow error occours', () => {
    mockUnexpectedError()

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
    mockSuccess()

    populateValidFields()

    cy.getByTestId('passwordConfirmation-input').type('{enter}')
    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should prevent multiple submits', () => {
    mockSuccess()

    populateValidFields()

    cy.getByTestId('button-wrap').dblclick()
    cy.wait('@request')
    cy.get('@request.all').should('have.length', 1)
  })
})
