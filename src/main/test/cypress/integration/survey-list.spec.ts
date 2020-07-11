import faker from 'faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
    cy.server()
  })

  it('should present error if UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu, por favor tente novamente.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('/')
    const { name } = Helper.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on click logout-button', () => {
    mockUnexpectedError()
    cy.visit('/')
    cy.getByTestId('logout-button').click()
    Helper.testUrl('/login')
    Helper.testLocalStorageItemIsNull('account')
  })

  it('should present survey cards', () => {
    mockSuccess()
    cy.visit('/')
    cy.get('li:empty').should('have.length', 3)
    cy.get('li:not(empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      assert.equal(
        li.find('[data-testid="icon-wrap"]').css('background-color'),
        'rgb(4, 211, 97)'
      )
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '09')
      assert.equal(li.find('[data-testid="month"]').text(), 'jul')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      assert.equal(
        li.find('[data-testid="icon-wrap"]').css('background-color'),
        'rgb(214, 40, 40)'
      )
    })
  })
})
