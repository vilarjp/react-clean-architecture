import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string

  fieldName: string

  fieldValue: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
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
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  it('should call validation with correct password', () => {
    const { validationSpy, sut } = makeSut()

    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
