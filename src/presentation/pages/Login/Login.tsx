import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Spinner from '@/presentation/components/Spinner/Spinner'
import Footer from '@/presentation/components/Footer/Footer'
import Input from '@/presentation/components/Input/Input'
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
        <button type="submit" className={Styles.submit}>
          Entrar
          <Spinner className={Styles.spinner} />
        </button>
        <a href="/cadastro" className={Styles.link}>
          Criar conta
        </a>
      </form>
      <Footer />
    </div>
  )
}

export default Login
