import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import Styles from './Input-styles.scss'

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: React.ComponentType<IconBaseProps>
  errorMessage?: string
}

const Input: React.FC<Props> = ({ icon: Icon, errorMessage, ...rest }) => {
  return (
    <div className={Styles.inputWrapper} data-testid={`${rest.name}-input`}>
      <div className={Styles.inputWrap}>
        {Icon && <Icon size={20} className={Styles.inputIcon} />}
        <input {...rest} />
      </div>
      {errorMessage && (
        <small data-testid={`${rest.name}-error`} className={Styles.inputError}>
          {errorMessage}
        </small>
      )}
    </div>
  )
}

export default Input
