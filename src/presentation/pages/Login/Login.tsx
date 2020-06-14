import React, { useState } from 'react'
import { FiAlertOctagon } from 'react-icons/fi'
import { LoginHeader, Footer, Input, Button } from '@/presentation/components'
import FormContext from '@/presentation/contexts/Form/FormContext'

import Styles from './Login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h3>Seja bem vindo</h3>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            icon={FiAlertOctagon}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            icon={FiAlertOctagon}
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
