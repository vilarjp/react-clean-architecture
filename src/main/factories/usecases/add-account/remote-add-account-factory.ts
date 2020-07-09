import { AddAccount } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpAdapter } from '@/main/factories/http'

import { RemoteAddAccount } from '@/data/usecases'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpAdapter())
}
