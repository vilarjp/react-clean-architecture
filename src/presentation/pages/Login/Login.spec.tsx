import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import faker from 'faker'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'
import Login from './Login'

type SutParams = {
  validationError: string
}

type SutTypes = {
  validationSpy: ValidationSpy
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )

  return {
    validationSpy,
    sut,
    authenticationSpy
  }
}

const expectInitalStateField = (sut: RenderResult, fieldName): void => {
  const field = sut.getByTestId(`${fieldName}-input`) as HTMLInputElement
  expect(field.value).toBe('')

  const wrapper = sut.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(1)
  expect(sut.queryByTestId(`${fieldName}-error`)).toBeNull()
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email-input')
  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password-input')
  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const populateValidFields = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateValidFields(sut, email, password)

  const buttonWrap = sut.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
}

const expectFieldValidationError = (
  sut: RenderResult,
  fieldName: string,
  fieldError: string
): void => {
  const field = sut.getByTestId(`${fieldName}-error`)
  expect(field).toBeTruthy()
  expect(field.textContent).toBe(fieldError)

  const wrapper = sut.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(2)
}

const expectFieldValidationSuccess = (
  sut: RenderResult,
  fieldName: string,
  fieldValue: string
): void => {
  const field = sut.getByTestId(`${fieldName}-input`) as HTMLInputElement
  fireEvent.input(field, { target: { value: fieldValue } })

  const wrapper = sut.getByTestId(`${fieldName}-inputWrapper`)
  expect(wrapper.childElementCount).toBe(1)
  expect(sut.queryByTestId(`${fieldName}-error`)).toBeNull()
  expect(field.value).toBe(fieldValue)
}

describe('Login Page', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut } = makeSut()

    const buttonWrap = sut.getByTestId('button-wrap')
    expect(buttonWrap.childElementCount).toBe(0)
    expect(buttonWrap.textContent).toBe('Entrar')

    expectInitalStateField(sut, 'email')
    expectInitalStateField(sut, 'password')
  })

  it('should call validation with correct e-mail', () => {
    const { validationSpy, sut } = makeSut()

    const email = faker.internet.email()
    populateEmailField(sut, email)

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  it('should call validation with correct password', () => {
    const { validationSpy, sut } = makeSut()

    const password = faker.internet.password()
    populatePasswordField(sut, password)

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  it('should display e-mail error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    expectFieldValidationError(sut, 'email', validationError)
  })

  it('should display password error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    expectFieldValidationError(sut, 'password', validationError)
  })

  it('should display valid e-mail state if validation succeeds', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    expectFieldValidationSuccess(sut, 'email', email)
  })

  it('should display valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    const password = faker.internet.password()
    expectFieldValidationSuccess(sut, 'password', password)
  })

  it('should enable submit button if form validation is valid', () => {
    const { sut } = makeSut()

    populateValidFields(sut)

    const buttonWrap = sut.getByTestId('button-wrap') as HTMLButtonElement
    expect(buttonWrap.disabled).toBe(false)
  })

  it('should display spinner on submit', () => {
    const { sut } = makeSut()

    populateValidFields(sut)

    const buttonWrap = sut.getByTestId('button-wrap') as HTMLButtonElement
    fireEvent.click(buttonWrap)

    const spinnerLoading = sut.getByTestId('spinner-loading')
    expect(spinnerLoading).toBeTruthy()
    expect(buttonWrap.childElementCount).toBe(1)
    expect(buttonWrap.disabled).toBe(true)
  })

  it('should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })
})
