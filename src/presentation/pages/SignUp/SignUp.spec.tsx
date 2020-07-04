import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import SignUp from './SignUp'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SignUp />
    </Router>
  )

  return {
    sut
  }
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  disabled: boolean
): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(disabled)
}

const testFieldInitalState = (
  sut: RenderResult,
  fieldName: string,
  validationError: string
): void => {
  const field = sut.getByTestId(`${fieldName}-input`) as HTMLInputElement
  expect(field.value).toBe('')

  const wrapper = sut.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(2)

  const error = sut.queryByTestId(`${fieldName}-error`)
  expect(error).toBeTruthy()
  expect(error.textContent).toBe(validationError)
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    testChildCount(sut, 'button-wrap', 0)
    testButtonIsDisabled(sut, 'button-wrap', true)
    testFieldInitalState(sut, 'name', validationError)
    testFieldInitalState(sut, 'email', validationError)
    testFieldInitalState(sut, 'password', validationError)
    testFieldInitalState(sut, 'passwordConfirmation', validationError)
  })
})
