import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpAdapter())
}
