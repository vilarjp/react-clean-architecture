import { HttpClient } from '@/data/protocols/http'
import { AuthrorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator'
import { makeLocalStorageAdapter } from '../cache/localstorage-adapter-factory'
import { makeAxiosHttpAdapter } from '../http'

export const makeAuthrorizeHttpGetClientDecorator = (): HttpClient => {
  return new AuthrorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpAdapter()
  )
}
