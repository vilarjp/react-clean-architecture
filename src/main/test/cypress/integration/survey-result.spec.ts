import faker from 'faker'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
const mockLoadSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result')

describe('SurveyResult', () => {
  describe('Load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void =>
      Http.mockForbiddenError(path, 'GET')

    beforeEach(() => {
      Helper.setLocalStorageItem('account', {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      })
    })

    it('should present error if UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')

      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu, por favor tente novamente.'
      )
    })

    it('should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })

    it('should present survey cards', () => {
      mockLoadSuccess()
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
      mockLoadSuccess()
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('button-wrap').click()
      Helper.testUrl('/')
    })
  })

  describe('Save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT')
    const mockAccessDeniedError = (): void =>
      Http.mockForbiddenError(path, 'PUT')
    const mockSaveSuccess = (): void =>
      Http.mockOk(path, 'PUT', 'fx:survey-result-answer')

    beforeEach(() => {
      Helper.setLocalStorageItem('account', {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('should present error if UnexpectedError', () => {
      mockUnexpectedError()

      cy.get('li:nth-child(2)').click()

      cy.getByTestId('error').should(
        'contain.text',
        'Algo de errado aconteceu, por favor tente novamente.'
      )
    })

    it('should logout on AccessDeniedError', () => {
      mockAccessDeniedError()

      cy.get('li:nth-child(2)').click()
      Helper.testUrl('/login')
    })

    it('should present survey cards', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()

      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')

      cy.getByTestId('answer-wrap')
        .last()
        .should('have.css', 'box-shadow', 'rgb(247, 127, 0) 0px 0px 3px 2px')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_1')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
        assert.equal(li.find('[data-testid="percent"]').text(), '70%')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.notExists(li.find('[data-testid="image"]'))
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
      })
    })
  })
})
