import * as Helper from '../support/helpers'

describe('PrivateRoutes', () => {
  it('should logout if SurveyList has no token', () => {
    cy.visit('/')
    Helper.testUrl('/login')
  })
})
