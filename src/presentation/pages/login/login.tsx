import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <h1>TPA</h1>
        <h2>
          TP Advisor - Encontre as melhores paradas entre as suas viagens!
        </h2>
      </header>
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
      <footer className={Styles.footer} />
    </div>
  )
}

export default Login
