import React from 'react'
import faker from 'faker'
import {
  RenderResult,
  render,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { FormHelper, ValidationStub, AddAccountSpy } from '@/presentation/test'

import SignUp from './SignUp'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  addAcountSpy: AddAccountSpy
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAcountSpy = new AddAccountSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <SignUp validation={validationStub} addAcount={addAcountSpy} />
    </Router>
  )

  return {
    sut,
    addAcountSpy
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'name', name)
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)
  FormHelper.populateField(sut, 'passwordConfirmation', password)

  const buttonWrap = sut.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
  await waitFor(() => sut.getByTestId('form-login'))
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

  it('should enable submit button if form validation is valid', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'name')
    FormHelper.populateField(sut, 'email')
    FormHelper.populateField(sut, 'password')
    FormHelper.populateField(sut, 'passwordConfirmation')

    FormHelper.testButtonIsDisabled(sut, 'button-wrap', false, 'Criar')
  })

  it('should display spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    FormHelper.testChildCount(sut, 'button-wrap', 1)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, '')
    FormHelper.testElementExists(sut, 'spinner-loading')
  })

  it('should call AddAccount with correct values', async () => {
    const { sut, addAcountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)

    expect(addAcountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })
})
