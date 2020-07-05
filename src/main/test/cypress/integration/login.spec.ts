describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })
  it('should load page with correct initial state', () => {
    cy.getByTestId('email-error').should('have.text', 'Campo obrigatório')
  })
})
