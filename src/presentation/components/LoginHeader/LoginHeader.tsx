import React, { memo } from 'react'
import Styles from './LoginHeader-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <h1>TPA</h1>
      <h2>TP Advisor - Encontre as melhores paradas entre as suas viagens!</h2>
    </header>
  )
}

export default memo(LoginHeader)
