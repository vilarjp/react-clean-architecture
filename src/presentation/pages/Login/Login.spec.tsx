import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import faker from 'faker'
import {
  ValidationStub,
  AuthenticationSpy,
  FormHelper
} from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

import Login from './Login'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  saveCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const saveCurrentAccountMock = jest.fn()
  render(
    <APIContext.Provider value={{ saveCurrentAccount: saveCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </APIContext.Provider>
  )

  return {
    authenticationSpy,
    saveCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)

  const buttonWrap = screen.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
  await waitFor(() => screen.getByTestId('form-login'))
}

describe('Login Page', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('button-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('button-wrap')).toBeDisabled()

    FormHelper.testFieldState('email', validationError)
    FormHelper.testFieldState('password', validationError)
  })

  it('should call validation with correct e-mail', () => {
    makeSut()

    const email = faker.internet.email()
    FormHelper.populateField('email', email)

    FormHelper.testFieldState('email')
  })

  it('should call validation with correct password', () => {
    makeSut()

    const password = faker.internet.password()
    FormHelper.populateField('password', password)

    FormHelper.testFieldState('password')
  })

  it('should display e-mail error message if validation  fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('email', faker.internet.email())
    FormHelper.testFieldState('email', validationError)
  })

  it('should display password error message if validation  fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('password', faker.internet.password())
    FormHelper.testFieldState('password', validationError)
  })

  it('should display valid e-mail state if validation succeeds', () => {
    makeSut()

    FormHelper.populateField('email')
    FormHelper.testFieldState('email')
  })

  it('should display valid password state if validation succeeds', () => {
    makeSut()

    FormHelper.populateField('password')
    FormHelper.testFieldState('password')
  })

  it('should enable submit button if form validation is valid', () => {
    makeSut()

    FormHelper.populateField('email', faker.internet.email())
    FormHelper.populateField('password', faker.internet.password())

    expect(screen.getByTestId('button-wrap')).toBeEnabled()
  })

  it('should display spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('button-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('button-wrap')).toBeDisabled()
    expect(screen.queryByTestId('spinner-loading')).toBeInTheDocument()
  })

  it('should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication with invalid fields', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should display error modal if authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()

    expect(screen.getByTestId('modal-text')).toHaveTextContent(error.message)
    expect(screen.getByTestId('button-wrap')).toBeEnabled()
  })

  it('should call SaveCurrentAccount on authentication success', async () => {
    const { authenticationSpy, saveCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(saveCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', async () => {
    makeSut()

    const register = screen.getByTestId('signup-link')
    fireEvent.click(register)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })

  it('should not allow to submit form if state is loading', () => {
    const { authenticationSpy } = makeSut()

    FormHelper.populateField('email', faker.internet.email())
    FormHelper.populateField('password', faker.internet.password())

    const form = screen.getByTestId('form-login')
    fireEvent.submit(form)
    fireEvent.submit(form)
    fireEvent.submit(form)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})
