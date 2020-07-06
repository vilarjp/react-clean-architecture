import React, { memo } from 'react'
import Styles from './Header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.headerContent}>
        <h1>Pare Aqui</h1>
        <div className={Styles.profile}>
          <span>João</span>
          <button type="button">Sair</button>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
