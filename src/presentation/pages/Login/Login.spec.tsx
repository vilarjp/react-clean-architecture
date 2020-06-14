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

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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

    const emailInput = sut.getByTestId('email-inputWrapper')
    expect(emailInput.childElementCount).toBe(1)

    const passwordInput = sut.getByTestId('password-inputWrapper')
    expect(passwordInput.childElementCount).toBe(1)
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
})
