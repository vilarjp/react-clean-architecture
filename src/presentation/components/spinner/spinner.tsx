import React, { HTMLAttributes } from 'react'
import Styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div className={`${Styles.spinner} ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
