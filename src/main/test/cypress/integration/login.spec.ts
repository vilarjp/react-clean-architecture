import faker from 'faker'

const { baseUrl } = Cypress.config()

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('should load page with correct initial state', () => {
    cy.getByTestId('email-error').should('contain.text', 'Campo obrigatório')
    cy.getByTestId('password-error').should('contain.text', 'Campo obrigatório')

    cy.getByTestId('button-wrap').should('have.attr', 'disabled')
    cy.getByTestId('button-wrap').should('contain.text', 'Entrar')
    cy.getByTestId('button-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email-input').type(faker.random.word())
    cy.getByTestId('email-error').should(
      'contain.text',
      'Insira um e-mail válido'
    )

    cy.getByTestId('password-input').type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-error').should(
      'contain.text',
      'O campo deve conter pelo menos 5 dígitos'
    )

    cy.getByTestId('button-wrap').should('have.attr', 'disabled')
    cy.getByTestId('button-wrap').should('contain.text', 'Entrar')
    cy.getByTestId('button-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email-input').type(faker.internet.email())
    cy.getByTestId('email-error').should('not.exist')

    cy.getByTestId('password-input').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-error').should('not.exist')

    cy.getByTestId('button-wrap').should('not.have.attr', 'disabled')
    cy.getByTestId('button-wrap').should('contain.text', 'Entrar')
    cy.getByTestId('button-wrap').should('not.have.descendants')
  })

  it('should display error modal if authentication fails', () => {
    cy.getByTestId('email-input').type(faker.internet.email())
    cy.getByTestId('email-error').should('not.exist')

    cy.getByTestId('password-input').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-error').should('not.exist')

    cy.getByTestId('button-wrap').click()
    cy.getByTestId('button-wrap').getByTestId('spinner-loading').should('exist')
    cy.getByTestId('modal-text').should('contain.text', 'Credenciais inválidas')
    cy.getByTestId('button-wrap')
      .getByTestId('spinner-loading')
      .should('not.exist')
  })

  it('should save accessToken and redirects user if authentication succeeds', () => {
    cy.getByTestId('email-input').type('mango@gmail.com')

    cy.getByTestId('password-input').type('12345')

    cy.getByTestId('button-wrap').click()
    cy.getByTestId('button-wrap').getByTestId('spinner-loading').should('exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })
})
