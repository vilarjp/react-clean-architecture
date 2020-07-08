import { screen, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testFieldState = (
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = screen.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.children).toHaveLength(validationError ? 2 : 1)

  const error = screen.queryByTestId(`${fieldName}-error`)
  expect(error).toBe(validationError ? error : null)
  expect(error?.textContent).toBe(validationError || undefined)
}

export const populateField = (
  fieldName: string,
  fieldValue = faker.random.word()
): void => {
  const field = screen.getByTestId(`${fieldName}-input`)
  fireEvent.input(field, {
    target: { value: fieldValue }
  })
}
