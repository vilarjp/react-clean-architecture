import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpAdapter } from '@/main/factories/http/axios-http-adapter-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpAdapter())
}
