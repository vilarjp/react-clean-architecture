import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import Styles from './Input-styles.scss'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...rest} />
      {Icon && <Icon size={20} className={Styles.status} />}
    </div>
  )
}

export default Input
