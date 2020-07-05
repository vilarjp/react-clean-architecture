const { baseUrl } = Cypress.config()

export const testFieldState = (
  fieldName: string,
  fieldValue = '',
  errorMessage = ''
): void => {
  if (fieldValue) cy.getByTestId(`${fieldName}-input`).type(fieldValue)
  if (errorMessage)
    cy.getByTestId(`${fieldName}-error`).should('contain.text', errorMessage)
  else cy.getByTestId(`${fieldName}-error`).should('not.exist')
}

export const testButtonIsDisabled = (
  button: string,
  isDisabled: boolean,
  buttonText: string
): void => {
  cy.getByTestId(button).should(
    isDisabled ? 'have.attr' : 'not.have.attr',
    'disabled'
  )
  cy.getByTestId(button).should('contain.text', buttonText)
}

export const testButtonIsLoading = (
  button: string,
  isLoading: boolean
): void => {
  if (isLoading) cy.getByTestId(button).click()
  cy.getByTestId(button)
    .getByTestId('spinner-loading')
    .should(isLoading ? 'exist' : 'not.exist')
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}
