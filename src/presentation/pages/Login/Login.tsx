import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { LoginHeader, Footer, Input, Button } from '@/presentation/components'

import Styles from './Login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h3>Seja bem vindo</h3>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          icon={FiAlertCircle}
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          icon={FiAlertCircle}
        />
        <Button type="submit" className={Styles.buttonWrapper}>
          Entrar
        </Button>
        <a href="/cadastro" className={Styles.link}>
          Criar conta
        </a>
      </form>
      <Footer />
    </div>
  )
}

export default Login
