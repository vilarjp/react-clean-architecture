/* eslint-disable react/button-has-type */
import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  useContext
} from 'react'
import Spinner from '@/presentation/components/Spinner/Spinner'
import FormContext from '@/presentation/contexts/Form/FormContext'
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
  const { state } = useContext(FormContext)
  const isLoading = !!(loading || state.loading)
  const isDisabled = !!(rest.disabled || isLoading)

  return (
    <button
      data-testid="button-wrap"
      {...rest}
      type={rest.type ? rest.type : 'button'}
      className={`${Styles.buttonWrap} ${className} ${buttonTheme || null} `}
      disabled={isDisabled}
    >
      {isLoading ? <Spinner className={Styles.spinner} /> : children}
    </button>
  )
}

export default Button
