import React, { memo, useCallback, useContext } from 'react'
import { APIContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'
import Styles from './Header-styles.scss'

const Header: React.FC = () => {
  const { saveCurrentAccount, getCurrentAccount } = useContext(APIContext)
  const history = useHistory()

  const logout = useCallback(() => {
    saveCurrentAccount(undefined)
    history.replace('/login')
  }, [saveCurrentAccount, history])

  return (
    <header className={Styles.header}>
      <div className={Styles.headerContent}>
        <h1>Pare Aqui</h1>
        <div className={Styles.profile}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <button data-testid="logout-button" type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
