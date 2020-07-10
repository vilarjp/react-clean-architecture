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
  const isDisabled = rest.disabled || loading

  return (
    <button
      data-testid="button-wrap"
      {...rest}
      type={rest.type ? rest.type : 'button'}
      className={`${Styles.buttonWrap} ${className} ${buttonTheme || ''} `}
      disabled={isDisabled}
    >
      {loading ? <Spinner className={Styles.spinner} /> : children}
    </button>
  )
}

export default Button
