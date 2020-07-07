import { createContext } from 'react'
import { AccountModel } from '@/domain/models'

type Props = {
  saveCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export default createContext<Props>(null)
