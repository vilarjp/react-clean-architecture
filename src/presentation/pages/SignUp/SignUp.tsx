import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import Styles from './SignUp-styles.scss'

type Props = {
  validation: Validation
}

type StateProps = {
  name: string
  nameError: string
  email: string
  emailError: string
  passwordError: string
  passwordConfirmationError: string
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    }))
  }, [validation, state.name, state.email])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
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
          <Link to="/login" className={Styles.link}>
            Voltar para login
          </Link>
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
