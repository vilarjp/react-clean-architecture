import faker from 'faker'
import * as Helper from '../support/helpers'

describe('Surveyist', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
    cy.server()
  })

  it('should present error if UnexpectedError', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 500,
      response: {}
    })
    cy.visit('/')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu, por favor tente novamente.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 403,
      response: {}
    })
    cy.visit('/')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 500,
      response: {}
    })
    cy.visit('/')
    const { name } = Helper.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on click logout-button', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 500,
      response: {}
    })
    cy.visit('/')
    cy.getByTestId('logout-button').click()
    Helper.testUrl('/login')
    Helper.testLocalStorageItemIsNull('account')
  })
})
