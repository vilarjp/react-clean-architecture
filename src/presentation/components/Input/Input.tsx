import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import Styles from './Input-styles.scss'

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<Props> = ({ icon: Icon, ...rest }) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...rest} />
      {Icon && <Icon size={20} className={Styles.status} />}
    </div>
  )
}

export default Input
