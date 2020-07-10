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

  // it('should logout on click logout-button', () => {
  //   cy.route({
  //     method: 'GET',
  //     url: path,
  //     status: 500,
  //     response: {}
  //   })
  //   cy.visit('/')
  //   cy.getByTestId('logout-button').click()
  //   Helper.testUrl('/login')
  //   Helper.testLocalStorageItemIsNull('account')
  // })

  // it('should present survey cards', () => {
  //   cy.route({
  //     method: 'GET',
  //     url: path,
  //     status: 200,
  //     delay: 500,
  //     response: 'fixture:survey-list.json'
  //   })
  //   cy.visit('/')
  //   cy.get('li:empty').should('have.length', 3)
  //   cy.get('li:not(empty)').should('have.length', 2)
  //   cy.get('li:nth-child(1)').then(li => {
  //     assert.equal(li.find('[data-testid="day"]').text(), '03')
  //     assert.equal(li.find('[data-testid="month"]').text(), 'fev')
  //     assert.equal(li.find('[data-testid="year"]').text(), '2018')
  //     assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
  //     assert.equal(
  //       li.find('[data-testid="icon-wrap"]').css('background-color'),
  //       'rgb(4, 211, 97)'
  //     )
  //   })
  //   cy.get('li:nth-child(2)').then(li => {
  //     assert.equal(li.find('[data-testid="day"]').text(), '09')
  //     assert.equal(li.find('[data-testid="month"]').text(), 'jul')
  //     assert.equal(li.find('[data-testid="year"]').text(), '2020')
  //     assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
  //     assert.equal(
  //       li.find('[data-testid="icon-wrap"]').css('background-color'),
  //       'rgb(214, 40, 40)'
  //     )
  //   })
  // })
})
