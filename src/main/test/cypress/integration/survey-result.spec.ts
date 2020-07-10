import faker from 'faker'
import * as Helper from '../utils/helpers'

const path = /surveys/

describe('SurveyResult', () => {
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
      url: path,
      status: 500,
      response: {}
    })
    cy.visit('/surveys/any_id')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu, por favor tente novamente.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    cy.route({
      method: 'GET',
      url: path,
      status: 403,
      response: {}
    })
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    cy.route({
      method: 'GET',
      url: path,
      status: 500,
      response: {}
    })
    cy.visit('/surveys/any_id')
    const { name } = Helper.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on click logout-button', () => {
    cy.route({
      method: 'GET',
      url: path,
      status: 500,
      response: {}
    })
    cy.visit('/surveys/any_id')
    cy.getByTestId('logout-button').click()
    Helper.testUrl('/login')
    Helper.testLocalStorageItemIsNull('account')
  })

  it('should present survey cards', () => {
    cy.route({
      method: 'GET',
      url: path,
      status: 200,
      response: 'fixture:survey-result.json'
    })
    cy.visit('/surveys/any_id')
    cy.getByTestId('question').should('have.text', 'Question 1')
    cy.getByTestId('day').should('have.text', '03')
    cy.getByTestId('month').should('have.text', 'fev')
    cy.getByTestId('year').should('have.text', '2018')

    cy.getByTestId('answer-wrap')
      .first()
      .should('have.css', 'box-shadow', 'rgb(247, 127, 0) 0px 0px 3px 2px')
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_1')
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      assert.equal(li.find('[data-testid="percent"]').text(), '50%')
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
      assert.notExists(li.find('[data-testid="image"]'))
      assert.equal(li.find('[data-testid="percent"]').text(), '100%')
    })
  })

  it('should return to previous url on click back button', () => {
    cy.visit('')
    cy.route({
      method: 'GET',
      url: path,
      status: 200,
      response: 'fixture:survey-result.json'
    })
    cy.visit('/surveys/any_id')
    cy.getByTestId('button-wrap').click()
    Helper.testUrl('/')
  })
})
