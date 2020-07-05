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
})
