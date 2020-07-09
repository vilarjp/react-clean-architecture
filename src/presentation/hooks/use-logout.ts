import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { APIContext } from '@/presentation/contexts'

type ReturnType = () => void

export const useLogout = (): ReturnType => {
  const { saveCurrentAccount } = useContext(APIContext)
  const history = useHistory()

  return (): void => {
    saveCurrentAccount(undefined)
    history.replace('/login')
  }
}
