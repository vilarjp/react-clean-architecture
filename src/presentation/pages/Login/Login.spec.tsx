import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './Login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()

    const buttonWrap = sut.getByTestId('button-wrap')
    expect(buttonWrap.childElementCount).toBe(0)
    expect(buttonWrap.textContent).toBe('Entrar')

    const emailInput = sut.getByTestId('email-input')
    expect(emailInput.childElementCount).toBe(1)

    const passwordInput = sut.getByTestId('password-input')
    expect(passwordInput.childElementCount).toBe(1)
  })
})
