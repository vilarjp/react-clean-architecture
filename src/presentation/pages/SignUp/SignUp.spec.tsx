import React from 'react'
import faker from 'faker'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { FormHelper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

import SignUp from './SignUp'

type SutParams = {
  validationError: string
}

type SutTypes = {
  addAcountSpy: AddAccountSpy
  saveCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAcountSpy = new AddAccountSpy()
  const saveCurrentAccountMock = jest.fn()
  render(
    <APIContext.Provider value={{ saveCurrentAccount: saveCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAcountSpy} />
      </Router>
    </APIContext.Provider>
  )

  return {
    addAcountSpy,
    saveCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('name', name)
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  FormHelper.populateField('passwordConfirmation', password)

  const buttonWrap = screen.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
  await waitFor(() => screen.getByTestId('form-login'))
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('button-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('button-wrap')).toBeDisabled()
    FormHelper.testFieldState('name', validationError)
    FormHelper.testFieldState('email', validationError)
    FormHelper.testFieldState('password', validationError)
    FormHelper.testFieldState('passwordConfirmation', validationError)
  })

  it('should display name error message if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('name')
    FormHelper.testFieldState('name', validationError)
  })

  it('should display e-mail error message if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('email')
    FormHelper.testFieldState('email', validationError)
  })

  it('should display password error message if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('password')
    FormHelper.testFieldState('password', validationError)
  })

  it('should display passwordConfirmation error message if validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    FormHelper.populateField('passwordConfirmation')
    FormHelper.testFieldState('passwordConfirmation', validationError)
  })

  it('should display valid name state if validation succeeds', () => {
    makeSut()

    FormHelper.populateField('name')
    FormHelper.testFieldState('name')
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

  it('should display valid passwordConfirmation state if validation succeeds', () => {
    makeSut()

    FormHelper.populateField('passwordConfirmation')
    FormHelper.testFieldState('passwordConfirmation')
  })

  it('should enable submit button if form validation is valid', () => {
    makeSut()

    FormHelper.populateField('name')
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.populateField('passwordConfirmation')
    expect(screen.getByTestId('button-wrap')).toBeEnabled()
  })

  it('should display spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.getByTestId('button-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('button-wrap')).toBeDisabled()
    expect(screen.queryByTestId('spinner-loading')).toBeInTheDocument()
  })

  it('should call AddAccount with correct values', async () => {
    const { addAcountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)

    expect(addAcountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('should call AddAcount only once', async () => {
    const { addAcountSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAcountSpy.callsCount).toBe(1)
  })

  it('should not call authentication with invalid fields', async () => {
    const validationError = faker.random.words()
    const { addAcountSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(addAcountSpy.callsCount).toBe(0)
  })

  it('should display error modal if authentication fails', async () => {
    const { addAcountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAcountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()

    expect(screen.getByTestId('modal-text')).toHaveTextContent(error.message)
    expect(screen.getByTestId('button-wrap')).toBeEnabled()
  })

  it('should call SaveCurrentAccount on AddAccount success', async () => {
    const { addAcountSpy, saveCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(saveCurrentAccountMock).toHaveBeenCalledWith(addAcountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', async () => {
    makeSut()

    const register = screen.getByTestId('login-link')
    fireEvent.click(register)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })

  it('should not allow to submit form if state is loading', async () => {
    const { addAcountSpy } = makeSut()

    await simulateValidSubmit()

    const form = screen.getByTestId('form-login')
    fireEvent.submit(form)
    fireEvent.submit(form)
    fireEvent.submit(form)
    expect(addAcountSpy.callsCount).toBe(1)
  })
})
