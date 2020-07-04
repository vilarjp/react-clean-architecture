import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor
} from '@testing-library/react'
import faker from 'faker'
import {
  ValidationStub,
  AuthenticationSpy,
  SaveAccessTokenMock,
  FormHelper
} from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

import Login from './Login'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    validationStub,
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)

  const buttonWrap = sut.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
  await waitFor(() => sut.getByTestId('form-login'))
}

describe('Login Page', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.testChildCount(sut, 'button-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, 'Entrar')
    FormHelper.testFieldState(sut, 'email', validationError)
    FormHelper.testFieldState(sut, 'password', validationError)
  })

  it('should call validation with correct e-mail', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    FormHelper.populateField(sut, 'email', email)

    FormHelper.testFieldState(sut, 'email')
  })

  it('should call validation with correct password', () => {
    const { sut } = makeSut()

    const password = faker.internet.password()
    FormHelper.populateField(sut, 'password', password)

    FormHelper.testFieldState(sut, 'password')
  })

  it('should display e-mail error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'email', faker.internet.email())
    FormHelper.testFieldState(sut, 'email', validationError)
  })

  it('should display password error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    FormHelper.populateField(sut, 'password', faker.internet.password())
    FormHelper.testFieldState(sut, 'password', validationError)
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

  it('should enable submit button if form validation is valid', () => {
    const { sut } = makeSut()

    FormHelper.populateField(sut, 'email', faker.internet.email())
    FormHelper.populateField(sut, 'password', faker.internet.password())

    FormHelper.testButtonIsDisabled(sut, 'button-wrap', false, 'Entrar')
  })

  it('should display spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    FormHelper.testChildCount(sut, 'button-wrap', 1)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, '')
    FormHelper.testElementExists(sut, 'spinner-loading')
  })

  it('should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication with invalid fields', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should display error modal if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)

    FormHelper.expectElementTextContent(sut, 'modal-text', error.message)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', false, 'Entrar')
  })

  it('should call SaveAccessToken on authentication success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', async () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup-link')
    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })

  it('should not allow to submit form if state is loading', () => {
    const { sut, authenticationSpy } = makeSut()

    FormHelper.populateField(sut, 'email', faker.internet.email())
    FormHelper.populateField(sut, 'password', faker.internet.password())

    const form = sut.getByTestId('form-login')
    fireEvent.submit(form)
    fireEvent.submit(form)
    fireEvent.submit(form)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})
