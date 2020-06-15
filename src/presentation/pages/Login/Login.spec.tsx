import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import Login from './Login'

type SutParams = {
  validationError: string
}

type SutTypes = {
  validationSpy: ValidationSpy
  sut: RenderResult
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(<Login validation={validationSpy} />)

  return {
    validationSpy,
    sut
  }
}

describe('Login Page', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut } = makeSut()

    const buttonWrap = sut.getByTestId('button-wrap')
    expect(buttonWrap.childElementCount).toBe(0)
    expect(buttonWrap.textContent).toBe('Entrar')

    const emailInputWrapper = sut.getByTestId('email-inputWrapper')
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement
    expect(emailInputWrapper.childElementCount).toBe(1)
    expect(sut.queryByTestId('email-error')).toBeNull()
    expect(emailInput.value).toBe('')

    const passwordInputWrapper = sut.getByTestId('password-inputWrapper')
    const passwordInput = sut.getByTestId('email-input') as HTMLInputElement
    expect(passwordInputWrapper.childElementCount).toBe(1)
    expect(sut.queryByTestId('password-error')).toBeNull()
    expect(passwordInput.value).toBe('')
  })

  it('should call validation with correct e-mail', () => {
    const { validationSpy, sut } = makeSut()

    const emailInput = sut.getByTestId('email-input')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  it('should call validation with correct password', () => {
    const { validationSpy, sut } = makeSut()

    const passwordInput = sut.getByTestId('password-input')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  it('should display e-mail error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailError = sut.getAllByTestId('email-error')
    expect(emailError).toBeTruthy()
    expect(emailError[0].textContent).toBe(validationError)

    const emailInputWrapper = sut.getByTestId('email-inputWrapper')
    expect(emailInputWrapper.childElementCount).toBe(2)
  })

  it('should display password error message if validation  fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordError = sut.getAllByTestId('password-error')
    expect(passwordError).toBeTruthy()
    expect(passwordError[0].textContent).toBe(validationError)

    const passwordInputWrapper = sut.getByTestId('password-inputWrapper')
    expect(passwordInputWrapper.childElementCount).toBe(2)
  })

  it('should display valid e-mail state if validation succeeds', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: email } })

    const emailInputWrapper = sut.getByTestId('email-inputWrapper')
    expect(emailInputWrapper.childElementCount).toBe(1)
    expect(sut.queryByTestId('email-error')).toBeNull()
    expect(emailInput.value).toBe(email)
  })

  it('should display valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement
    fireEvent.input(passwordInput, {
      target: { value: password }
    })

    const passwordInputWrapper = sut.getByTestId('password-inputWrapper')
    expect(passwordInputWrapper.childElementCount).toBe(1)
    expect(sut.queryByTestId('password-error')).toBeNull()
    expect(passwordInput.value).toBe(password)
  })

  it('should enable submit button if form validation is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const buttonWrap = sut.getByTestId('button-wrap') as HTMLButtonElement
    expect(buttonWrap.disabled).toBe(false)
  })
})
