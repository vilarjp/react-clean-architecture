import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import {
  LoginHeader,
  Footer,
  Input,
  Button,
  Modal
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import FormContext from '@/presentation/contexts/Form/FormContext'
import Styles from './Login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

type StateProps = {
  email: string
  emailError: string
  password: string
  passwordError: string
  loading: boolean
  error: string
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState<StateProps>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    loading: false,
    error: ''
  })
  const history = useHistory()

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

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      if (state.loading || state.emailError || state.passwordError) return
      try {
        setState(prevState => ({
          ...prevState,
          loading: true
        }))
        const account = await authentication.auth({
          email: state.email,
          password: state.password
        })
        localStorage.setItem('accessToken', account.accessToken)
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
      authentication,
      state.email,
      state.password,
      state.loading,
      state.emailError,
      state.passwordError,
      history
    ]
  )

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form-login"
          className={Styles.form}
          onSubmit={onSubmit}
        >
          <h3>Seja bem vindo</h3>
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
          <Button
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.buttonWrapper}
          >
            Entrar
          </Button>
          <Modal />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
