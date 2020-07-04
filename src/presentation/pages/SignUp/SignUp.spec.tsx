import React from 'react'
import faker from 'faker'
import { RenderResult, render } from '@testing-library/react'
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

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.testChildCount(sut, 'button-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, 'Criar')
    FormHelper.testFieldState(sut, 'name', validationError)
    FormHelper.testFieldState(sut, 'email', validationError)
    FormHelper.testFieldState(sut, 'password', validationError)
    FormHelper.testFieldState(sut, 'passwordConfirmation', validationError)
  })

  it('should display name error message if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'name')
    FormHelper.testFieldState(sut, 'name', validationError)
  })

  it('should display e-mail error message if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'email')
    FormHelper.testFieldState(sut, 'email', validationError)
  })

  it('should display password error message if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'password')
    FormHelper.testFieldState(sut, 'password', validationError)
  })

  it('should display passwordConfirmation error message if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testFieldState(sut, 'passwordConfirmation', validationError)
  })

  it('should display valid name state if validation succeeds', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'name')
    FormHelper.testFieldState(sut, 'name')
  })

  it('should display valid e-mail state if validation succeeds', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'email')
    FormHelper.testFieldState(sut, 'email')
  })

  it('should display valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'password')
    FormHelper.testFieldState(sut, 'password')
  })

  it('should display valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testFieldState(sut, 'passwordConfirmation')
  })
})
