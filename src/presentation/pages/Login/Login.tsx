import React, { useState, useEffect, useCallback, useContext } from 'react'
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
import { FormContext, APIContext } from '@/presentation/contexts'
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
  isFormInvalid: boolean
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState<StateProps>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    loading: false,
    error: '',
    isFormInvalid: true
  })
  const history = useHistory()
  const { saveCurrentAccount } = useContext(APIContext)

  useEffect(() => {
    const formData = { email: state.email, password: state.password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState(prevState => ({
      ...prevState,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    }))
  }, [validation, state.email, state.password])

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      if (state.loading || state.isFormInvalid) return
      try {
        setState(prevState => ({
          ...prevState,
          loading: true
        }))
        const account = await authentication.auth({
          email: state.email,
          password: state.password
        })
        saveCurrentAccount(account)
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
      saveCurrentAccount,
      history,
      state.email,
      state.loading,
      state.password,
      state.isFormInvalid
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
            disabled={state.isFormInvalid}
            loading={state.loading}
            className={Styles.buttonWrapper}
          >
            Entrar
          </Button>
          <Modal />
          <Link
            data-testid="signup-link"
            replace
            to="/signup"
            className={Styles.link}
          >
            Criar conta
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
