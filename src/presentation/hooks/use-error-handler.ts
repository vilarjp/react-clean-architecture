import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessDeniedError } from '@/domain/errors'
import { APIContext } from '@/presentation/contexts'

type CallbackType = (error: Error) => void
type ReturnType = CallbackType

export const useErrorHandler = (callback: CallbackType): ReturnType => {
  const { saveCurrentAccount } = useContext(APIContext)
  const history = useHistory()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      saveCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
