import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { FormHelper } from '@/presentation/test'

import SignUp from './SignUp'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SignUp />
    </Router>
  )

  return {
    sut
  }
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    FormHelper.testChildCount(sut, 'button-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'button-wrap', true, 'Criar')
    FormHelper.testFieldState(sut, 'name', validationError)
    FormHelper.testFieldState(sut, 'email', validationError)
    FormHelper.testFieldState(sut, 'password', validationError)
    FormHelper.testFieldState(sut, 'passwordConfirmation', validationError)
  })
})
