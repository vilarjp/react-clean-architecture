import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import {
  LoginHeader,
  Footer,
  Input,
  Button,
  Modal
} from '@/presentation/components'
import FormContext from '@/presentation/contexts/Form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import Styles from './SignUp-styles.scss'

type Props = {
  validation: Validation
  addAcount: AddAccount
  saveAccessToken: SaveAccessToken
}

type StateProps = {
  name: string
  nameError: string
  email: string
  emailError: string
  password: string
  passwordError: string
  passwordConfirmation: string
  passwordConfirmationError: string
  loading: boolean
  error: string
}

const SignUp: React.FC<Props> = ({
  validation,
  addAcount,
  saveAccessToken
}: Props) => {
  const [state, setState] = useState<StateProps>({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    loading: false,
    error: ''
  })
  const history = useHistory()

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      nameError: validation.validate('name', state.name)
    }))
  }, [validation, state.name])

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      emailError: validation.validate('email', state.email)
    }))
  }, [validation, state.email])

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      passwordError: validation.validate('password', state.password)
    }))
  }, [validation, state.password])

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      passwordConfirmationError: validation.validate(
        'password',
        state.passwordConfirmation
      )
    }))
  }, [validation, state.passwordConfirmation])

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      if (
        state.loading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      )
        return
      setState(prevState => ({
        ...prevState,
        loading: true
      }))
      try {
        const account = await addAcount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
        })
        await saveAccessToken.save(account.accessToken)
        history.replace('/')
      } catch (err) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: err.message
        }))
      }
    },
    [
      addAcount,
      state.name,
      state.email,
      state.password,
      state.passwordConfirmation,
      state.loading,
      state.nameError,
      state.emailError,
      state.passwordError,
      state.passwordConfirmationError,
      history,
      saveAccessToken
    ]
  )

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form-login"
          className={Styles.form}
          onSubmit={onSubmit}
        >
          <h3>Criar conta</h3>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            icon={FiUser}
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            icon={FiMail}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            icon={FiLock}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
            icon={FiLock}
          />
          <Button
            type="submit"
            className={Styles.buttonWrapper}
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
          >
            Criar
          </Button>
          <Modal />
          <Link
            data-testid="login-link"
            replace
            to="/login"
            className={Styles.link}
          >
            Voltar para login
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
