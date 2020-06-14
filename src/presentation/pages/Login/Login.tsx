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
  errorEmail: string
  password: string
  errorPassword: string
  isLoading: boolean
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    email: '',
    errorEmail: '',
    password: '',
    errorPassword: '',
    isLoading: false
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [validation, state.email])

  useEffect(() => {
    validation.validate({ password: state.password })
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
            errorMessage={state.errorEmail}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            icon={FiLock}
            errorMessage={state.errorPassword}
          />
          <Button type="submit" className={Styles.buttonWrapper}>
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
