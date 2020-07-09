import { HttpGetClient } from '@/data/protocols/http'
import { AuthrorizeHttpGetClientDecorator } from '@/main/decorators/authorize-http-get-client-decorator'
import { makeLocalStorageAdapter } from '../cache/localstorage-adapter-factory'
import { makeAxiosHttpAdapter } from '../http'

export const makeAuthrorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthrorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpAdapter()
  )
}
