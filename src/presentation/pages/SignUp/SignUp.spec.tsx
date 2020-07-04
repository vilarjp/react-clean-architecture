import React from 'react'
import faker from 'faker'
import { RenderResult, render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { FormHelper, ValidationStub } from '@/presentation/test'

import SignUp from './SignUp'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <SignUp validation={validationStub} />
    </Router>
  )

  return {
    sut
  }
}

const populateField = (
  sut: RenderResult,
  fieldName: string,
  fieldValue = faker.random.word()
): void => {
  const field = sut.getByTestId(`${fieldName}-input`)
  fireEvent.input(field, {
    target: { value: fieldValue }
  })
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.testChildCount(sut, 'button-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, 'Criar')
    FormHelper.testFieldState(sut, 'name', validationError)
    FormHelper.testFieldState(sut, 'email', 'Campo obrigatório')
    FormHelper.testFieldState(sut, 'password', 'Campo obrigatório')
    FormHelper.testFieldState(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  it('should display name error message if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateField(sut, 'name')
    FormHelper.testFieldState(sut, 'name', validationError)
  })
})
