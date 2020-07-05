import faker from 'faker'

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
})
