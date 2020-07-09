import React, { memo, useCallback, useContext } from 'react'
import { APIContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

import Styles from './Header-styles.scss'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(APIContext)

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <header className={Styles.header}>
      <div className={Styles.headerContent}>
        <h1>Pare Aqui</h1>
        <div className={Styles.profile}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <button
            data-testid="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
