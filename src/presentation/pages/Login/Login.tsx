import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Spinner from '@/presentation/components/Spinner/Spinner'
import Footer from '@/presentation/components/Footer/Footer'
import Styles from './Login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h3>Seja bem vindo</h3>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <FiAlertCircle size={20} className={Styles.status} />
        </div>
        <div className={Styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <FiAlertCircle size={20} className={Styles.status} />
        </div>
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
