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
  SaveAccessTokenMock
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

const expectInitalStateField = (sut: RenderResult, fieldName: string): void => {
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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateValidFields(sut, email, password)

  const buttonWrap = sut.getByTestId('button-wrap')
  fireEvent.click(buttonWrap)
  await waitFor(() => sut.getByTestId('form-login'))
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

const expectButtonState = (
  sut: RenderResult,
  buttonName: string,
  buttonChilds: number,
  buttonLabel: string
): void => {
  const button = sut.getByTestId(buttonName)
  expect(button.childElementCount).toBe(buttonChilds)
  expect(button.textContent).toBe(buttonLabel)
}

const expectButtonIsDisabled = (
  sut: RenderResult,
  buttonName: string,
  disabled: boolean
): void => {
  const button = sut.getByTestId(buttonName) as HTMLButtonElement
  expect(button.disabled).toBe(disabled)
}

const expectElementExists = (sut: RenderResult, elementName: string): void => {
  const element = sut.getByTestId(elementName)
  expect(element).toBeTruthy()
}

const expectElementTextContent = (
  sut: RenderResult,
  elementName: string,
  elementTextt: string
): void => {
  const element = sut.getByTestId(elementName)
  expect(element.textContent).toBe(elementTextt)
}

describe('Login Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()

    expectButtonState(sut, 'button-wrap', 0, 'Entrar')
    expectInitalStateField(sut, 'email')
    expectInitalStateField(sut, 'password')
  })

  it('should call validation with correct e-mail', () => {
    const { validationStub, sut } = makeSut()

    const email = faker.internet.email()
    populateEmailField(sut, email)

    expect(validationStub.fieldName).toBe('email')
    expect(validationStub.fieldValue).toBe(email)
  })

  it('should call validation with correct password', () => {
    const { validationStub, sut } = makeSut()

    const password = faker.internet.password()
    populatePasswordField(sut, password)

    expect(validationStub.fieldName).toBe('password')
    expect(validationStub.fieldValue).toBe(password)
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

    expectButtonIsDisabled(sut, 'button-wrap', false)
  })

  it('should display spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    expectElementExists(sut, 'spinner-loading')
    expectButtonState(sut, 'button-wrap', 1, '')
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

    expectElementExists(sut, 'modal')

    expectElementTextContent(sut, 'modal-text', error.message)

    expectButtonState(sut, 'button-wrap', 0, 'Entrar')
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
    const { sut } = makeSut()

    populateValidFields(sut)

    const form = sut.getByTestId('form-login')
    fireEvent.submit(form)
    fireEvent.submit(form)
  })
})
