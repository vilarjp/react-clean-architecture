const { baseUrl } = Cypress.config()

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
