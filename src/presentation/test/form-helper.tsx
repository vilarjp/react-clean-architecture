import { screen, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  disabled: boolean,
  label: string
): void => {
  const element = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(disabled)
  expect(element.textContent).toBe(label)
}

export const testFieldState = (
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = screen.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(validationError ? 2 : 1)

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

export const testElementExists = (elementName: string): void => {
  const element = screen.getByTestId(elementName)
  expect(element).toBeTruthy()
}

export const testElementTextContent = (
  elementName: string,
  elementTextt: string
): void => {
  const element = screen.getByTestId(elementName)
  expect(element.textContent).toBe(elementTextt)
}
