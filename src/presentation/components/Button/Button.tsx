/* eslint-disable react/button-has-type */
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import Spinner from '@/presentation/components/Spinner/Spinner'
import Styles from './Button-styles.scss'
import Themes from './Button-themes.scss'

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  theme?: string
}

const Button: React.FC<Props> = ({
  children,
  loading,
  className,
  theme,
  ...rest
}) => {
  const buttonTheme = Themes[theme]

  return (
    <button
      {...rest}
      type={rest.type ? rest.type : 'button'}
      className={`${Styles.button} ${className} ${buttonTheme || ''} `}
      disabled={rest.disabled || loading}
    >
      {loading ? <Spinner className={Styles.spinner} /> : children}
    </button>
  )
}

export default Button
