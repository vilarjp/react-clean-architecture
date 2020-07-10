import React from 'react'
import Styles from './Error-styles.scss'

type Props = {
  error: string
}

const Error: React.FC<Props> = ({ error }: Props) => {
  return (
    <div className={Styles.error}>
      <span data-testid="error">{error}</span>
    </div>
  )
}

export default Error
