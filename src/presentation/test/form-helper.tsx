import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  disabled: boolean,
  label: string
): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(disabled)
  expect(element.textContent).toBe(label)
}

export const testFieldState = (
  sut: RenderResult,
  fieldName: string,
  validationError = ''
): void => {
  const wrapper = sut.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(validationError ? 2 : 1)

  const error = sut.queryByTestId(`${fieldName}-error`)
  expect(error).toBe(validationError ? error : null)
  expect(error?.textContent).toBe(validationError || undefined)
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  fieldValue = faker.random.word()
): void => {
  const field = sut.getByTestId(`${fieldName}-input`)
  fireEvent.input(field, {
    target: { value: fieldValue }
  })
}

export const testElementExists = (
  sut: RenderResult,
  elementName: string
): void => {
  const element = sut.getByTestId(elementName)
  expect(element).toBeTruthy()
}

export const testElementTextContent = (
  sut: RenderResult,
  elementName: string,
  elementTextt: string
): void => {
  const element = sut.getByTestId(elementName)
  expect(element.textContent).toBe(elementTextt)
}
