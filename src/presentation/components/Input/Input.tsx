import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useContext,
  useCallback,
  FocusEvent
} from 'react'
import { IconBaseProps } from 'react-icons'
import FormContext from '@/presentation/contexts/Form/FormContext'
import Styles from './Input-styles.scss'

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<Props> = ({ icon: Icon, ...rest }) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${rest.name}Error`]

  const handleChange = useCallback(
    (event: FocusEvent<HTMLInputElement>): void => {
      setState({
        ...state,
        [event.target.name]: event.target.value
      })
    },
    [state, setState]
  )

  return (
    <div
      className={Styles.inputWrapper}
      data-testid={`${rest.name}-inputWrapper`}
    >
      <div className={Styles.inputWrap}>
        {Icon && <Icon size={20} className={Styles.inputIcon} />}
        <input
          {...rest}
          data-testid={`${rest.name}-input`}
          onChange={handleChange}
        />
      </div>
      {error && (
        <small data-testid={`${rest.name}-error`} className={Styles.inputError}>
          {error}
        </small>
      )}
    </div>
  )
}

export default Input
