import React, { useState, useEffect } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { LoginHeader, Footer, Input, Button } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import FormContext from '@/presentation/contexts/Form/FormContext'

import Styles from './Login-styles.scss'

type Props = {
  validation: Validation
}

type StateProps = {
  email: string
  emailError: string
  password: string
  passwordError: string
  loading: boolean
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    loading: false
  })

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

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
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
          <a href="/cadastro" className={Styles.link}>
            Criar conta
          </a>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
