import * as Helper from '../utils/helpers'

describe('PrivateRoutes', () => {
  it('should logout if SurveyList has no token', () => {
    cy.visit('/')
    Helper.testUrl('/login')
  })

  it('should logout if SurveyResult has no token', () => {
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
