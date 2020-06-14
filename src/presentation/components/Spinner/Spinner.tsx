import React, { HTMLAttributes } from 'react'
import Styles from './Spinner-styles.scss'

type Props = HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<Props> = (props: Props) => {
  const { className } = props
  return (
    <div className={`${Styles.spinner} ${className}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
