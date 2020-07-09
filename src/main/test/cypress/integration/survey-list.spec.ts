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
})
